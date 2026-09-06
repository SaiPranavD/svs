Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Bitmap]::FromFile("d:\SVS\public\hero-banner.png")

# Crop text area
$rectText = New-Object System.Drawing.Rectangle(0, 160, 500, 120)
$cropText = $src.Clone($rectText, $src.PixelFormat)
$cropText.Save("d:\SVS\scratch\crop-text.png", [System.Drawing.Imaging.ImageFormat]::Png)
$cropText.Dispose()

# Crop badges area
$rectBadges = New-Object System.Drawing.Rectangle(0, 275, 450, 130)
$cropBadges = $src.Clone($rectBadges, $src.PixelFormat)
$cropBadges.Save("d:\SVS\scratch\crop-badges.png", [System.Drawing.Imaging.ImageFormat]::Png)
$cropBadges.Dispose()

# Crop top-right cursive
$rectCursive = New-Object System.Drawing.Rectangle(820, 10, 204, 120)
$cropCursive = $src.Clone($rectCursive, $src.PixelFormat)
$cropCursive.Save("d:\SVS\scratch\crop-cursive.png", [System.Drawing.Imaging.ImageFormat]::Png)
$cropCursive.Dispose()

$src.Dispose()
Write-Host "Crops saved successfully."
