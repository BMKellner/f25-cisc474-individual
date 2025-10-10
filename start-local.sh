#!/bin/bash

echo "🚀 Starting local development servers..."
echo ""

# Kill any existing processes on ports 3000-3003
echo "🧹 Cleaning up existing processes..."
lsof -ti:3000 | xargs kill -9 2>/dev/null || true
lsof -ti:3001 | xargs kill -9 2>/dev/null || true
lsof -ti:3002 | xargs kill -9 2>/dev/null || true
lsof -ti:3003 | xargs kill -9 2>/dev/null || true

echo "✅ Ports cleared"
echo ""

# Start development servers
echo "🚀 Starting servers..."
npm run dev

echo ""
echo "✅ Servers should be running at:"
echo "   - API: http://localhost:3000"
echo "   - Frontend: http://localhost:3001"
echo ""
echo "📍 API Data Demo: http://localhost:3001/api-data"
echo "📍 Dashboard: http://localhost:3001/dashboard"

