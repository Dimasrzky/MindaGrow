#!/bin/bash

# Deployment script
echo "Deploying MindaGrow project..."

# Build backend
echo "Building backend..."
cd backend
npm run build
cd ..

# Build frontend
echo "Building frontend..."
cd frontend
npm run build
cd ..

# Build Docker images
echo "Building Docker images..."
cd infrastructure/docker
docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml up -d
cd ../..

echo "Deployment completed successfully!"