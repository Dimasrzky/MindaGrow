#!/bin/bash

# Setup project
echo "Setting up MindaGrow project..."

# Install root dependencies
npm install

# Setup Frontend
echo "Setting up frontend..."
cd frontend
npm install
cd ..

# Setup Backend
echo "Setting up backend..."
cd backend
npm install
npx prisma generate
cd ..

# Setup environment variables
echo "Setting up environment variables..."
cp .env.example .env

# Start Docker services
echo "Starting Docker services..."
cd infrastructure/docker
docker-compose up -d
cd ../..

echo "Setup completed successfully!"