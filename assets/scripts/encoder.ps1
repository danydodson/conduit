
# Name is the file name with the extension, ie. File1.txt
# BaseName is the file name without the extension, ie. File1
# FullName is the path, ie. C:\folder\File1.txt

Write-Host "starting cwebp script..."

$files = Get-ChildItem "C:/Users/Dany/Projects/Working/SeeSe/public/images/food"

foreach ($f in $files) {
  $outfile = $f.FullName.Replace('.jpg', '') + '.webp' 
  Get-Content $f.FullName | cwebp.exe $f -q 80 -o $outfile
}

Write-Host "cwebp completed successfuly"