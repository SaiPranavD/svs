Add-Type -AssemblyName System.Drawing
$src = [System.Drawing.Bitmap]::FromFile("d:\SVS\public\hero-banner.png")
Write-Host "Top right sky pixels:"
foreach ($x in @(820, 880, 950, 1010)) {
    $c = $src.GetPixel($x, 20)
    Write-Host "x=$x, y=20: RGB($($c.R),$($c.G),$($c.B))"
}
$src.Dispose()
