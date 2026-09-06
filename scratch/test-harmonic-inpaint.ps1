Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Bitmap]::FromFile("d:\SVS\scratch\original-hero-banner.png")
$w = $src.Width
$h = $src.Height
$len = $w * $h
$result = New-Object System.Drawing.Bitmap($src)

$inpaintMask = New-Object 'bool[]' $len

for ($y = 20; $y -le 155; $y++) {
    for ($x = 55; $x -le 445; $x++) {
        $idx = $y * $w + $x
        if ($x -ge 110 -and $x -le 430 -and $y -ge 20 -and $y -le 155) {
            $inpaintMask[$idx] = $true
        }
        elseif ($x -ge 55 -and $x -lt 110 -and $y -ge 140 -and $y -le 153) {
            $inpaintMask[$idx] = $true
        }
        elseif ($x -gt 430 -and $x -le 445 -and $y -ge 140 -and $y -le 153) {
            $inpaintMask[$idx] = $true
        }
    }
}

$rArr = New-Object 'double[]' $len
$gArr = New-Object 'double[]' $len
$bArr = New-Object 'double[]' $len

for ($y = 0; $y -lt $h; $y++) {
    for ($x = 0; $x -lt $w; $x++) {
        $idx = $y * $w + $x
        $c = $src.GetPixel($x, $y)
        $rArr[$idx] = [double]$c.R
        $gArr[$idx] = [double]$c.G
        $bArr[$idx] = [double]$c.B
    }
}

# Initialize inpaint mask
for ($y = 20; $y -le 155; $y++) {
    for ($x = 55; $x -le 445; $x++) {
        $idx = $y * $w + $x
        if ($inpaintMask[$idx]) {
            $rArr[$idx] = 252.0
            $gArr[$idx] = 252.0
            $bArr[$idx] = 250.0
        }
    }
}

# 300 iterations of Laplace solver
for ($iter = 0; $iter -lt 300; $iter++) {
    for ($y = 20; $y -le 155; $y++) {
        $row = $y * $w
        $rowUp = ($y - 1) * $w
        $rowDown = ($y + 1) * $w
        for ($x = 55; $x -le 445; $x++) {
            $idx = $row + $x
            if ($inpaintMask[$idx]) {
                $rArr[$idx] = ($rArr[$idx - 1] + $rArr[$idx + 1] + $rArr[$rowUp + $x] + $rArr[$rowDown + $x]) * 0.25
                $gArr[$idx] = ($gArr[$idx - 1] + $gArr[$idx + 1] + $gArr[$rowUp + $x] + $gArr[$rowDown + $x]) * 0.25
                $bArr[$idx] = ($bArr[$idx - 1] + $bArr[$idx + 1] + $bArr[$rowUp + $x] + $bArr[$rowDown + $x]) * 0.25
            }
        }
    }
}

for ($y = 20; $y -le 155; $y++) {
    for ($x = 55; $x -le 445; $x++) {
        $idx = $y * $w + $x
        if ($inpaintMask[$idx]) {
            $r = [Math]::Min(255, [Math]::Max(0, [int][Math]::Round($rArr[$idx])))
            $g = [Math]::Min(255, [Math]::Max(0, [int][Math]::Round($gArr[$idx])))
            $b = [Math]::Min(255, [Math]::Max(0, [int][Math]::Round($bArr[$idx])))
            $result.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $r, $g, $b))
        }
    }
}

$result.Save("d:\SVS\scratch\banner-harmonic-clean.png", [System.Drawing.Imaging.ImageFormat]::Png)
$result.Dispose()
$src.Dispose()
Write-Host "Harmonic inpainting complete: banner-harmonic-clean.png"
