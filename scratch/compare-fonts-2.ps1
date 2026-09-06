Add-Type -AssemblyName System.Drawing

$pfc = New-Object System.Drawing.Text.PrivateFontCollection
$pfc.AddFontFile("d:\SVS\scratch\Poppins-Regular.ttf")
$pfc.AddFontFile("d:\SVS\scratch\PlusJakartaSans.ttf")
$pfc.AddFontFile("d:\SVS\scratch\Urbanist.ttf")
$pfc.AddFontFile("d:\SVS\scratch\Figtree.ttf")
$pfc.AddFontFile("d:\SVS\scratch\DMSans.ttf")

$compBmp = New-Object System.Drawing.Bitmap(1000, 850)
$g = [System.Drawing.Graphics]::FromImage($compBmp)
$g.Clear([System.Drawing.Color]::White)
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit

# Draw original crop at top
$orig = [System.Drawing.Bitmap]::FromFile("d:\SVS\scratch\zoom-text.png")
$g.DrawImage($orig, 20, 10)
$orig.Dispose()

$brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 8, 25, 19))
$brushGreen = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 24, 93, 43))
$brushLabel = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::Gray)
$fLabel = New-Object System.Drawing.Font("Segoe UI", 12, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)

$curY = 125

foreach ($fam in $pfc.Families) {
    try {
        $fReg = New-Object System.Drawing.Font($fam, 24, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
        $fBold = New-Object System.Drawing.Font($fam, 32, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
        
        $g.DrawString($fam.Name, $fLabel, $brushLabel, 20, $curY)
        $g.DrawString("Your Trusted Trading Partner for", $fReg, $brush, 20, ($curY + 20))
        $g.DrawString("Nutraceutical Ingredients", $fBold, $brushGreen, 20, ($curY + 50))
        
        $fReg.Dispose(); $fBold.Dispose()
        $curY += 120
    }
    catch {}
}

$compBmp.Save("d:\SVS\scratch\font-comparison-2.png", [System.Drawing.Imaging.ImageFormat]::Png)
$compBmp.Dispose()
$g.Dispose()
$brush.Dispose()
$brushGreen.Dispose()
$brushLabel.Dispose()
$fLabel.Dispose()
Write-Host "font-comparison-2.png saved"
