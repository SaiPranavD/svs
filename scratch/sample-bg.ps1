Add-Type -AssemblyName System.Drawing
$bmp = [System.Drawing.Bitmap]::FromFile("d:\SVS\public\hero-banner.png")
Write-Host "Sample pixels around logo:"
foreach ($y in @(30, 60, 90, 120, 150)) {
    $c = $bmp.GetPixel(200, $y)
    Write-Host "x=200, y=$y : R=$($c.R), G=$($c.G), B=$($c.B)"
}
$bmp.Dispose()
