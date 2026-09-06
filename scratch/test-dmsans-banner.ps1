Add-Type -AssemblyName System.Drawing

$pfc = New-Object System.Drawing.Text.PrivateFontCollection
$pfc.AddFontFile("d:\SVS\scratch\DMSans.ttf")

# List all families in pfc
Write-Host "PFC Families:"
foreach ($f in $pfc.Families) {
    Write-Host $f.Name
}

# Find regular and medium/bold
$dmFam = $pfc.Families | Where-Object { $_.Name -match "DM Sans" } | Select-Object -First 1

function CreateDMBanner($outPath, $titleCase, $brandColor, $subColor, $brandWeight, $subWeight, $yOffset) {
    $src = [System.Drawing.Bitmap]::FromFile("d:\SVS\scratch\banner-clean-2048.png")
    $bmp = New-Object System.Drawing.Bitmap($src)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
    
    $brushBrand = New-Object System.Drawing.SolidBrush($brandColor)
    $brushSub = New-Object System.Drawing.SolidBrush($subColor)
    
    # Fonts
    $fontBrand = New-Object System.Drawing.Font($dmFam, 38, $brandWeight, [System.Drawing.GraphicsUnit]::Pixel)
    $fontSub = New-Object System.Drawing.Font($dmFam, 19, $subWeight, [System.Drawing.GraphicsUnit]::Pixel)
    
    $sf = New-Object System.Drawing.StringFormat
    $sf.Alignment = [System.Drawing.StringAlignment]::Near
    
    # Left margin aligned with 'Y' of 'Your Trusted Trading Partner for' (x = 68)
    $x = 68
    $y1 = 200 + $yOffset
    $y2 = 256 + $yOffset
    
    $line1 = if ($titleCase) { "SVS Nutraceuticals" } else { "SVS NUTRACEUTICALS" }
    $line2 = if ($titleCase) { "Quality Ingredients. Reliable Supply." } else { "QUALITY INGREDIENTS. RELIABLE SUPPLY." }
    
    $g.DrawString($line1, $fontBrand, $brushBrand, $x, $y1, $sf)
    $g.DrawString($line2, $fontSub, $brushSub, $x, $y2, $sf)
    
    $brushBrand.Dispose()
    $brushSub.Dispose()
    $fontBrand.Dispose()
    $fontSub.Dispose()
    $sf.Dispose()
    $g.Dispose()
    $src.Dispose()
    
    $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Host "Created $outPath"
}

# Colors sampled directly from the artwork:
# Green from "Nutraceutical Ingredients": RGB(20, 105, 48)
# Deep pine from "Your Trusted...": RGB(22, 45, 38)
# Slate from "Vitamins | Minerals": RGB(55, 75, 68)

$cGreen = [System.Drawing.Color]::FromArgb(245, 20, 105, 48)
$cDarkPine = [System.Drawing.Color]::FromArgb(245, 22, 45, 38)
$cMutedSlate = [System.Drawing.Color]::FromArgb(240, 60, 85, 78)

# Option A: ALL CAPS, Green Brand, Deep Pine Tagline, Bold
CreateDMBanner "d:\SVS\scratch\dm-banner-optA.png" $false $cGreen $cMutedSlate ([System.Drawing.FontStyle]::Bold) ([System.Drawing.FontStyle]::Regular) 0

# Option B: ALL CAPS, Deep Pine Brand, Green Tagline
CreateDMBanner "d:\SVS\scratch\dm-banner-optB.png" $false $cDarkPine $cGreen ([System.Drawing.FontStyle]::Bold) ([System.Drawing.FontStyle]::Bold) 0

# Option C: Title Case, matching "Your Trusted Trading Partner for"
CreateDMBanner "d:\SVS\scratch\dm-banner-optC.png" $true $cGreen $cDarkPine ([System.Drawing.FontStyle]::Bold) ([System.Drawing.FontStyle]::Regular) 0
