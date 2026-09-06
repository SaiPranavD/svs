Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Bitmap]::FromFile("d:\SVS\public\hero-banner.png")
$w = $src.Width
$h = $src.Height
$clean = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

$g = [System.Drawing.Graphics]::FromImage($clean)
$g.DrawImage($src, 0, 0, $w, $h)

# Fill entire text & badge zone from x=0 to x=475 (y >= 160)
# Top is white #FFFFFF, bottom is #FAF7F2
$brushMain = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    (New-Object System.Drawing.Point(200, 160)),
    (New-Object System.Drawing.Point(200, 395)),
    [System.Drawing.Color]::FromArgb(255, 255, 255, 255),
    [System.Drawing.Color]::FromArgb(255, 250, 247, 242)
)
$g.FillRectangle($brushMain, 0, 160, 475, 235)
$brushMain.Dispose()

# Fill logo zone: x from 60 to 460, y from 10 to 160
$logoBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 254, 253, 251))
$g.FillRectangle($logoBrush, 60, 10, 400, 150)
$logoBrush.Dispose()

# Soft feather blend into right side from x=460 to x=510
for ($y = 10; $y -lt 395; $y++) {
    for ($x = 460; $x -lt 510; $x++) {
        $t = ($x - 460) / (510 - 460)
        $t = $t * $t * (3 - 2 * $t)
        $cOrig = $src.GetPixel($x, $y)
        $cClean = $clean.GetPixel($x, $y)
        $blendR = [int]($cClean.R * (1 - $t) + $cOrig.R * $t)
        $blendG = [int]($cClean.G * (1 - $t) + $cOrig.G * $t)
        $blendB = [int]($cClean.B * (1 - $t) + $cOrig.B * $t)
        $clean.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $blendR, $blendG, $blendB))
    }
}

# Preserve leaves in top left (x < 110, y < 160)
for ($y = 10; $y -lt 160; $y++) {
    for ($x = 0; $x -lt 110; $x++) {
        $cOrig = $src.GetPixel($x, $y)
        $lum = 0.299 * $cOrig.R + 0.587 * $cOrig.G + 0.114 * $cOrig.B
        # If green leaf (G > R and lum < 225) or soft shadow edge
        if ($cOrig.G -gt $cOrig.R -and $lum -lt 225) {
            $clean.SetPixel($x, $y, $cOrig)
        }
    }
}

$g.Dispose()
$src.Dispose()

$clean.Save("d:\SVS\scratch\clean-bg-v3.png", [System.Drawing.Imaging.ImageFormat]::Png)
$clean.Dispose()
Write-Host "Clean background v3 saved."
