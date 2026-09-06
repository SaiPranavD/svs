Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Bitmap]::FromFile("d:\SVS\public\hero-banner.png")
$w = $src.Width
$h = $src.Height
$clean = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# Copy original image
$g = [System.Drawing.Graphics]::FromImage($clean)
$g.DrawImage($src, 0, 0, $w, $h)
$g.Dispose()

# Create a boolean mask of pixels to erase (old logo & old text)
$mask = New-Object 'bool[,]' $w, $h

for ($y = 0; $y -lt $h; $y++) {
    for ($x = 0; $x -lt $w; $x++) {
        # Only in the left region: x from 40 to 480
        if ($x -ge 40 -and $x -lt 480) {
            $c = $src.GetPixel($x, $y)
            $lum = 0.299 * $c.R + 0.587 * $c.G + 0.114 * $c.B
            
            # Old logo region (y: 10 to 160): erase old logo text and old leaves
            if ($y -ge 10 -and $y -lt 160 -and $x -lt 400) {
                if ($lum -lt 245) {
                    $mask[$x, $y] = $true
                }
            }
            # Headline & badges region (y: 160 to 400): erase dark text & badge lines
            elseif ($y -ge 160 -and $y -lt 400) {
                # Text or green headline or badge lines
                if ($lum -lt 238) {
                    $mask[$x, $y] = $true
                }
            }
        }
    }
}

# Inpainting: For every masked pixel, search left and right for the nearest unmasked background pixels
for ($y = 10; $y -lt 400; $y++) {
    for ($x = 40; $x -lt 480; $x++) {
        if ($mask[$x, $y]) {
            # Find nearest unmasked pixel to the left
            $leftX = $x - 1
            while ($leftX -ge 0 -and $mask[$leftX, $y]) {
                $leftX--
            }
            # Find nearest unmasked pixel to the right
            $rightX = $x + 1
            while ($rightX -lt $w -and $mask[$rightX, $y]) {
                $rightX++
            }
            
            if ($leftX -ge 0 -and $rightX -lt $w) {
                $cLeft = $src.GetPixel($leftX, $y)
                $cRight = $src.GetPixel($rightX, $y)
                $t = ($x - $leftX) / ($rightX - $leftX)
                $r = [int]($cLeft.R * (1 - $t) + $cRight.R * $t)
                $g = [int]($cLeft.G * (1 - $t) + $cRight.G * $t)
                $b = [int]($cLeft.B * (1 - $t) + $cRight.B * $t)
                $clean.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $r, $g, $b))
            } elseif ($rightX -lt $w) {
                $clean.SetPixel($x, $y, $src.GetPixel($rightX, $y))
            } elseif ($leftX -ge 0) {
                $clean.SetPixel($x, $y, $src.GetPixel($leftX, $y))
            }
        }
    }
}

$clean.Save("d:\SVS\scratch\inpaint-perfect.png", [System.Drawing.Imaging.ImageFormat]::Png)
$clean.Dispose()
$src.Dispose()
Write-Host "Inpainting complete!"
