Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Bitmap]::FromFile("d:\SVS\public\hero-banner.png")
$w = $src.Width
$h = $src.Height
$clean = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

$g = [System.Drawing.Graphics]::FromImage($clean)
$g.DrawImage($src, 0, 0, $w, $h)

# 1. Solid white fill from x=0 to x=468 (for y >= 135)
$brushTop = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 255, 255, 255))
$g.FillRectangle($brushTop, 0, 135, 468, 195)
$brushTop.Dispose()

$brushTable = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    (New-Object System.Drawing.Point(200, 330)),
    (New-Object System.Drawing.Point(200, 409)),
    [System.Drawing.Color]::FromArgb(255, 255, 255, 255),
    [System.Drawing.Color]::FromArgb(255, 248, 245, 240)
)
$g.FillRectangle($brushTable, 0, 330, 468, 79)
$brushTable.Dispose()

# 2. Top-left logo zone (y: 0 to 135):
# Fill with #FEFDFB from x=0 to x=440
$brushLogo = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 254, 253, 251))
$g.FillRectangle($brushLogo, 0, 0, 440, 135)
$brushLogo.Dispose()

# Restore only real hanging leaves in top-left (x < 42, y < 135)
for ($y = 0; $y -lt 135; $y++) {
    for ($x = 0; $x -lt 42; $x++) {
        $cOrig = $src.GetPixel($x, $y)
        $lum = 0.299 * $cOrig.R + 0.587 * $cOrig.G + 0.114 * $cOrig.B
        if ($cOrig.G -gt $cOrig.R -and $lum -lt 210) {
            $clean.SetPixel($x, $y, $cOrig)
        }
    }
}

# 3. Smooth cosine fade from x=468 to x=535 for y >= 135
for ($y = 135; $y -lt $h; $y++) {
    for ($x = 468; $x -lt 535; $x++) {
        $t = ($x - 468.0) / (535.0 - 468.0)
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

# 4. Smooth cosine fade for top region (y: 0 to 135) between x=440 and x=510
for ($y = 0; $y -lt 135; $y++) {
    for ($x = 440; $x -lt 510; $x++) {
        $t = ($x - 440.0) / (510.0 - 440.0)
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

$clean.Save("d:\SVS\scratch\clean-fade-v3.png", [System.Drawing.Imaging.ImageFormat]::Png)
$clean.Dispose()
Write-Host "Clean fade v3 generated!"
