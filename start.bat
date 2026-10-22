@echo off
echo ========================================================
echo     Starting SavageTruth - Unfiltered Reviews Platform
echo     Backend: Laravel 13 API (Port 8000)
echo     Frontend: React Modern UI (Port 3000)
echo ========================================================

start "SavageTruth Laravel 13 API" cmd /k "cd backend && php artisan serve --port=8000"
start "SavageTruth React Frontend" cmd /k "cd frontend && npm run dev"

echo Both services launched!
echo Access Web App at: http://localhost:3000
echo Access Laravel API at: http://127.0.0.1:8000/api/health
echo In Laragon: http://trueorbit.test/backend/public
pause
