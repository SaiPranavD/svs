Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Bitmap]::FromFile("d:\SVS\public\hero-banner.png")
$w = $src.Width
$h = $src.Height
$clean = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

$g = [System.Drawing.Graphics]::FromImage($clean)
$g.DrawImage($src, 0, 0, $w, $h)

# 1. Clean the logo zone (x: 55 to 395, y: 12 to 160)
# Background here is naturally pure white / soft off-white
$logoBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 254, 253, 251))
$g.FillRectangle($logoBrush, 55, 12, 340, 148)
$logoBrush.Dispose()

# 2. Clean the headline zone (x: 20 to 470, y: 160 to 280)
# Background here is pure white #FFFFFF
$headBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 255, 255, 255))
$g.FillRectangle($headBrush, 20, 160, 450, 115)
$headBrush.Dispose()

# 3. Clean the badges zone (x: 20 to 425, y: 275 to 395)
# Soft gradient from white #FFFFFF at y=275 down to #FAF7F2 at y=395
$badgeBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    (New-Object System.Drawing.Point(200, 275)),
    (New-Object System.Drawing.Point(200, 395)),
    [System.Drawing.Color]::FromArgb(255, 255, 255, 255),
    [System.Drawing.Color]::FromArgb(255, 250, 247, 242)
)
$g.FillRectangle($badgeBrush, 20, 275, 405, 120)
$badgeBrush.Dispose()

# 4. Feather / blend the right boundary (x: 420 to 475) so it smoothly blends with the sky and ingredients
for ($y = 12; $y -lt 395; $y++) {
    for ($x = 410; $x -lt 475; $x++) {
        # alpha factor from 0 (at x=410) to 1 (at x=475)
        $t = ($x - 410) / (475 - 410)
        # smoothstep
        $t = $t * $t * (3 - 2 * $t)
        $cOrig = $src.GetPixel($x, $y)
        $cClean = $clean.GetPixel($x, $y)
        $blendR = [int]($cClean.R * (1 - $t) + $cOrig.R * $t)
        $blendG = [int]($cClean.G * (1 - $t) + $cOrig.G * $t)
        $blendB = [int]($cClean.B * (1 - $t) + $cOrig.B * $t)
        $clean.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $blendR, $blendG, $blendB))
    }
}

# 5. Feather / blend the left boundary (x: 20 to 65) where leaves hang down
for ($y = 12; $y -lt 280; $y++) {
    for ($x = 20; $x -lt 65; $x++) {
        $cOrig = $src.GetPixel($x, $y)
        # If original pixel is green leaf (G > R and lum < 220), keep original leaf!
        $lum = 0.299 * $cOrig.R + 0.587 * $cOrig.G + 0.114 * $cOrig.B
        if ($cOrig.G -gt $cOrig.R -and $lum -lt 220) {
            $clean.SetPixel($x, $y, $cOrig)
        }
    }
}

$g.Dispose()
$src.Dispose()

$clean.Save("d:\SVS\scratch\clean-bg-v2.png", [System.Drawing.Imaging.ImageFormat]::Png)
$clean.Dispose()
Write-Host "Clean background v2 saved."
