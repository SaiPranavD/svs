Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Bitmap]::FromFile("d:\SVS\public\hero-banner.png")
Write-Host "Colors along x=460:"
for ($y = 0; $y -lt 409; $y += 25) {
    $c = $src.GetPixel(460, $y)
    Write-Host ("y=" + $y + ": RGB(" + $c.R + "," + $c.G + "," + $c.B + ")")
}
$src.Dispose()
