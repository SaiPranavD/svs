Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Bitmap]::FromFile("d:\SVS\public\hero-banner.png")
$clean = New-Object System.Drawing.Bitmap($src.Width, $src.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($clean)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality

# Draw original image
$g.DrawImage($src, 0, 0, $src.Width, $src.Height)

# Create a smooth soft gradient brush to cover old logo and text
# x: 75 to 440
# We can use a LinearGradientBrush from top to bottom
$rect = New-Object System.Drawing.Rectangle(75, 10, 365, 385)

# Gradient matching the natural backdrop: top is #FEFDFB, middle is #FFFFFF, bottom is #FAF8F5
$colorTop = [System.Drawing.Color]::FromArgb(255, 254, 253, 251)
$colorMid = [System.Drawing.Color]::FromArgb(255, 255, 255, 255)
$colorBot = [System.Drawing.Color]::FromArgb(255, 250, 248, 245)

# Fill top portion (y: 10 to 280)
$brushTop = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    (New-Object System.Drawing.Point(200, 10)),
    (New-Object System.Drawing.Point(200, 280)),
    $colorTop, $colorMid
)
$g.FillRectangle($brushTop, 75, 10, 365, 270)
$brushTop.Dispose()

# Fill bottom portion (y: 280 to 395)
$brushBot = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    (New-Object System.Drawing.Point(200, 280)),
    (New-Object System.Drawing.Point(200, 395)),
    $colorMid, $colorBot
)
$g.FillRectangle($brushBot, 75, 280, 365, 115)
$brushBot.Dispose()

$g.Dispose()
$src.Dispose()

$clean.Save("d:\SVS\scratch\clean-bg.png", [System.Drawing.Imaging.ImageFormat]::Png)
$clean.Dispose()
Write-Host "Clean background saved."
