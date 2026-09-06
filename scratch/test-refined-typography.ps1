Add-Type -AssemblyName System.Drawing

function DrawTrackedWords($g, $words, $font, $brush, $startX, $startY, $tracking, $wordSpacing, $alignment) {
    # Calculate widths of words
    $wordWidths = @()
    $totalWidth = 0.0
    
    for ($wIdx = 0; $wIdx -lt $words.Length; $wIdx++) {
        $word = $words[$wIdx]
        $wSum = 0.0
        for ($cIdx = 0; $cIdx -lt $word.Length; $cIdx++) {
            $ch = $word[$cIdx].ToString()
            $sz = $g.MeasureString($ch, $font, (New-Object System.Drawing.PointF(0,0)), [System.Drawing.StringFormat]::GenericTypographic)
            $wSum += $sz.Width + $tracking
        }
        $wSum -= $tracking # remove trailing tracking on word
        $wordWidths += $wSum
        $totalWidth += $wSum
        if ($wIdx -lt ($words.Length - 1)) {
            $totalWidth += $wordSpacing
        }
    }
    
    $curX = $startX
    if ($alignment -eq "center") {
        $curX = $startX - ($totalWidth / 2.0)
    }
    
    for ($wIdx = 0; $wIdx -lt $words.Length; $wIdx++) {
        $word = $words[$wIdx]
        for ($cIdx = 0; $cIdx -lt $word.Length; $cIdx++) {
            $ch = $word[$cIdx].ToString()
            $sz = $g.MeasureString($ch, $font, (New-Object System.Drawing.PointF(0,0)), [System.Drawing.StringFormat]::GenericTypographic)
            $g.DrawString($ch, $font, $brush, [float]$curX, [float]$startY, [System.Drawing.StringFormat]::GenericTypographic)
            $curX += $sz.Width + $tracking
        }
        $curX -= $tracking # adjust for last char
        $curX += $wordSpacing
    }
}

function GenerateRefinedBanner($outPath, $align) {
    $src = [System.Drawing.Bitmap]::FromFile("d:\SVS\scratch\banner-clean-2048.png")
    $bmp = New-Object System.Drawing.Bitmap($src)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit
    
    $colorForest = [System.Drawing.Color]::FromArgb(255, 14, 110, 56)
    $colorSlate = [System.Drawing.Color]::FromArgb(255, 30, 56, 48)
    
    $brushForest = New-Object System.Drawing.SolidBrush($colorForest)
    $brushSlate = New-Object System.Drawing.SolidBrush($colorSlate)
    
    $fontBrand = New-Object System.Drawing.Font("Century Gothic", 38, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
    $fontTagline = New-Object System.Drawing.Font("Century Gothic", 18, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
    
    if ($align -eq "left") {
        $x = 68
        $y1 = 200
        $y2 = 265
        DrawTrackedWords $g @("SVS", "NUTRACEUTICALS") $fontBrand $brushForest $x $y1 2.5 22 "left"
        DrawTrackedWords $g @("QUALITY", "INGREDIENTS.", "RELIABLE", "SUPPLY.") $fontTagline $brushSlate $x $y2 2.0 16 "left"
    }
    else {
        # Centered over the left content column
        $cx = 485
        $y1 = 190
        $y2 = 258
        DrawTrackedWords $g @("SVS", "NUTRACEUTICALS") $fontBrand $brushForest $cx $y1 2.5 22 "center"
        DrawTrackedWords $g @("QUALITY", "INGREDIENTS.", "RELIABLE", "SUPPLY.") $fontTagline $brushSlate $cx $y2 2.0 16 "center"
    }
    
    $brushForest.Dispose()
    $brushSlate.Dispose()
    $fontBrand.Dispose()
    $fontTagline.Dispose()
    $g.Dispose()
    $src.Dispose()
    
    $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Host "Saved $outPath"
}

GenerateRefinedBanner "d:\SVS\scratch\banner-refined-left-v2.png" "left"
GenerateRefinedBanner "d:\SVS\scratch\banner-refined-center-v2.png" "center"
