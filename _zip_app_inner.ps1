param(
    [string]$root
)

if (-not $root) { $root = (Get-Location).Path }
$target = "D:\Dropbox\devApps\99.Backup"
$root = (Resolve-Path $root).Path
$parent = Split-Path -Leaf $root
$dt = Get-Date -Format 'yyyyMMdd HH-mm'
$zipName = "$parent $dt.zip"
$out = Join-Path $target $zipName

Write-Host "Project root: $root"
Write-Host "Creating zip: $out"

# Folders to include
$folders = @(
    '.expo',
    '.expo-shared',
    '.vscode',
    'app',
    'assets',
    'components',
    'constants',
    'context',
    'hooks',
    'img',
    'styles',
    'navigators',
    'utils',
	'FigmaWireframe'
)

$existingFolders = @()

foreach ($folder in $folders) {
    $fullPath = Join-Path $root $folder
    if (Test-Path $fullPath) {
        $existingFolders += $fullPath
        Write-Host "Found folder: $folder"
    } else {
        Write-Host "Skipping missing folder: $folder"
    }
}

# Files to include from the root directory
$fileExtensions = @("*")
$extraFiles = @()

foreach ($pattern in $fileExtensions) {
    $found = Get-ChildItem -Path $root -Filter $pattern -File -ErrorAction SilentlyContinue
    $extraFiles += $found.FullName
}



# If nothing to zip, stop
if ($existingFolders.Count -eq 0 -and $extraFiles.Count -eq 0) {
    Write-Host "No matching folders or files found."
    exit 1
}

# Combine everything into one list and compress once
$itemsToZip = @()
$itemsToZip += $existingFolders
$itemsToZip += $extraFiles

if (Test-Path $out) { Remove-Item $out -Force }

Write-Host "Compressing..."
Compress-Archive -Path $itemsToZip -DestinationPath $out -Force

Write-Host ([char]0x2705) "Backup completed successfully: $out"

Start-Sleep -Seconds 5