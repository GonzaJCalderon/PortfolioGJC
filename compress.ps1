Add-Type -AssemblyName System.Drawing

$sourcePath = "c:\Users\Gonza\Desktop\gonza\PortfolioGJC-main\public\og-image.png"
$destPath = "c:\Users\Gonza\Desktop\gonza\PortfolioGJC-main\public\og-image.jpg"

$img = [System.Drawing.Image]::FromFile($sourcePath)
$newWidth = 1200
$newHeight = [int]($img.Height * ($newWidth / $img.Width))

$bmp = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.DrawImage($img, 0, 0, $newWidth, $newHeight)
$g.Dispose()

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 80L)

$bmp.Save($destPath, $codec, $encoderParams)
$bmp.Dispose()
$img.Dispose()

Write-Host "Image compressed successfully."
