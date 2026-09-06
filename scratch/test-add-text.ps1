Add-Type -AssemblyName System.Drawing

function CreateBannerWithText($outputPath, $alignMode, $greenColor, $darkColor) {
    $src = [System.Drawing.Bitmap]::FromFile("d:\SVS\scratch\banner-clean-2048.png")
    $w = $src.Width
    $h = $src.Height
    $bmp = New-Object System.Drawing.Bitmap($src)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit
    
    $brushGreen = New-Object System.Drawing.SolidBrush($greenColor)
    $brushDark = New-Object System.Drawing.SolidBrush($darkColor)
    $brushMuted = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 75, 100, 90))
    
    # Fonts
    $fontBrand = New-Object System.Drawing.Font("Century Gothic", 44, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
    $fontTagline = New-Object System.Drawing.Font("Century Gothic", 21, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
    
    $sf = New-Object System.Drawing.StringFormat
    
    if ($alignMode -eq "left") {
        $sf.Alignment = [System.Drawing.StringAlignment]::Near
        $x = 66
        $y1 = 200
        $y2 = 265
        
        $g.DrawString("SVS NUTRACEUTICALS", $fontBrand, $brushGreen, $x, $y1, $sf)
        $g.DrawString("QUALITY INGREDIENTS. RELIABLE SUPPLY.", $fontTagline, $brushDark, $x, $y2, $sf)
    }
    elseif ($alignMode -eq "center") {
        $sf.Alignment = [System.Drawing.StringAlignment]::Center
        $cx = 485
        $y1 = 185
        $y2 = 255
        
        $g.DrawString("SVS NUTRACEUTICALS", $fontBrand, $brushGreen, $cx, $y1, $sf)
        $g.DrawString("QUALITY INGREDIENTS. RELIABLE SUPPLY.", $fontTagline, $brushDark, $cx, $y2, $sf)
    }
    elseif ($alignMode -eq "left-compact") {
        $sf.Alignment = [System.Drawing.StringAlignment]::Near
        $x = 66
        $y1 = 225
        $y2 = 285
        
        # SVS in bold dark green, NUTRACEUTICALS in forest green
        $g.DrawString("SVS NUTRACEUTICALS", $fontBrand, $brushGreen, $x, $y1, $sf)
        $g.DrawString("QUALITY INGREDIENTS. RELIABLE SUPPLY.", $fontTagline, $brushMuted, $x, $y2, $sf)
    }
    
    $brushGreen.Dispose()
    $brushDark.Dispose()
    $brushMuted.Dispose()
    $fontBrand.Dispose()
    $fontTagline.Dispose()
    $sf.Dispose()
    $g.Dispose()
    $src.Dispose()
    
    $bmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Host "Generated $outputPath"
}

$cForestGreen = [System.Drawing.Color]::FromArgb(255, 14, 112, 58)
$cDarkSlate = [System.Drawing.Color]::FromArgb(255, 20, 44, 38)

CreateBannerWithText "d:\SVS\scratch\banner-opt-left.png" "left" $cForestGreen $cDarkSlate
CreateBannerWithText "d:\SVS\scratch\banner-opt-center.png" "center" $cForestGreen $cDarkSlate
CreateBannerWithText "d:\SVS\scratch\banner-opt-compact.png" "left-compact" $cForestGreen $cDarkSlate
