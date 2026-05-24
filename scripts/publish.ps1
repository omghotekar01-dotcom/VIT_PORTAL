param(
    [string]$GitHubUsername = $env:GITHUB_USERNAME,
    [string]$RepoName = "vit-portal",
    [ValidateSet('public', 'private')][string]$Visibility = "public"
)

function Fail([string]$msg) { Write-Host $msg -ForegroundColor Red; exit 1 }

if (-not (Get-Command git -ErrorAction SilentlyContinue)) { Fail 'Git is not installed or not in PATH.' }

if (-not (Test-Path .git)) {
    git init
}

# Stage everything but ignore patterns (ensure .gitignore exists)
git add .

try {
    git commit -m "chore: initial commit - VIT PORTAL" -q
}
catch {
    Write-Host "No changes to commit or commit aborted." -ForegroundColor Yellow
}

git branch -M main

$gh = Get-Command gh -ErrorAction SilentlyContinue
if ($gh) {
    if (-not $GitHubUsername) { Fail "Please provide -GitHubUsername or set the GITHUB_USERNAME environment variable." }
    gh repo create "$GitHubUsername/$RepoName" --$Visibility --source=. --remote=origin --push
    Write-Host "Repository created and pushed: https://github.com/$GitHubUsername/$RepoName" -ForegroundColor Green
}
else {
    Write-Host "GitHub CLI 'gh' not found. Create the repo manually at https://github.com/new then run:" -ForegroundColor Yellow
    Write-Host "  git remote add origin https://github.com/<username>/$RepoName.git"
    Write-Host "  git push -u origin main"
}
