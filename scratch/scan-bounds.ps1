Add-Type -AssemblyName System.Drawing

$bmp = [System.Drawing.Bitmap]::FromFile("d:\SVS\public\hero-banner.png")
Write-Host "Checking where the leaves on left end, and where artwork on right begins:"

# Check row y=100 across x=40 to 100
for ($x = 40; $x -le 100; $x += 10) {
    $c = $bmp.GetPixel($x, 100)
    Write-Host ("y=100, x=" + $x + ": (" + $c.R + "," + $c.G + "," + $c.B + ")")
}

# Check row y=100 across x=420 to 520
for ($x = 420; $x -le 520; $x += 20) {
    $c = $bmp.GetPixel($x, 100)
    Write-Host ("y=100, x=" + $x + ": (" + $c.R + "," + $c.G + "," + $c.B + ")")
}

# Check row y=350 (tabletop) across x=400 to 500
for ($x = 400; $x -le 500; $x += 20) {
    $c = $bmp.GetPixel($x, 350)
    Write-Host ("y=350, x=" + $x + ": (" + $c.R + "," + $c.G + "," + $c.B + ")")
}

$bmp.Dispose()
