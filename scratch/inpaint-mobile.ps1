$code = @'
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;

public class InpaintMobile
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

            bool[] mask = new bool[w * h];

            // Mobile leaf mask:
            // x in [815, 965], y in [228, 335]
            int minX = 815;
            int maxX = 965;
            int minY = 228;
            int maxY = 335;

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

            // Initialize mask with neutral sky/white
            for (int y = minY; y <= maxY; y++)
            {
                for (int x = minX; x <= maxX; x++)
                {
                    int idx = y * w + x;
                    rArr[idx] = 250f;
                    gArr[idx] = 250f;
                    bArr[idx] = 250f;
                }
            }

            // 1200 iterations Laplace relaxation
            for (int iter = 0; iter < 1200; iter++)
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

            // Write back
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
[InpaintMobile]::Run("d:\SVS\src\assets\hero-banner-mobile.jpg", "d:\SVS\scratch\banner-mobile-test.png")

# Crop the area around it: X in [700, 1050], Y in [150, 420]
$bmp = [System.Drawing.Bitmap]::FromFile("d:\SVS\scratch\banner-mobile-test.png")
$crop = New-Object System.Drawing.Bitmap(400, 270)
$g = [System.Drawing.Graphics]::FromImage($crop)
$g.DrawImage($bmp, [System.Drawing.Rectangle]::new(0, 0, 400, 270), [System.Drawing.Rectangle]::new(700, 150, 400, 270), [System.Drawing.GraphicsUnit]::Pixel)
$crop.Save("d:\SVS\scratch\crop-mobile-inpainted.png", [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose()
$crop.Dispose()
$bmp.Dispose()
Write-Host "Mobile inpainting test complete!"
