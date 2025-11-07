# Docker Setup Summary

This document summarizes the Docker configuration added to the Real Estate API project.

## Files Created

### 1. server/Dockerfile
- **Location**: `/server/Dockerfile`
- **Purpose**: Defines the Node.js API container image
- **Base Image**: `node:20-alpine`
- **Exposed Port**: 3000

### 2. client/Dockerfile
- **Location**: `/client/Dockerfile`
- **Purpose**: Defines the React application container image
- **Base Image**: `node:20-alpine`
- **Exposed Port**: 5173

### 3. docker-compose.yml
- **Location**: `/docker-compose.yml`
- **Purpose**: Orchestrates multi-container setup
- **Services**: 
  - `expressjs-api` (Express.js backend)
  - `reactjs-client` (React frontend)
  - `mongodb` (MongoDB database)
- **Volumes**: `mongo-data` for persistent database storage

### 4. .dockerignore
- **Location**: `/server/.dockerignore` and `/client/.dockerignore`
- **Purpose**: Excludes unnecessary files from Docker build
- **Excludes**: node_modules, .env files, logs, git files

## Documentation Updates

### 1. README.md
- Added "Quick Start with Docker" section
- Updated project structure to include Docker files
- Added Docker Guide to table of contents

### 2. docs/installation.md
- Complete rewrite with two installation options:
  - **Option 1**: Docker Installation (Recommended)
  - **Option 2**: Manual Installation
- Added environment variables documentation
- Added troubleshooting section
- Added MongoDB Compass connection instructions

### 3. docs/docker.md (NEW)
- Comprehensive Docker documentation
- Detailed explanation of all Docker files
- Usage commands and workflows
- Networking and volumes explanation
- Troubleshooting guide
- Best practices for development and production
- Security recommendations
- Maintenance and monitoring tips

## Quick Start

```bash
# Clone and start
git clone <repository-url>
cd real-estate-api
docker-compose up -d

# Access
# Frontend: http://localhost:5173
# API: http://localhost:3000
# Swagger: http://localhost:3000/api-docs
# MongoDB: mongodb://localhost:27017
```

## Key Features

### Automatic Setup
- ✅ React frontend container
- ✅ Node.js API container
- ✅ MongoDB database container
- ✅ Persistent data storage
- ✅ Network configuration
- ✅ Environment variables

### Development Features
- ✅ Hot reload with volume mounts
- ✅ Easy log access
- ✅ Simple start/stop commands
- ✅ Isolated environment
- ✅ Frontend-backend communication

### Database Access
- ✅ MongoDB Compass: `mongodb://localhost:27017`
- ✅ Database name: `realestate`
- ✅ Persistent storage across restarts

## Common Commands

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs (all services)
docker-compose logs -f

# View logs (specific service)
docker-compose logs -f api
docker-compose logs -f client
docker-compose logs -f mongo

# Rebuild containers
docker-compose up -d --build

# Clean (removes data)
docker-compose down -v
```

## MongoDB Compass Connection

1. Open MongoDB Compass
2. Connection string: `mongodb://localhost:27017`
3. Click "Connect"
4. Navigate to `realestate` database

**Note**: The database will only appear after creating your first document (user, property, or inquiry).

## Environment Variables

The docker-compose.yml automatically configures:

### API Service
- `PORT=3000`
- `MONGO_URI=mongodb://mongo:27017/realestate`
- `JWT_SECRET_KEY=your-super-secret-jwt-key-yeaaaaah`
- `JWT_EXPIRES_IN=24h`
- `NODE_ENV=development`

### Client Service
- `VITE_API_URI=http://api:3000/api/`
- `VITE_ENV=development`

No manual `.env` file needed for Docker setup!

## Troubleshooting

### Database not showing in Compass
- Make sure you've created at least one document via the API
- Refresh MongoDB Compass
- Verify connection string is `mongodb://localhost:27017`

### Port conflicts
- Change port mapping in docker-compose.yml
- Or stop the service using ports 5173, 3000, or 27017

### Containers not starting
```bash
docker-compose logs