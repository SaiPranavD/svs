Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Bitmap]::FromFile("d:\SVS\scratch\original-hero-banner.png")
$w = $src.Width
$h = $src.Height
$result = New-Object System.Drawing.Bitmap($src)

# Define mask for the logo area only:
# Logo bounds: x in [55, 440], y in [20, 155]
# Note: we must avoid the hanging leaves on the left (x < 115, y < 110)
$mask = New-Object 'bool[,]' $w, $h

for ($y = 20; $y -le 155; $y++) {
    for ($x = 55; $x -le 440; $x++) {
        $c = $src.GetPixel($x, $y)
        $lum = 0.299 * $c.R + 0.587 * $c.G + 0.114 * $c.B
        
        # Check if it's the hanging leaf on the left
        # In crop-left-leaves, the hanging leaf is around x < 115 and y < 105, but only when G > R + 20 and lum < 220
        # Logo leaf is between x: 200 and 270, y: 22 to 65
        $isHangingLeaf = ($x -lt 110 -and $y -lt 110 -and $c.G -gt ($c.R + 15) -and $lum -lt 220)
        
        if (-not $isHangingLeaf) {
            # Logo text (dark green/black), logo lines, and logo leaf (green between x: 200..270)
            if ($lum -lt 242) {
                # Mark as logo pixel to remove (with a slight 1px dilation for antialiasing fringe)
                $mask[$x, $y] = $true
            }
        }
    }
}

# Dilate mask by 1 pixel to ensure no font antialiasing halos remain
$dilatedMask = New-Object 'bool[,]' $w, $h
for ($y = 20; $y -le 155; $y++) {
    for ($x = 55; $x -le 440; $x++) {
        if ($mask[$x, $y]) {
            for ($dy = -1; $dy -le 1; $dy++) {
                for ($dx = -1; $dx -le 1; $dx++) {
                    $nx = $x + $dx
                    $ny = $y + $dy
                    if ($nx -ge 55 -and $nx -le 440 -and $ny -ge 20 -and $ny -le 155) {
                        # don't dilate into hanging leaf
                        $cNeighbor = $src.GetPixel($nx, $ny)
                        $isNeighborHanging = ($nx -lt 110 -and $ny -lt 110 -and $cNeighbor.G -gt ($cNeighbor.R + 15))
                        if (-not $isNeighborHanging) {
                            $dilatedMask[$nx, $ny] = $true
                        }
                    }
                }
            }
        }
    }
}

# Inpainting: For each masked pixel, compute an inverse-distance weighted average of the nearest unmasked background pixels in 8 directions (N, S, E, W, NE, NW, SE, SW)
for ($y = 20; $y -le 155; $y++) {
    for ($x = 55; $x -le 440; $x++) {
        if ($dilatedMask[$x, $y]) {
            $directions = @(
                @{ dx = 0; dy = -1 }, # N
                @{ dx = 0; dy = 1 },  # S
                @{ dx = -1; dy = 0 }, # W
                @{ dx = 1; dy = 0 },  # E
                @{ dx = -1; dy = -1 },# NW
                @{ dx = 1; dy = -1 }, # NE
                @{ dx = -1; dy = 1 }, # SW
                @{ dx = 1; dy = 1 }   # SE
            )
            
            $totalWeight = 0.0
            $totalR = 0.0
            $totalG = 0.0
            $totalB = 0.0
            
            foreach ($dir in $directions) {
                $step = 1
                $found = $false
                while ($step -le 45) {
                    $px = $x + ($dir.dx * $step)
                    $py = $y + ($dir.dy * $step)
                    
                    if ($px -lt 0 -or $px -ge $w -or $py -lt 0 -or $py -ge $h) { break }
                    
                    if (-not $dilatedMask[$px, $py]) {
                        $c = $src.GetPixel($px, $py)
                        # Ensure we don't sample from hanging leaves or headline text
                        $isLeaf = ($px -lt 110 -and $py -lt 110 -and $c.G -gt ($c.R + 15))
                        $isHeadline = ($py -ge 175)
                        if (-not $isLeaf -and -not $isHeadline) {
                            $dist = [Math]::Sqrt($step * $step * ($dir.dx * $dir.dx + $dir.dy * $dir.dy))
                            $weight = 1.0 / [Math]::Pow($dist, 1.2)
                            $totalWeight += $weight
                            $totalR += $c.R * $weight
                            $totalG += $c.G * $weight
                            $totalB += $c.B * $weight
                            $found = $true
                            break
                        }
                    }
                    $step++
                }
            }
            
            if ($totalWeight -gt 0) {
                $finalR = [Math]::Min(255, [Math]::Max(0, [int]($totalR / $totalWeight)))
                $finalG = [Math]::Min(255, [Math]::Max(0, [int]($totalG / $totalWeight)))
                $finalB = [Math]::Min(255, [Math]::Max(0, [int]($totalB / $totalWeight)))
                $result.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $finalR, $finalG, $finalB))
            }
        }
    }
}

$result.Save("d:\SVS\scratch\banner-no-logo-clean.png", [System.Drawing.Imaging.ImageFormat]::Png)
$result.Dispose()
$src.Dispose()
Write-Host "banner-no-logo-clean.png generated successfully!"
