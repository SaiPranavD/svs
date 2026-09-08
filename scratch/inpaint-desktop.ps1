$code = @'
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;

public class InpaintDesktop
{
    public static void Run(string srcPath, string dstPath)
    {
        using (Bitmap bmp = new Bitmap(srcPath))
        {
            int w = bmp.Width;
            int h = bmp.Height;

            BitmapData data = bmp.LockBits(new Rectangle(0, 0, w, h), ImageLockMode.ReadWrite, PixelFormat.Format32bppArgb);
            int stride = data.Stride;
            IntPtr scan0 = data.Scan0;

            byte[] pixels = new byte[stride * h];
            Marshal.Copy(scan0, pixels, 0, pixels.Length);

            // Inpaint region: Leaf bounding area
            // Leaf is in X in [846, 924], Y in [195, 310]
            // We set the mask to X in [843, 928], Y in [192, 314]
            int minX = 843;
            int maxX = 928;
            int minY = 192;
            int maxY = 314;

            bool[] mask = new bool[w * h];
            for (int y = minY; y <= maxY; y++)
            {
                for (int x = minX; x <= maxX; x++)
                {
                    mask[y * w + x] = true;
                }
            }

            float[] rArr = new float[w * h];
            float[] gArr = new float[w * h];
            float[] bArr = new float[w * h];

            for (int y = 0; y < h; y++)
            {
                for (int x = 0; x < w; x++)
                {
                    int offset = y * stride + x * 4;
                    int idx = y * w + x;
                    bArr[idx] = pixels[offset];
                    gArr[idx] = pixels[offset + 1];
                    rArr[idx] = pixels[offset + 2];
                }
            }

            // Initialize mask with average boundary value
            float avgR = 0, avgG = 0, avgB = 0;
            int bCount = 0;
            for (int x = minX; x <= maxX; x++)
            {
                int topIdx = (minY - 1) * w + x;
                int botIdx = (maxY + 1) * w + x;
                avgR += rArr[topIdx] + rArr[botIdx];
                avgG += gArr[topIdx] + gArr[botIdx];
                avgB += bArr[topIdx] + bArr[botIdx];
                bCount += 2;
            }
            for (int y = minY; y <= maxY; y++)
            {
                int leftIdx = y * w + (minX - 1);
                int rightIdx = y * w + (maxX + 1);
                avgR += rArr[leftIdx] + rArr[rightIdx];
                avgG += gArr[leftIdx] + gArr[rightIdx];
                avgB += bArr[leftIdx] + bArr[rightIdx];
                bCount += 2;
            }
            avgR /= bCount;
            avgG /= bCount;
            avgB /= bCount;

            for (int y = minY; y <= maxY; y++)
            {
                for (int x = minX; x <= maxX; x++)
                {
                    int idx = y * w + x;
                    rArr[idx] = avgR;
                    gArr[idx] = avgG;
                    bArr[idx] = avgB;
                }
            }

            // Gauss-Seidel Laplace relaxation iterations
            for (int iter = 0; iter < 1000; iter++)
            {
                for (int y = minY; y <= maxY; y++)
                {
                    int row = y * w;
                    int rowUp = (y - 1) * w;
                    int rowDown = (y + 1) * w;
                    for (int x = minX; x <= maxX; x++)
                    {
                        int idx = row + x;
                        rArr[idx] = (rArr[idx - 1] + rArr[idx + 1] + rArr[rowUp + x] + rArr[rowDown + x]) * 0.25f;
                        gArr[idx] = (gArr[idx - 1] + gArr[idx + 1] + gArr[rowUp + x] + gArr[rowDown + x]) * 0.25f;
                        bArr[idx] = (bArr[idx - 1] + bArr[idx + 1] + bArr[rowUp + x] + bArr[rowDown + x]) * 0.25f;
                    }
                }
            }

            // Write back to pixels
            for (int y = minY; y <= maxY; y++)
            {
                for (int x = minX; x <= maxX; x++)
                {
                    int offset = y * stride + x * 4;
                    int idx = y * w + x;
                    pixels[offset] = (byte)Math.Min(255, Math.Max(0, (int)Math.Round(bArr[idx])));
                    pixels[offset + 1] = (byte)Math.Min(255, Math.Max(0, (int)Math.Round(gArr[idx])));
                    pixels[offset + 2] = (byte)Math.Min(255, Math.Max(0, (int)Math.Round(rArr[idx])));
                    pixels[offset + 3] = 255;
                }
            }

            Marshal.Copy(pixels, 0, scan0, pixels.Length);
            bmp.UnlockBits(data);

            bmp.Save(dstPath, ImageFormat.Png);
        }
    }
}
'@

Add-Type -TypeDefinition $code -ReferencedAssemblies System.Drawing
[InpaintDesktop]::Run("d:\SVS\src\assets\hero-banner.png", "d:\SVS\scratch\banner-desktop-test.png")

# Now crop the area around it: X in [700, 1000], Y in [150, 350]
$bmp = [System.Drawing.Bitmap]::FromFile("d:\SVS\scratch\banner-desktop-test.png")
$crop = New-Object System.Drawing.Bitmap(350, 200)
$g = [System.Drawing.Graphics]::FromImage($crop)
$g.DrawImage($bmp, [System.Drawing.Rectangle]::new(0, 0, 350, 200), [System.Drawing.Rectangle]::new(680, 150, 350, 200), [System.Drawing.GraphicsUnit]::Pixel)
$crop.Save("d:\SVS\scratch\crop-desktop-inpainted.png", [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose()
$crop.Dispose()
$bmp.Dispose()
Write-Host "Desktop inpainting test complete!"
