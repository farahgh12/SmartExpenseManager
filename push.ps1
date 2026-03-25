# Helper script to push changes to GitHub
$date = Get-Date -Format "yyyy-MM-dd HH:mm"
write-host "Pushing changes to GitHub... ($date)" -ForegroundColor Cyan

git add .
git commit -m "Update: $date"
git push origin main

write-host "Done! Your changes are now on GitHub." -ForegroundColor Green
