Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Bitmap]::FromFile("d:\SVS\public\hero-banner.png")
$targetW = 2560
$targetH = 1022

$dest = New-Object System.Drawing.Bitmap($targetW, $targetH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($dest)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

$g.DrawImage($src, 0, 0, $targetW, $targetH)
$g.Dispose()
$src.Dispose()

# Save sample crop of right side
$rectRight = New-Object System.Drawing.Rectangle(1100, 0, 1460, 1022)
$cropRight = $dest.Clone($rectRight, $dest.PixelFormat)
$cropRight.Save("d:\SVS\scratch\crop-right-upscaled.png", [System.Drawing.Imaging.ImageFormat]::Png)
$cropRight.Dispose()

$dest.Dispose()
Write-Host "Upscaled right side saved."
