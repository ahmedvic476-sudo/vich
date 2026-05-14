@echo off
cd /d "%~dp0"

echo Starting PlayStation Cafe Manager...

where node >nul 2>nul
if %errorlevel%==0 (
    echo Node.js found. Starting local server...
    start "" "http://localhost:8000/index.html"
    node server.js
    pause
    exit /b
)

echo Node.js not found.
echo Opening index.html directly...
start "" "%~dp0index.html"
pause
