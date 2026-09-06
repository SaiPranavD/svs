Add-Type -AssemblyName System.Drawing
$bmp = [System.Drawing.Bitmap]::FromFile("d:\SVS\public\logo-cropped.png")
$c = $bmp.GetPixel(10, 10)
Write-Host "logo-cropped.png (10,10): A=$($c.A), R=$($c.R), G=$($c.G), B=$($c.B)"
$c2 = $bmp.GetPixel(350, 400)
Write-Host "logo-cropped.png (350,400): A=$($c2.A), R=$($c2.R), G=$($c2.G), B=$($c2.B)"
$bmp.Dispose()
