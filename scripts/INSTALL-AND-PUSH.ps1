param(
  [string]$RepoPath = "$env:USERPROFILE\Desktop\VIT_PORTAL",
  [string]$Branch = "feat/aiml-d-student-portal-20261031"
)
$ErrorActionPreference = "Stop"
$RepoUrl = "https://github.com/omghotekar01-dotcom/VIT_PORTAL.git"
$AuthorName = "Om Ghotekar"
$AuthorEmail = "omghotekar01@gmail.com"
$BundleRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
function Exec-Git([string[]]$Arguments) {
  & git @Arguments
  if ($LASTEXITCODE -ne 0) { throw "Git command failed: git $($Arguments -join ' ')" }
}
if (-not (Get-Command git -ErrorAction SilentlyContinue)) { throw "Git is not installed. Install Git for Windows first." }
if (-not (Test-Path (Join-Path $RepoPath ".git"))) {
  if (Test-Path $RepoPath) { throw "Target path exists but is not a Git checkout: $RepoPath. Choose another -RepoPath." }
  Write-Host "Cloning $RepoUrl..." -ForegroundColor Cyan
  Exec-Git -Arguments @('clone',$RepoUrl,$RepoPath)
}
Push-Location $RepoPath
try {
  $remote = (& git remote get-url origin).Trim()
  if ($LASTEXITCODE -ne 0 -or $remote -notmatch '^(https://github\.com/omghotekar01-dotcom/VIT_PORTAL(\.git)?|git@github\.com:omghotekar01-dotcom/VIT_PORTAL\.git)$') {
    throw "Wrong repository origin: $remote"
  }
  $dirty = & git status --porcelain
  if ($LASTEXITCODE -ne 0) { throw 'Unable to inspect Git worktree.' }
  if ($dirty) { throw 'Worktree has uncommitted files. Commit or stash them yourself first; no files were overwritten.' }
  Exec-Git -Arguments @('fetch','origin')
  & git show-ref --verify --quiet "refs/heads/$Branch"
  if ($LASTEXITCODE -eq 0) {
    Exec-Git -Arguments @('switch',$Branch)
  } else {
    Exec-Git -Arguments @('switch','-c',$Branch,'origin/main')
  }
  foreach ($entry in @('docs','database','import-templates','PORTAL_SETUP.md')) {
    $source = Join-Path $BundleRoot $entry
    if (-not (Test-Path $source)) { throw "Bundle is missing $source" }
    $destination = Join-Path $RepoPath $entry
    if (Test-Path $source -PathType Container) {
      if (-not (Test-Path $destination)) { New-Item -Path $destination -ItemType Directory | Out-Null }
      Get-ChildItem -LiteralPath $source -Force | Copy-Item -Destination $destination -Recurse -Force
    } else {
      Copy-Item -LiteralPath $source -Destination $destination -Force
    }
  }
  Exec-Git -Arguments @('add','docs','database','import-templates','PORTAL_SETUP.md')
  & git diff --cached --quiet
  if ($LASTEXITCODE -eq 0) { Write-Host 'No new changes to commit.' }
  elseif ($LASTEXITCODE -eq 1) {
    Exec-Git -Arguments @('-c',"user.name=$AuthorName",'-c',"user.email=$AuthorEmail",'commit','-m','feat(portal): add AIML D student auth timetable and admin workspace')
  } else { throw 'Unable to compare staged changes.' }
  $author = (& git show -s '--format=%an <%ae>' HEAD).Trim()
  $committer = (& git show -s '--format=%cn <%ce>' HEAD).Trim()
  $expected = "$AuthorName <$AuthorEmail>"
  if ($author -ne $expected -or $committer -ne $expected) { throw "Identity mismatch. Author=$author; Committer=$committer; expected=$expected" }
  Exec-Git -Arguments @('push','-u','origin',$Branch)
  Exec-Git -Arguments @('fetch','origin',$Branch)
  $local = (& git rev-parse HEAD).Trim()
  $remoteSha = (& git rev-parse "origin/$Branch").Trim()
  if ($local -ne $remoteSha) { throw "Push validation failed. Local $local, remote $remoteSha" }
  Write-Host "SUCCESS: pushed $Branch @ $local" -ForegroundColor Green
  Write-Host "Review at https://github.com/omghotekar01-dotcom/VIT_PORTAL/compare/main...$Branch"
} finally { Pop-Location }
