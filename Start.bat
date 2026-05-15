@echo off
cd /d "%~dp0"
echo Starting PlayStation Cafe Manager V5.2 Stable...
where node >nul 2>nul
if %errorlevel%==0 (
  start "" "http://localhost:8000/index.html"
  node server.js
  pause
  exit /b
)
echo Node.js not found. Opening index.html directly...
start "" "%~dp0index.html"
pause
