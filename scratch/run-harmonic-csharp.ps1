$code = @"
using System;
using System.Drawing;
using System.Drawing.Imaging;

public class Inpainter
{
    public static void Process(string srcPath, string dstPath)
    {
        using (Bitmap bmp = new Bitmap(srcPath))
        {
            int w = bmp.Width;
            int h = bmp.Height;

            BitmapData data = bmp.LockBits(new Rectangle(0, 0, w, h), ImageLockMode.ReadWrite, PixelFormat.Format32bppArgb);
            int stride = data.Stride;
            IntPtr scan0 = data.Scan0;

            byte[] pixels = new byte[stride * h];
            System.Runtime.InteropServices.Marshal.Copy(scan0, pixels, 0, pixels.Length);

            bool[] mask = new bool[w * h];

            // Stepped contour covering the full SVS logo and leaf:
            for (int y = 18; y <= 158; y++)
            {
                for (int x = 40; x <= 455; x++)
                {
                    // 1. Leaf and SVS text combined: y in [18, 112], x in [120, 395]
                    if (y >= 18 && y <= 112 && x >= 120 && x <= 395)
                    {
                        mask[y * w + x] = true;
                    }
                    // 2. "NUTRACEUTICALS": y in [110, 137], x in [68, 415]
                    else if (y >= 110 && y <= 137 && x >= 68 && x <= 415)
                    {
                        mask[y * w + x] = true;
                    }
                    // 3. "INNOVATING HEALTH & WELLNESS" & lines: y in [137, 158], x in [45, 452]
                    else if (y >= 137 && y <= 158 && x >= 45 && x <= 452)
                    {
                        mask[y * w + x] = true;
                    }
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

            // Initialize masked pixels with neutral light sky
            for (int y = 0; y < h; y++)
            {
                for (int x = 0; x < w; x++)
                {
                    int idx = y * w + x;
                    if (mask[idx])
                    {
                        rArr[idx] = 252.0f;
                        gArr[idx] = 252.0f;
                        bArr[idx] = 250.0f;
                    }
                }
            }

            // 800 iterations of Laplace equation relaxation (Gauss-Seidel) for silk smooth gradient
            for (int iter = 0; iter < 800; iter++)
            {
                for (int y = 17; y <= 159; y++)
                {
                    for (int x = 44; x <= 453; x++)
                    {
                        int idx = y * w + x;
                        if (mask[idx])
                        {
                            rArr[idx] = (rArr[idx - 1] + rArr[idx + 1] + rArr[idx - w] + rArr[idx + w]) * 0.25f;
                            gArr[idx] = (gArr[idx - 1] + gArr[idx + 1] + gArr[idx - w] + gArr[idx + w]) * 0.25f;
                            bArr[idx] = (bArr[idx - 1] + bArr[idx + 1] + bArr[idx - w] + bArr[idx + w]) * 0.25f;
                        }
                    }
                }
            }

            // Copy back
            for (int y = 0; y < h; y++)
            {
                for (int x = 0; x < w; x++)
                {
                    int idx = y * w + x;
                    if (mask[idx])
                    {
                        int offset = y * stride + x * 4;
                        pixels[offset] = (byte)Math.Min(255, Math.Max(0, (int)Math.Round(bArr[idx])));
                        pixels[offset + 1] = (byte)Math.Min(255, Math.Max(0, (int)Math.Round(gArr[idx])));
                        pixels[offset + 2] = (byte)Math.Min(255, Math.Max(0, (int)Math.Round(rArr[idx])));
                    }
                }
            }

            System.Runtime.InteropServices.Marshal.Copy(pixels, 0, scan0, pixels.Length);
            bmp.UnlockBits(data);
            bmp.Save(dstPath, ImageFormat.Png);
        }
    }
}
"@

Add-Type -TypeDefinition $code -ReferencedAssemblies "System.Drawing.dll"
[Inpainter]::Process("d:\SVS\scratch\original-hero-banner.png", "d:\SVS\scratch\banner-csharp-clean-v3.png")
Write-Host "Inpainting v3 complete!"
