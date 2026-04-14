#!/bin/bash

# Quick Start Script for Emagi Digital

echo "🎨 Emagi Digital - Quick Start"
echo "=============================="

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo "✅ npm found: $(npm --version)"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

# Create data directory
echo ""
echo "📁 Creating data directory..."
mkdir -p data

# Start server
echo ""
echo "🚀 Starting Emagi Digital..."
echo "=============================="
echo ""
echo "🌐 Website: http://localhost:3000"
echo "📊 Admin Panel: http://localhost:3000/admin"
echo "🔐 Default Password: emagi2026"
echo ""
echo "⚠️  Remember to change the default password!"
echo ""

npm start
