Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Bitmap]::FromFile("d:\SVS\public\hero-banner.png")
$w = $src.Width
$h = $src.Height
$clean = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

$g = [System.Drawing.Graphics]::FromImage($clean)
$g.DrawImage($src, 0, 0, $w, $h)

# 1. Erase old logo: x from 50 to 380, y from 15 to 155
# Fill with pure background color #FEFEFE
$brushLogo = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 254, 254, 254))
$g.FillRectangle($brushLogo, 50, 15, 330, 140)
$brushLogo.Dispose()

# 2. Solid white fill on left up to x=360
# For y from 155 to 409:
# Note: table starts at y=330. From y=330 to 409, bottom is slightly warm #FAF8F5
$brushLeft = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 255, 255, 255))
$g.FillRectangle($brushLeft, 0, 155, 360, 254)
$brushLeft.Dispose()

# 3. Smooth alpha fade from x=360 to x=520
# Over this range, blend a pure white (or warm white at bottom) with the original image pixels
for ($y = 155; $y -lt $h; $y++) {
    for ($x = 360; $x -lt 520; $x++) {
        # alpha from 1.0 (solid white at x=360) to 0.0 (original image at x=520)
        $t = ($x - 360.0) / (520.0 - 360.0)
        # Cosine smooth fade
        $fade = (1.0 + [Math]::Cos($t * [Math]::PI)) / 2.0
        
        $cOrig = $src.GetPixel($x, $y)
        # Target background color: pure white above y=330, slight warm tint at bottom
        $targetR = 255; $targetG = 255; $targetB = 255
        if ($y -gt 330) {
            $tableT = ($y - 330.0) / (409.0 - 330.0)
            $targetR = [int](255 * (1 - $tableT) + 248 * $tableT)
            $targetG = [int](255 * (1 - $tableT) + 245 * $tableT)
            $targetB = [int](255 * (1 - $tableT) + 240 * $tableT)
        }
        
        $blendR = [int]($targetR * $fade + $cOrig.R * (1.0 - $fade))
        $blendG = [int]($targetG * $fade + $cOrig.G * (1.0 - $fade))
        $blendB = [int]($targetB * $fade + $cOrig.B * (1.0 - $fade))
        
        $clean.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $blendR, $blendG, $blendB))
    }
}

# 4. Same smooth fade for top region (y: 0 to 155) between x=360 and x=450
for ($y = 0; $y -lt 155; $y++) {
    for ($x = 360; $x -lt 450; $x++) {
        $t = ($x - 360.0) / (450.0 - 360.0)
        $fade = (1.0 + [Math]::Cos($t * [Math]::PI)) / 2.0
        $cOrig = $src.GetPixel($x, $y)
        $blendR = [int](254 * $fade + $cOrig.R * (1.0 - $fade))
        $blendG = [int](254 * $fade + $cOrig.G * (1.0 - $fade))
        $blendB = [int](254 * $fade + $cOrig.B * (1.0 - $fade))
        $clean.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $blendR, $blendG, $blendB))
    }
}

$g.Dispose()
$src.Dispose()

$clean.Save("d:\SVS\scratch\clean-fade.png", [System.Drawing.Imaging.ImageFormat]::Png)
$clean.Dispose()
Write-Host "Clean fade generated!"
