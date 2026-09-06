Add-Type -AssemblyName System.Drawing

# Load the clean background where the old fake logo and text were completely removed
$cleanSmall = [System.Drawing.Bitmap]::FromFile("d:\SVS\scratch\clean-fade-v3.png")

$targetW = 2560
$targetH = 1022

function Create-MasterBanner([bool]$withOfficialLogo, [string]$outputPath) {
    $banner = New-Object System.Drawing.Bitmap($targetW, $targetH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($banner)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit

    # Draw upscaled pristine background
    $g.DrawImage($cleanSmall, 0, 0, $targetW, $targetH)

    $brushDark = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 20, 42, 38))
    $brushGreen = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 14, 112, 58))
    $brushSub = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 48, 76, 70))

    $fontFam = "Century Gothic"
    $fontCheck = [System.Drawing.FontFamily]::Families | ForEach-Object { $_.Name }
    if (-not ($fontCheck -contains "Century Gothic")) { $fontFam = "Segoe UI" }

    if ($withOfficialLogo) {
        # Official SVS Logo in top-left
        $logoFile = "d:\SVS\public\logo-cropped.png"
        $svsLogo = [System.Drawing.Bitmap]::FromFile($logoFile)
        # Logo size: 340px width x 401px height
        $logoW = 340
        $logoH = [int]($logoW * (828.0 / 702.0))
        $logoX = 380
        $logoY = 28
        $g.DrawImage($svsLogo, $logoX, $logoY, $logoW, $logoH)
        $svsLogo.Dispose()

        $head1Y = 440
        $head2Y = 496
        $subY = 588
        $badgeCircleY = 720
    } else {
        # Without logo - text moved up gracefully
        $head1Y = 240
        $head2Y = 300
        $subY = 400
        $badgeCircleY = 620
    }

    # Typography
    $fontHead1 = New-Object System.Drawing.Font($fontFam, 42, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
    $fontHead2 = New-Object System.Drawing.Font($fontFam, 70, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
    $fontSub = New-Object System.Drawing.Font("Segoe UI", 22, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)

    $textX = 160
    $g.DrawString("Your Trusted Trading Partner for", $fontHead1, $brushDark, $textX, $head1Y)
    $g.DrawString("Nutraceutical Ingredients", $fontHead2, $brushGreen, ($textX - 2), $head2Y)
    $g.DrawString("Vitamins   |   Minerals   |   Botanical Extracts   |   Amino Acids   |   Speciality Ingredients", $fontSub, $brushSub, $textX, $subY)

    # 4 Trust Badges
    $penCircle = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 14, 112, 58), 3.2)
    $penDivider = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(180, 205, 215, 210), 1.5)
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

    for ($i = 0; $i -lt $badgeData.Length; $i++) {
        $b = $badgeData[$i]
        $cx = $b.CenterX
        $cy = $badgeCircleY
        
        # Draw Circle
        $g.DrawEllipse($penCircle, ($cx - $circleRadius), ($cy - $circleRadius), ($circleRadius * 2), ($circleRadius * 2))
        
        $penIcon = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 14, 112, 58), 2.8)
        $penIcon.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
        $penIcon.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
        
        if ($b.Type -eq "leaf") {
            $path1 = New-Object System.Drawing.Drawing2D.GraphicsPath
            $path1.AddBezier(($cx - 15), ($cy + 14), ($cx - 20), ($cy - 4), ($cx - 4), ($cy - 18), ($cx + 14), ($cy - 18))
            $path1.AddBezier(($cx + 14), ($cy - 18), ($cx + 16), ($cy - 2), ($cx + 4), ($cy + 14), ($cx - 15), ($cy + 14))
            $g.DrawPath($penIcon, $path1)
            $g.DrawLine($penIcon, ($cx - 15), ($cy + 14), ($cx + 8), ($cy - 10))
            $path2 = New-Object System.Drawing.Drawing2D.GraphicsPath
            $path2.AddBezier(($cx - 4), ($cy + 4), ($cx - 16), ($cy + 1), ($cx - 16), ($cy - 10), ($cx - 6), ($cy - 8))
            $g.DrawPath($penIcon, $path2)
            $path1.Dispose(); $path2.Dispose()
        }
        elseif ($b.Type -eq "shield") {
            $path = New-Object System.Drawing.Drawing2D.GraphicsPath
            $path.AddLine(($cx - 16), ($cy - 16), ($cx + 16), ($cy - 16))
            $path.AddBezier(($cx + 16), ($cy - 16), ($cx + 18), ($cy + 8), ($cx + 8), ($cy + 18), $cx, ($cy + 22))
            $path.AddBezier($cx, ($cy + 22), ($cx - 8), ($cy + 18), ($cx - 18), ($cy + 8), ($cx - 16), ($cy - 16))
            $g.DrawPath($penIcon, $path)
            $g.DrawLine($penIcon, ($cx - 8), ($cy + 2), ($cx - 2), ($cy + 8))
            $g.DrawLine($penIcon, ($cx - 2), ($cy + 8), ($cx + 9), ($cy - 5))
            $path.Dispose()
        }
        elseif ($b.Type -eq "handshake") {
            $g.DrawLine($penIcon, ($cx - 18), ($cy - 8), ($cx - 8), ($cy + 4))
            $g.DrawLine($penIcon, ($cx - 8), ($cy + 4), ($cx - 2), ($cy + 1))
            $g.DrawLine($penIcon, ($cx - 2), ($cy + 1), ($cx + 6), ($cy + 7))
            $g.DrawLine($penIcon, ($cx + 6), ($cy + 7), ($cx + 18), ($cy - 6))
            $g.DrawLine($penIcon, ($cx - 18), ($cy - 8), ($cx - 12), ($cy - 14))
            $g.DrawLine($penIcon, ($cx + 18), ($cy - 6), ($cx + 12), ($cy - 14))
            $g.DrawLine($penIcon, ($cx - 8), ($cy - 6), ($cx - 2), ($cy - 2))
            $g.DrawLine($penIcon, ($cx + 8), ($cy - 6), ($cx + 2), ($cy - 2))
        }
        elseif ($b.Type -eq "award") {
            $g.DrawEllipse($penIcon, ($cx - 15), ($cy - 18), 30, 30)
            $g.DrawLine($penIcon, ($cx - 6), ($cy - 4), ($cx - 1), ($cy + 2))
            $g.DrawLine($penIcon, ($cx - 1), ($cy + 2), ($cx + 7), ($cy - 8))
            $g.DrawLine($penIcon, ($cx - 8), ($cy + 10), ($cx - 14), ($cy + 22))
            $g.DrawLine($penIcon, ($cx - 14), ($cy + 22), ($cx - 4), ($cy + 17))
            $g.DrawLine($penIcon, ($cx + 8), ($cy + 10), ($cx + 14), ($cy + 22))
            $g.DrawLine($penIcon, ($cx + 14), ($cy + 22), ($cx + 4), ($cy + 17))
        }
        $penIcon.Dispose()
        
        # Text below circle
        $textY = $cy + $circleRadius + 16
        $g.DrawString($b.Line1, $fontBadgeTitle, $brushDark, $cx, $textY, $sfCenter)
        $g.DrawString($b.Line2, $fontBadgeSub, $brushSub, $cx, ($textY + 26), $sfCenter)
        
        # Divider line between columns
        if ($i -lt ($badgeData.Length - 1)) {
            $divX = [int](($b.CenterX + $badgeData[$i + 1].CenterX) / 2.0)
            $g.DrawLine($penDivider, $divX, ($cy - 25), $divX, ($textY + 50))
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

    $banner.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $banner.Dispose()
    Write-Host "Saved: $outputPath"
}

# Generate Option A: With Official Logo
Create-MasterBanner $true "d:\SVS\scratch\master-banner-with-logo.png"

# Generate Option B: With Logo Removed Completely
Create-MasterBanner $false "d:\SVS\scratch\master-banner-no-logo.png"

$cleanSmall.Dispose()
Write-Host "Done!"
