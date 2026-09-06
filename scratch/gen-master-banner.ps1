Add-Type -AssemblyName System.Drawing

$origSrc = [System.Drawing.Bitmap]::FromFile("d:\SVS\public\hero-banner.png")
$w = $origSrc.Width
$h = $origSrc.Height

# Step 1: Create clean 1024x409 background
$cleanSmall = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$gSmall = [System.Drawing.Graphics]::FromImage($cleanSmall)
$gSmall.DrawImage($origSrc, 0, 0, $w, $h)

# Fill text and badge area
$brushMain = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    (New-Object System.Drawing.Point(200, 160)),
    (New-Object System.Drawing.Point(200, 395)),
    [System.Drawing.Color]::FromArgb(255, 255, 255, 255),
    [System.Drawing.Color]::FromArgb(255, 250, 247, 242)
)
$gSmall.FillRectangle($brushMain, 0, 160, 475, 235)
$brushMain.Dispose()

# Fill logo area (x: 40 to 440, y: 8 to 160)
$logoBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 254, 253, 251))
$gSmall.FillRectangle($logoBrush, 40, 8, 420, 152)
$logoBrush.Dispose()

# Feather blend into right side (x: 450 to 500)
for ($y = 8; $y -lt 395; $y++) {
    for ($x = 450; $x -lt 500; $x++) {
        $t = ($x - 450) / (500 - 450)
        $t = $t * $t * (3 - 2 * $t)
        $cOrig = $origSrc.GetPixel($x, $y)
        $cClean = $cleanSmall.GetPixel($x, $y)
        $blendR = [int]($cClean.R * (1 - $t) + $cOrig.R * $t)
        $blendG = [int]($cClean.G * (1 - $t) + $cOrig.G * $t)
        $blendB = [int]($cClean.B * (1 - $t) + $cOrig.B * $t)
        $cleanSmall.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $blendR, $blendG, $blendB))
    }
}

# Preserve leaves in very top-left (x < 50, y < 140)
for ($y = 0; $y -lt 140; $y++) {
    for ($x = 0; $x -lt 50; $x++) {
        $cOrig = $origSrc.GetPixel($x, $y)
        $lum = 0.299 * $cOrig.R + 0.587 * $cOrig.G + 0.114 * $cOrig.B
        if ($cOrig.G -gt $cOrig.R -and $lum -lt 220) {
            $cleanSmall.SetPixel($x, $y, $cOrig)
        }
    }
}
$gSmall.Dispose()

# Step 2: Upscale clean background to 2560 x 1022 using HighQualityBicubic
$targetW = 2560
$targetH = 1022
$banner = New-Object System.Drawing.Bitmap($targetW, $targetH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($banner)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit

$g.DrawImage($cleanSmall, 0, 0, $targetW, $targetH)
$cleanSmall.Dispose()
$origSrc.Dispose()

# Step 3: Draw the Official SVS Logo in the top-left area
$logoFile = "d:\SVS\public\logo-cropped.png"
$svsLogo = [System.Drawing.Bitmap]::FromFile($logoFile)
# Target logo size: 300px width x 354px height (proportional to 702x828)
$logoW = 310
$logoH = [int]($logoW * (828.0 / 702.0))
$logoX = 390
$logoY = 35
$g.DrawImage($svsLogo, $logoX, $logoY, $logoW, $logoH)
$svsLogo.Dispose()

# Step 4: Draw Headlines
# Headline 1: "Your Trusted Trading Partner for"
$fontHead1 = New-Object System.Drawing.Font("Segoe UI", 36, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$brushDark = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 26, 52, 48))
$g.DrawString("Your Trusted Trading Partner for", $fontHead1, $brushDark, 175, 435)

# Headline 2: "Nutraceutical Ingredients"
$fontHead2 = New-Object System.Drawing.Font("Segoe UI", 56, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$brushGreen = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 14, 106, 58))
$g.DrawString("Nutraceutical Ingredients", $fontHead2, $brushGreen, 172, 485)

# Subhead: "Vitamins | Minerals | Botanical Extracts | Amino Acids | Speciality Ingredients"
$fontSub = New-Object System.Drawing.Font("Segoe UI", 20, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$brushSub = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 44, 70, 63))
$g.DrawString("Vitamins   |   Minerals   |   Botanical Extracts   |   Amino Acids   |   Speciality Ingredients", $fontSub, $brushSub, 175, 575)

# Step 5: Draw 4 Feature Badges at the bottom
# Badges area starts at y = 670, height = 240
# 4 columns: x centers ~ 265, 480, 695, 930
$penCircle = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 14, 106, 58), 3)
$penDivider = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(180, 185, 195, 190), 1.5)
$fontBadgeTitle = New-Object System.Drawing.Font("Segoe UI", 19, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$fontBadgeSub = New-Object System.Drawing.Font("Segoe UI", 18, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$sfCenter = New-Object System.Drawing.StringFormat
$sfCenter.Alignment = [System.Drawing.StringAlignment]::Center

$badgeData = @(
    @{ CenterX = 265; Line1 = "High Quality"; Line2 = "Raw Materials"; Type = "leaf" },
    @{ CenterX = 480; Line1 = "Reliable"; Line2 = "Supply Chain"; Type = "shield" },
    @{ CenterX = 695; Line1 = "Global"; Line2 = "Partnerships"; Type = "handshake" },
    @{ CenterX = 935; Line1 = "Compliance &"; Line2 = "Quality Assurance"; Type = "award" }
)

$circleRadius = 38
$circleY = 710

for ($i = 0; $i -lt $badgeData.Length; $i++) {
    $b = $badgeData[$i]
    $cx = $b.CenterX
    
    # Draw Circle
    $g.DrawEllipse($penCircle, ($cx - $circleRadius), ($circleY - $circleRadius), ($circleRadius * 2), ($circleRadius * 2))
    
    # Draw simple vector icon inside circle
    if ($b.Type -eq "leaf") {
        # Leaf curves
        $path = New-Object System.Drawing.Drawing2D.GraphicsPath
        $path.AddBezier(($cx - 14), ($circleY + 12), ($cx - 18), ($circleY - 6), ($cx - 4), ($circleY - 18), ($cx + 12), ($circleY - 18))
        $path.AddBezier(($cx + 12), ($circleY - 18), ($cx + 14), ($circleY - 2), ($cx + 2), ($circleY + 12), ($cx - 14), ($circleY + 12))
        $penIcon = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 14, 106, 58), 2.5)
        $g.DrawPath($penIcon, $path)
        $g.DrawLine($penIcon, ($cx - 14), ($circleY + 12), ($cx + 6), ($circleY - 10))
        $path.Dispose()
        $penIcon.Dispose()
    }
    elseif ($b.Type -eq "shield") {
        # Shield with checkmark
        $path = New-Object System.Drawing.Drawing2D.GraphicsPath
        $path.AddLine(($cx - 15), ($circleY - 14), ($cx + 15), ($circleY - 14))
        $path.AddBezier(($cx + 15), ($circleY - 14), ($cx + 16), ($circleY + 8), ($cx + 8), ($circleY + 16), $cx, ($circleY + 20))
        $path.AddBezier($cx, ($circleY + 20), ($cx - 8), ($circleY + 16), ($cx - 16), ($circleY + 8), ($cx - 15), ($circleY - 14))
        $penIcon = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 14, 106, 58), 2.5)
        $g.DrawPath($penIcon, $path)
        # Checkmark inside
        $g.DrawLine($penIcon, ($cx - 7), ($circleY + 2), ($cx - 2), ($circleY + 7))
        $g.DrawLine($penIcon, ($cx - 2), ($circleY + 7), ($cx + 8), ($circleY - 4))
        $path.Dispose()
        $penIcon.Dispose()
    }
    elseif ($b.Type -eq "handshake") {
        # Handshake icon
        $penIcon = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 14, 106, 58), 2.5)
        $g.DrawLine($penIcon, ($cx - 16), ($circleY - 6), ($cx - 6), ($circleY + 4))
        $g.DrawLine($penIcon, ($cx - 6), ($circleY + 4), $cx, ($circleY + 1))
        $g.DrawLine($penIcon, $cx, ($circleY + 1), ($cx + 6), ($circleY + 6))
        $g.DrawLine($penIcon, ($cx + 6), ($circleY + 6), ($cx + 16), ($circleY - 4))
        $g.DrawLine($penIcon, ($cx - 12), ($circleY - 10), ($cx - 4), ($circleY - 2))
        $g.DrawLine($penIcon, ($cx + 12), ($circleY - 10), ($cx + 4), ($circleY - 2))
        $penIcon.Dispose()
    }
    elseif ($b.Type -eq "award") {
        # Rosette badge
        $penIcon = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 14, 106, 58), 2.5)
        $g.DrawEllipse($penIcon, ($cx - 13), ($circleY - 16), 26, 26)
        # Checkmark
        $g.DrawLine($penIcon, ($cx - 5), ($circleY - 3), ($cx - 1), ($circleY + 1))
        $g.DrawLine($penIcon, ($cx - 1), ($circleY + 1), ($cx + 6), ($circleY - 7))
        # Ribbons below
        $g.DrawLine($penIcon, ($cx - 7), ($circleY + 8), ($cx - 12), ($circleY + 18))
        $g.DrawLine($penIcon, ($cx - 12), ($circleY + 18), ($cx - 3), ($circleY + 15))
        $g.DrawLine($penIcon, ($cx + 7), ($circleY + 8), ($cx + 12), ($circleY + 18))
        $g.DrawLine($penIcon, ($cx + 12), ($circleY + 18), ($cx + 3), ($circleY + 15))
        $penIcon.Dispose()
    }
    
    # Text below circle
    $textY = $circleY + $circleRadius + 15
    $g.DrawString($b.Line1, $fontBadgeTitle, $brushDark, $cx, $textY, $sfCenter)
    $g.DrawString($b.Line2, $fontBadgeSub, $brushSub, $cx, ($textY + 24), $sfCenter)
    
    # Divider line between columns (except after last)
    if ($i -lt ($badgeData.Length - 1)) {
        $divX = [int](($b.CenterX + $badgeData[$i + 1].CenterX) / 2.0)
        $g.DrawLine($penDivider, $divX, ($circleY - 20), $divX, ($textY + 45))
    }
}

# Cleanup
$penCircle.Dispose()
$penDivider.Dispose()
$fontHead1.Dispose()
$fontHead2.Dispose()
$fontSub.Dispose()
$fontBadgeTitle.Dispose()
$fontBadgeSub.Dispose()
$brushDark.Dispose()
$brushGreen.Dispose()
$brushSub.Dispose()
$sfCenter.Dispose()
$g.Dispose()

$banner.Save("d:\SVS\scratch\master-banner-v1.png", [System.Drawing.Imaging.ImageFormat]::Png)
$banner.Dispose()
Write-Host "Master banner v1 generated at 2560x1022!"
