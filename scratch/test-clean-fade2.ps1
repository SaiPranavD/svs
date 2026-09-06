Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Bitmap]::FromFile("d:\SVS\public\hero-banner.png")
$w = $src.Width
$h = $src.Height
$clean = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

$g = [System.Drawing.Graphics]::FromImage($clean)
$g.DrawImage($src, 0, 0, $w, $h)

# 1. Solid white fill from x=0 to x=452 (for y >= 140)
# Above y=330 it is pure white #FFFFFF
# Below y=330 it blends down to #FAF8F5
$brushTop = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 255, 255, 255))
$g.FillRectangle($brushTop, 0, 140, 452, 190)
$brushTop.Dispose()

$brushTable = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    (New-Object System.Drawing.Point(200, 330)),
    (New-Object System.Drawing.Point(200, 409)),
    [System.Drawing.Color]::FromArgb(255, 255, 255, 255),
    [System.Drawing.Color]::FromArgb(255, 248, 245, 240)
)
$g.FillRectangle($brushTable, 0, 330, 452, 79)
$brushTable.Dispose()

# 2. Top-left logo zone (y: 0 to 140):
# Fill with #FEFDFB from x=0 to x=420
$brushLogo = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 254, 253, 251))
$g.FillRectangle($brushLogo, 0, 0, 420, 140)
$brushLogo.Dispose()

# Restore the hanging leaves in top-left (x < 80, y < 150)
for ($y = 0; $y -lt 150; $y++) {
    for ($x = 0; $x -lt 80; $x++) {
        $cOrig = $src.GetPixel($x, $y)
        $lum = 0.299 * $cOrig.R + 0.587 * $cOrig.G + 0.114 * $cOrig.B
        # If it's a leaf pixel or shadow of leaf:
        if ($cOrig.G -gt $cOrig.R -and $lum -lt 225) {
            $clean.SetPixel($x, $y, $cOrig)
        }
    }
}

# 3. Smooth cosine fade from x=452 to x=525 for y >= 140
for ($y = 140; $y -lt $h; $y++) {
    for ($x = 452; $x -lt 525; $x++) {
        $t = ($x - 452.0) / (525.0 - 452.0)
        $fade = (1.0 + [Math]::Cos($t * [Math]::PI)) / 2.0
        
        $cOrig = $src.GetPixel($x, $y)
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

# 4. Smooth cosine fade for top region (y: 0 to 140) between x=420 and x=490
for ($y = 0; $y -lt 140; $y++) {
    for ($x = 420; $x -lt 490; $x++) {
        $t = ($x - 420.0) / (490.0 - 420.0)
        $fade = (1.0 + [Math]::Cos($t * [Math]::PI)) / 2.0
        $cOrig = $src.GetPixel($x, $y)
        $blendR = [int](254 * $fade + $cOrig.R * (1.0 - $fade))
        $blendG = [int](253 * $fade + $cOrig.G * (1.0 - $fade))
        $blendB = [int](251 * $fade + $cOrig.B * (1.0 - $fade))
        $clean.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $blendR, $blendG, $blendB))
    }
}

$g.Dispose()
$src.Dispose()

$clean.Save("d:\SVS\scratch\clean-fade-v2.png", [System.Drawing.Imaging.ImageFormat]::Png)
$clean.Dispose()
Write-Host "Clean fade v2 generated!"
