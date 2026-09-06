Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Bitmap]::FromFile("d:\SVS\public\hero-banner.png")
Write-Host "Width: $($src.Width), Height: $($src.Height)"

# Check color at x=200, y=10 (above logo):
$c1 = $src.GetPixel(200, 10)
# Check color at x=200, y=160 (between logo and headline):
$c2 = $src.GetPixel(200, 160)
# Check color at x=200, y=270 (between subhead and badges):
$c3 = $src.GetPixel(200, 270)
# Check color at x=200, y=400 (at bottom of badges):
$c4 = $src.GetPixel(200, 400)

Write-Host "y=10:  RGB($($c1.R),$($c1.G),$($c1.B))"
Write-Host "y=160: RGB($($c2.R),$($c2.G),$($c2.B))"
Write-Host "y=270: RGB($($c3.R),$($c3.G),$($c3.B))"
Write-Host "y=400: RGB($($c4.R),$($c4.G),$($c4.B))"

$src.Dispose()
