Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Bitmap]::FromFile("d:\SVS\public\hero-banner.png")
$w = $src.Width
$h = $src.Height
$clean = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# Copy whole image first
$g = [System.Drawing.Graphics]::FromImage($clean)
$g.DrawImage($src, 0, 0, $w, $h)
$g.Dispose()

# In the text/logo zone: x from 25 to 450, y from 15 to 395
# Replace pixels that belong to text/logo with smooth background.
# Notice the background in this zone is very smooth:
# For any pixel at (x,y), the background is roughly:
# y=0..160 (logo area): #FEFDFB / #FAF9F6
# y=160..270 (headline area): #FEFEFE
# y=270..395 (badges/table area): smooth gradient down to #F5F1EB

for ($y = 15; $y -lt 395; $y++) {
    # Sample background color at x=430 on the right and x=40 on the left (if not leaf)
    $cRight = $src.GetPixel(425, $y)
    for ($x = 25; $x -lt 440; $x++) {
        $c = $src.GetPixel($x, $y)
        # Check if this pixel is text or old logo:
        # Text/logo pixels have luminance < 225 or are noticeably green/dark
        $lum = 0.299 * $c.R + 0.587 * $c.G + 0.114 * $c.B
        $isDark = ($lum -lt 230)
        # Protect hanging leaves on far left (x < 65 and y < 80)
        if ($x -lt 65 -and $y -lt 70 -and $c.G -gt $c.R -and $lum -lt 180) {
            # Keep leaf
            continue
        }
        if ($isDark) {
            # Compute background color for this row
            # Smoothly interpolate between left and right background
            $bgR = [Math]::Min(255, [int]($cRight.R * 0.5 + 254 * 0.5))
            $bgG = [Math]::Min(255, [int]($cRight.G * 0.5 + 253 * 0.5))
            $bgB = [Math]::Min(255, [int]($cRight.B * 0.5 + 251 * 0.5))
            $clean.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $bgR, $bgG, $bgB))
        }
    }
}

# Apply a 3x3 box blur only over the modified zone to blend any slight letter boundaries
$blurred = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$gb = [System.Drawing.Graphics]::FromImage($blurred)
$gb.DrawImage($clean, 0, 0, $w, $h)
$gb.Dispose()

for ($y = 18; $y -lt 392; $y++) {
    for ($x = 28; $x -lt 438; $x++) {
        # Check if near cleaned area
        $origC = $src.GetPixel($x, $y)
        $origLum = 0.299 * $origC.R + 0.587 * $origC.G + 0.114 * $origC.B
        if ($origLum -lt 235) {
            # average 5x5 neighbors
            $sumR = 0; $sumG = 0; $sumB = 0; $cnt = 0
            for ($dy = -2; $dy -le 2; $dy++) {
                for ($dx = -2; $dx -le 2; $dx++) {
                    $nc = $clean.GetPixel($x + $dx, $y + $dy)
                    $sumR += $nc.R; $sumG += $nc.G; $sumB += $nc.B; $cnt++
                }
            }
            $blurred.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, [int]($sumR/$cnt), [int]($sumG/$cnt), [int]($sumB/$cnt)))
        }
    }
}

$blurred.Save("d:\SVS\scratch\inpaint-bg.png", [System.Drawing.Imaging.ImageFormat]::Png)
$blurred.Dispose()
$clean.Dispose()
$src.Dispose()
Write-Host "Inpainted clean background saved."
