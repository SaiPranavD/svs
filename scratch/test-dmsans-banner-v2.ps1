Add-Type -AssemblyName System.Drawing

$pfc = New-Object System.Drawing.Text.PrivateFontCollection
$pfc.AddFontFile("d:\SVS\scratch\DMSans.ttf")
$dmFam = $pfc.Families | Where-Object { $_.Name -match "DM Sans" } | Select-Object -First 1

function CreateRefinedDMBanner($outPath, $yStart, $brandSize, $subSize, $brandLetterSpace, $subLetterSpace) {
    $src = [System.Drawing.Bitmap]::FromFile("d:\SVS\scratch\banner-clean-2048.png")
    $bmp = New-Object System.Drawing.Bitmap($src)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
    
    # Exact colors sampled from the surrounding artwork text
    $brushBrand = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(245, 20, 105, 48))
    $brushSub = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(235, 55, 78, 70))
    
    $fontBrand = New-Object System.Drawing.Font($dmFam, $brandSize, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
    $fontSub = New-Object System.Drawing.Font($dmFam, $subSize, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
    
    # Render with natural character spacing
    $x = 68
    $y1 = $yStart
    $y2 = $yStart + $brandSize + 16
    
    # We draw line 1
    $curX = $x
    $text1 = "SVS NUTRACEUTICALS"
    for ($i = 0; $i -lt $text1.Length; $i++) {
        $ch = $text1[$i].ToString()
        $sz = $g.MeasureString($ch, $fontBrand, (New-Object System.Drawing.PointF(0,0)), [System.Drawing.StringFormat]::GenericTypographic)
        $g.DrawString($ch, $fontBrand, $brushBrand, [float]$curX, [float]$y1, [System.Drawing.StringFormat]::GenericTypographic)
        $advance = if ($ch -eq " ") { 16.0 } else { $sz.Width + $brandLetterSpace }
        $curX += $advance
    }
    
    # We draw line 2
    $curX = $x
    $text2 = "QUALITY INGREDIENTS. RELIABLE SUPPLY."
    for ($i = 0; $i -lt $text2.Length; $i++) {
        $ch = $text2[$i].ToString()
        $sz = $g.MeasureString($ch, $fontSub, (New-Object System.Drawing.PointF(0,0)), [System.Drawing.StringFormat]::GenericTypographic)
        $g.DrawString($ch, $fontSub, $brushSub, [float]$curX, [float]$y2, [System.Drawing.StringFormat]::GenericTypographic)
        $advance = if ($ch -eq " ") { 12.0 } else { $sz.Width + $subLetterSpace }
        $curX += $advance
    }
    
    $brushBrand.Dispose()
    $brushSub.Dispose()
    $fontBrand.Dispose()
    $fontSub.Dispose()
    $g.Dispose()
    $src.Dispose()
    
    $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Host "Generated $outPath"
}

# Version with perfect optical spacing:
CreateRefinedDMBanner "d:\SVS\scratch\dm-banner-perfect.png" 235 40 20 1.8 1.4
CreateRefinedDMBanner "d:\SVS\scratch\dm-banner-perfect-higher.png" 210 40 20 1.8 1.4
