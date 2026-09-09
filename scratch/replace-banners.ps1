Add-Type -AssemblyName System.Drawing

$mobileSrc = "C:\Users\dsaip\.gemini\antigravity-ide\brain\89cdf980-89c2-4941-a2c3-2763f4f95262\.user_uploaded\media_1788881210777.jpg"
$desktopSrc = "C:\Users\dsaip\.gemini\antigravity-ide\brain\89cdf980-89c2-4941-a2c3-2763f4f95262\.user_uploaded\media_1788881583918.png"

# 1. Process Desktop Banner (1024x409 -> 2048x818 PNG)
$dImg = [System.Drawing.Bitmap]::FromFile($desktopSrc)
$dW = $dImg.Width * 2
$dH = $dImg.Height * 2
$dUp = New-Object System.Drawing.Bitmap($dW, $dH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$dG = [System.Drawing.Graphics]::FromImage($dUp)
$dG.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$dG.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$dG.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$dG.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
$dG.DrawImage($dImg, 0, 0, $dW, $dH)
$dG.Dispose()
$dImg.Dispose()

# Save desktop to src/assets and public
$dUp.Save("d:\SVS\src\assets\hero-banner.png", [System.Drawing.Imaging.ImageFormat]::Png)
$dUp.Save("d:\SVS\public\hero-banner.png", [System.Drawing.Imaging.ImageFormat]::Png)
$dUp.Dispose()
Write-Host "Desktop banner saved successfully: 2048x818"

# 2. Process Mobile Banner (576x1024 -> 1152x2048 JPG)
$mImg = [System.Drawing.Bitmap]::FromFile($mobileSrc)
$mW = $mImg.Width * 2
$mH = $mImg.Height * 2
$mUp = New-Object System.Drawing.Bitmap($mW, $mH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$mG = [System.Drawing.Graphics]::FromImage($mUp)
$mG.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$mG.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$mG.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$mG.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
$mG.DrawImage($mImg, 0, 0, $mW, $mH)
$mG.Dispose()
$mImg.Dispose()

# Save mobile with High Quality JPEG (quality 92)
$encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]92)

$mUp.Save("d:\SVS\src\assets\hero-banner-mobile.jpg", $encoder, $encoderParams)
$mUp.Save("d:\SVS\public\hero-banner-mobile.jpg", $encoder, $encoderParams)
$mUp.Dispose()
Write-Host "Mobile banner saved successfully: 1152x2048"
