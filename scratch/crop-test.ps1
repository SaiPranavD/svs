Add-Type -AssemblyName System.Drawing
$src = [System.Drawing.Bitmap]::FromFile("d:\SVS\public\hero-banner.png")
$rect = New-Object System.Drawing.Rectangle(0, 0, 420, 200)
$crop = $src.Clone($rect, $src.PixelFormat)
$crop.Save("d:\SVS\scratch\hero-topleft.png", [System.Drawing.Imaging.ImageFormat]::Png)
$crop.Dispose()
$src.Dispose()
Write-Host "Cropped top left successfully"
