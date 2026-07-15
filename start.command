#!/bin/bash
# 1-Click Start Script for Stocky Platform
# Gets the current script directory and navigates there
cd "$(dirname "$0")"

echo "Starting Stocky Platform Environment..."
echo "Directory: $(pwd)"

# Start the PHP artisan development server in the background
echo "Starting PHP server (http://127.0.0.1:8000)..."
php artisan serve > serve.log 2>&1 &
PHP_PID=$!

# Ensure PHP server shuts down when we close the terminal or stop the script
trap "echo 'Shutting down PHP Server...'; kill $PHP_PID; exit" EXIT INT TERM

# Give it 2 seconds to ensure the server is ready, then open the browser
sleep 2
open http://127.0.0.1:8000

# Start npm run watch for frontend asset compilation
echo "Starting frontend bundler (npm run watch)..."
npm run watch
