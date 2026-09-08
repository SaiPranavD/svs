$code = @'
using System;
using System.Drawing;

public class LeafFinder
{
    public static void FindBounds(string path)
    {
        using (Bitmap bmp = new Bitmap(path))
        {
            int leafMinX = 9999, leafMaxX = 0, leafMinY = 9999, leafMaxY = 0;
            int dotMaxX = 0, dotMinX = 9999, dotMinY = 9999, dotMaxY = 0;

            for (int y = 180; y <= 350; y++)
            {
                for (int x = 600; x <= 950; x++)
                {
                    Color c = bmp.GetPixel(x, y);
                    if (y >= 285 && y <= 305 && x >= 640 && x <= 700)
                    {
                        if (c.R < 120 && c.G < 140 && c.B < 120)
                        {
                            if (x < dotMinX) dotMinX = x;
                            if (x > dotMaxX) dotMaxX = x;
                            if (y < dotMinY) dotMinY = y;
                            if (y > dotMaxY) dotMaxY = y;
                        }
                    }

                    bool isLeaf = (c.G > c.B + 18 && c.G > 70 && c.B < 220) ||
                                  (c.G > 120 && c.R > 80 && c.B < 100) ||
                                  (c.R < 150 && c.G > 100 && c.G > c.B + 25);
                    if (isLeaf && x > 690)
                    {
                        if (x < leafMinX) leafMinX = x;
                        if (x > leafMaxX) leafMaxX = x;
                        if (y < leafMinY) leafMinY = y;
                        if (y > leafMaxY) leafMaxY = y;
                    }
                }
            }

            Console.WriteLine(string.Format("Dot bounds: X in [{0}, {1}], Y in [{2}, {3}]", dotMinX, dotMaxX, dotMinY, dotMaxY));
            Console.WriteLine(string.Format("Desktop Leaf bounds: X in [{0}, {1}], Y in [{2}, {3}]", leafMinX, leafMaxX, leafMinY, leafMaxY));
        }
    }
}
'@

Add-Type -TypeDefinition $code -ReferencedAssemblies System.Drawing
[LeafFinder]::FindBounds("d:\SVS\src\assets\hero-banner.png")
