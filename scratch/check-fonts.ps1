Add-Type -AssemblyName System.Drawing
$fonts = [System.Drawing.FontFamily]::Families | ForEach-Object { $_.Name }
$check = @("Segoe UI", "Segoe Script", "Ink Free", "Century Gothic", "Arial", "Montserrat", "Outfit", "Inter", "Bahnschrift", "Trebuchet MS", "Lucida Handwriting")
foreach ($f in $check) {
    if ($fonts -contains $f) {
        Write-Host "Found: $f"
    }
}
