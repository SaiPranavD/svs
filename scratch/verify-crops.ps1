Add-Type -AssemblyName System.Drawing

# Crop Desktop banner title area
$d = [System.Drawing.Bitmap]::FromFile('d:\SVS\src\assets\hero-banner.png')
$dCrop = New-Object System.Drawing.Bitmap(1000, 350)
$g1 = [System.Drawing.Graphics]::FromImage($dCrop)
$g1.DrawImage($d, [System.Drawing.Rectangle]::new(0, 0, 1000, 350), [System.Drawing.Rectangle]::new(50, 130, 1000, 350), [System.Drawing.GraphicsUnit]::Pixel)
$dCrop.Save('d:\SVS\scratch\verify-desktop-crop.png', [System.Drawing.Imaging.ImageFormat]::Png)
$g1.Dispose()
$dCrop.Dispose()
$d.Dispose()

# Crop Mobile banner title area
$m = [System.Drawing.Bitmap]::FromFile('d:\SVS\src\assets\hero-banner-mobile.jpg')
$mCrop = New-Object System.Drawing.Bitmap(1000, 450)
$g2 = [System.Drawing.Graphics]::FromImage($mCrop)
$g2.DrawImage($m, [System.Drawing.Rectangle]::new(0, 0, 1000, 450), [System.Drawing.Rectangle]::new(50, 200, 1000, 450), [System.Drawing.GraphicsUnit]::Pixel)
$mCrop.Save('d:\SVS\scratch\verify-mobile-crop.png', [System.Drawing.Imaging.ImageFormat]::Png)
$g2.Dispose()
$mCrop.Dispose()
$m.Dispose()
Write-Host 'Verification crops generated'
