Add-Type -AssemblyName System.Drawing

$cleanSmall = [System.Drawing.Bitmap]::FromFile("d:\SVS\scratch\clean-fade-v3.png")

$targetW = 2560
$targetH = 1022

$banner = New-Object System.Drawing.Bitmap($targetW, $targetH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($banner)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit

# Draw upscaled clean background
$g.DrawImage($cleanSmall, 0, 0, $targetW, $targetH)
$cleanSmall.Dispose()

# Step 1: Draw SVS Official Logo
$logoFile = "d:\SVS\public\logo-cropped.png"
$svsLogo = [System.Drawing.Bitmap]::FromFile($logoFile)
# Logo size: 330px width x 389px height
$logoW = 330
$logoH = [int]($logoW * (828.0 / 702.0))
$logoX = 395
$logoY = 30
$g.DrawImage($svsLogo, $logoX, $logoY, $logoW, $logoH)
$svsLogo.Dispose()

# Step 2: Typography
$brushDark = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 24, 48, 44))
$brushGreen = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 14, 110, 58))
$brushSub = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 52, 80, 74))

# Choose font family: Century Gothic if available, else Segoe UI
$fontFam = "Segoe UI"
$fontCheck = [System.Drawing.FontFamily]::Families | ForEach-Object { $_.Name }
if ($fontCheck -contains "Century Gothic") { $fontFam = "Century Gothic" }

$fontHead1 = New-Object System.Drawing.Font($fontFam, 42, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$fontHead2 = New-Object System.Drawing.Font($fontFam, 70, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$fontSub = New-Object System.Drawing.Font("Segoe UI", 22, [System.Drawing.FontStyle]::SemiBold, [System.Drawing.GraphicsUnit]::Pixel)

$textX = 160
$g.DrawString("Your Trusted Trading Partner for", $fontHead1, $brushDark, $textX, 435)
$g.DrawString("Nutraceutical Ingredients", $fontHead2, $brushGreen, ($textX - 2), 490)
$g.DrawString("Vitamins   |   Minerals   |   Botanical Extracts   |   Amino Acids   |   Speciality Ingredients", $fontSub, $brushSub, $textX, 582)

# Step 3: Draw 4 Trust Badges
$penCircle = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 14, 110, 58), 3.2)
$penDivider = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(180, 200, 210, 205), 1.5)
$fontBadgeTitle = New-Object System.Drawing.Font("Segoe UI", 21, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$fontBadgeSub = New-Object System.Drawing.Font("Segoe UI", 19, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)

$sfCenter = New-Object System.Drawing.StringFormat
$sfCenter.Alignment = [System.Drawing.StringAlignment]::Center

$badgeData = @(
    @{ CenterX = 240; Line1 = "High Quality"; Line2 = "Raw Materials"; Type = "leaf" },
    @{ CenterX = 490; Line1 = "Reliable"; Line2 = "Supply Chain"; Type = "shield" },
    @{ CenterX = 730; Line1 = "Global"; Line2 = "Partnerships"; Type = "handshake" },
    @{ CenterX = 980; Line1 = "Compliance &"; Line2 = "Quality Assurance"; Type = "award" }
)

$circleRadius = 42
$circleY = 715

for ($i = 0; $i -lt $badgeData.Length; $i++) {
    $b = $badgeData[$i]
    $cx = $b.CenterX
    
    # Draw Circle
    $g.DrawEllipse($penCircle, ($cx - $circleRadius), ($circleY - $circleRadius), ($circleRadius * 2), ($circleRadius * 2))
    
    $penIcon = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 14, 110, 58), 2.8)
    $penIcon.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $penIcon.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    
    if ($b.Type -eq "leaf") {
        # Two elegant leaves
        # Primary leaf
        $path1 = New-Object System.Drawing.Drawing2D.GraphicsPath
        $path1.AddBezier(($cx - 15), ($circleY + 14), ($cx - 20), ($circleY - 4), ($cx - 4), ($circleY - 18), ($cx + 14), ($circleY - 18))
        $path1.AddBezier(($cx + 14), ($circleY - 18), ($cx + 16), ($circleY - 2), ($cx + 4), ($circleY + 14), ($cx - 15), ($circleY + 14))
        $g.DrawPath($penIcon, $path1)
        # Center vein
        $g.DrawLine($penIcon, ($cx - 15), ($circleY + 14), ($cx + 8), ($circleY - 10))
        # Small side leaf
        $path2 = New-Object System.Drawing.Drawing2D.GraphicsPath
        $path2.AddBezier(($cx - 4), ($circleY + 4), ($cx - 16), ($circleY + 1), ($cx - 16), ($circleY - 10), ($cx - 6), ($circleY - 8))
        $g.DrawPath($penIcon, $path2)
        $path1.Dispose(); $path2.Dispose()
    }
    elseif ($b.Type -eq "shield") {
        # Shield outline
        $path = New-Object System.Drawing.Drawing2D.GraphicsPath
        $path.AddLine(($cx - 16), ($circleY - 16), ($cx + 16), ($circleY - 16))
        $path.AddBezier(($cx + 16), ($circleY - 16), ($cx + 18), ($circleY + 8), ($cx + 8), ($circleY + 18), $cx, ($circleY + 22))
        $path.AddBezier($cx, ($circleY + 22), ($cx - 8), ($circleY + 18), ($cx - 18), ($circleY + 8), ($cx - 16), ($circleY - 16))
        $g.DrawPath($penIcon, $path)
        # Bold checkmark
        $g.DrawLine($penIcon, ($cx - 8), ($circleY + 2), ($cx - 2), ($circleY + 8))
        $g.DrawLine($penIcon, ($cx - 2), ($circleY + 8), ($cx + 9), ($circleY - 5))
        $path.Dispose()
    }
    elseif ($b.Type -eq "handshake") {
        # Elegant handshake vector
        $g.DrawLine($penIcon, ($cx - 18), ($circleY - 8), ($cx - 8), ($circleY + 4))
        $g.DrawLine($penIcon, ($cx - 8), ($circleY + 4), ($cx - 2), ($circleY + 1))
        $g.DrawLine($penIcon, ($cx - 2), ($circleY + 1), ($cx + 6), ($circleY + 7))
        $g.DrawLine($penIcon, ($cx + 6), ($circleY + 7), ($cx + 18), ($circleY - 6))
        
        # Sleeves / cuffs
        $g.DrawLine($penIcon, ($cx - 18), ($circleY - 8), ($cx - 12), ($circleY - 14))
        $g.DrawLine($penIcon, ($cx + 18), ($circleY - 6), ($cx + 12), ($circleY - 14))
        # Thumb / grip lines
        $g.DrawLine($penIcon, ($cx - 8), ($circleY - 6), ($cx - 2), ($circleY - 2))
        $g.DrawLine($penIcon, ($cx + 8), ($circleY - 6), ($cx + 2), ($circleY - 2))
    }
    elseif ($b.Type -eq "award") {
        # Rosette badge circle
        $g.DrawEllipse($penIcon, ($cx - 15), ($circleY - 18), 30, 30)
        # Checkmark inside rosette
        $g.DrawLine($penIcon, ($cx - 6), ($circleY - 4), ($cx - 1), ($circleY + 2))
        $g.DrawLine($penIcon, ($cx - 1), ($circleY + 2), ($cx + 7), ($circleY - 8))
        # Ribbons hanging below
        $g.DrawLine($penIcon, ($cx - 8), ($circleY + 10), ($cx - 14), ($circleY + 22))
        $g.DrawLine($penIcon, ($cx - 14), ($circleY + 22), ($cx - 4), ($circleY + 17))
        $g.DrawLine($penIcon, ($cx + 8), ($circleY + 10), ($cx + 14), ($circleY + 22))
        $g.DrawLine($penIcon, ($cx + 14), ($circleY + 22), ($cx + 4), ($circleY + 17))
    }
    $penIcon.Dispose()
    
    # Text below circle
    $textY = $circleY + $circleRadius + 16
    $g.DrawString($b.Line1, $fontBadgeTitle, $brushDark, $cx, $textY, $sfCenter)
    $g.DrawString($b.Line2, $fontBadgeSub, $brushSub, $cx, ($textY + 26), $sfCenter)
    
    # Divider line between columns
    if ($i -lt ($badgeData.Length - 1)) {
        $divX = [int](($b.CenterX + $badgeData[$i + 1].CenterX) / 2.0)
        $g.DrawLine($penDivider, $divX, ($circleY - 25), $divX, ($textY + 50))
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

$banner.Save("d:\SVS\scratch\master-banner-v2.png", [System.Drawing.Imaging.ImageFormat]::Png)
$banner.Dispose()
Write-Host "Master banner v2 generated successfully!"
