Add-Type -AssemblyName System.Drawing

$pfc = New-Object System.Drawing.Text.PrivateFontCollection
$pfc.AddFontFile("d:\SVS\scratch\Poppins-Regular.ttf")
$pfc.AddFontFile("d:\SVS\scratch\Poppins-Bold.ttf")
$pfc.AddFontFile("d:\SVS\scratch\Outfit.ttf")

$poppinsFam = $pfc.Families | Where-Object { $_.Name -eq "Poppins" }
$outfitFam = $pfc.Families | Where-Object { $_.Name -like "*Outfit*" }

$cgFam = [System.Drawing.FontFamily]::Families | Where-Object { $_.Name -eq "Century Gothic" }
$twFam = [System.Drawing.FontFamily]::Families | Where-Object { $_.Name -eq "Tw Cen MT" }

$compBmp = New-Object System.Drawing.Bitmap(1000, 600)
$g = [System.Drawing.Graphics]::FromImage($compBmp)
$g.Clear([System.Drawing.Color]::White)
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit

# Draw original crop at top
$orig = [System.Drawing.Bitmap]::FromFile("d:\SVS\scratch\zoom-text.png")
$g.DrawImage($orig, 20, 10)
$orig.Dispose()

$brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 8, 25, 19))
$brushGreen = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 24, 93, 43))

$y = 120

function DrawSample($name, $fam, $sizeReg, $sizeBold) {
    global:
    $fReg = New-Object System.Drawing.Font($fam, $sizeReg, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
    $fBold = New-Object System.Drawing.Font($fam, $sizeBold, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
    $fLabel = New-Object System.Drawing.Font("Segoe UI", 12, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
    $brushLabel = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::Gray)
    
    $g.DrawString($name, $fLabel, $brushLabel, 20, $y)
    $g.DrawString("Your Trusted Trading Partner for", $fReg, $brush, 20, ($y + 20))
    $g.DrawString("Nutraceutical Ingredients", $fBold, $brushGreen, 20, ($y + 50))
    
    $fReg.Dispose(); $fBold.Dispose(); $fLabel.Dispose(); $brushLabel.Dispose()
    $script:y += 110
}

DrawSample "Century Gothic" $cgFam 26 34
DrawSample "Poppins" $poppinsFam 24 32
DrawSample "Outfit" $outfitFam 25 34
DrawSample "Tw Cen MT" $twFam 26 34

$compBmp.Save("d:\SVS\scratch\font-comparison.png", [System.Drawing.Imaging.ImageFormat]::Png)
$compBmp.Dispose()
$g.Dispose()
$brush.Dispose()
$brushGreen.Dispose()
Write-Host "font-comparison.png saved"
