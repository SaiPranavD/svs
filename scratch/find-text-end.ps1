Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Bitmap]::FromFile("d:\SVS\public\hero-banner.png")
# Scan row y=225 across x=400 to 500 to find where dark green text ends
for ($x = 440; $x -le 490; $x++) {
    $c = $src.GetPixel($x, 225)
    $lum = 0.299 * $c.R + 0.587 * $c.G + 0.114 * $c.B
    if ($lum -lt 200) {
        Write-Host ("Dark pixel at x=" + $x + ", lum=" + $lum)
    }
}
$src.Dispose()
