@echo off
cd /d "%~dp0"
echo ============================================
echo   Pushing Expense Tracker to GitHub...
echo ============================================
echo.
git push -u origin main --force
echo.
echo ============================================
echo   Done! Check github.com/rumanmushtaq/expense-tracker
echo ============================================
echo.
pause
