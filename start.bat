@echo off
REM Quick Start Script for Emagi Digital (Windows)

echo 🎨 Emagi Digital - Quick Start
echo ==============================

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    echo Visit: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js is installed
echo ✅ npm is installed

REM Install dependencies
echo.
echo 📦 Installing dependencies...
call npm install

REM Create data directory
echo.
echo 📁 Creating data directory...
if not exist "data" mkdir data

REM Start server
echo.
echo 🚀 Starting Emagi Digital...
echo ==============================
echo.
echo 🌐 Website: http://localhost:3000
echo 📊 Admin Panel: http://localhost:3000/admin
echo 🔐 Default Password: emagi2026
echo.
echo ⚠️  Remember to change the default password!
echo.

call npm start
pause
