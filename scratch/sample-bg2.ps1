Add-Type -AssemblyName System.Drawing
$bmp = [System.Drawing.Bitmap]::FromFile("d:\SVS\public\hero-banner.png")
Write-Host "Sample pixels x=50, 100, 350, 400 at y=40, 80, 120, 160:"
foreach ($y in @(30, 60, 90, 120, 150)) {
    $c1 = $bmp.GetPixel(70, $y)
    $c2 = $bmp.GetPixel(380, $y)
    Write-Host "y=$y | x=70: ($($c1.R),$($c1.G),$($c1.B)) | x=380: ($($c2.R),$($c2.G),$($c2.B))"
}
$bmp.Dispose()
