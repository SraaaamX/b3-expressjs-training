# Installation Guide

This guide provides two installation methods: Docker (recommended) and manual installation.

## Option 1: Docker Installation (Recommended)

Docker provides the easiest and most consistent way to run the application with all dependencies.

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/) installed
- [Docker Compose](https://docs.docker.com/compose/install/) installed

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd b3-expressjs-training
   ```

2. **Start the application**
   ```bash
   docker-compose up -d
   ```
   
   This command will:
   - Build the Node.js application image
   - Pull MongoDB 7 image
   - Create and start both containers
   - Set up a persistent volume for MongoDB data
   - Configure networking between containers

3. **Verify the installation**
   ```bash
   docker-compose ps
   ```
   
   You should see both `expressjs-app` and `mongodb` containers running.

4. **View application logs**
   ```bash
   docker-compose logs -f app
   ```

### Accessing the Application

- **API Base URL**: http://localhost:3000
- **Swagger Documentation**: http://localhost:3000/api-docs
- **MongoDB**: `mongodb://localhost:27017` (for MongoDB Compass or external tools)
- **Database Name**: `b3-expressjs-training`

### Docker Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Restart services
docker-compose restart

# Rebuild after code changes
docker-compose up -d --build

# Stop and remove all data (including database)
docker-compose down -v
```

### Connecting to MongoDB with Compass

1. Open MongoDB Compass
2. Use connection string: `mongodb://localhost:27017`
3. Click "Connect"
4. Navigate to the `b3-expressjs-training` database

---

## Option 2: Manual Installation

If you prefer to run the application without Docker, follow these steps.

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) installed and running locally
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd b3-expressjs-training
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and configure the following variables:
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/b3-expressjs-training
   JWT_SECRET=your-secret-key-here
   ```

4. **Create upload directories**
   ```bash
   mkdir -p public/uploads/avatars
   mkdir -p public/uploads/properties
   ```

5. **Start MongoDB**
   
   Make sure MongoDB is running on your system:
   ```bash
   # On Linux/Mac with systemd
   sudo systemctl start mongod
   
   # Or run MongoDB directly
   mongod
   ```

6. **Start the application**
   
   For development (with auto-reload):
   ```bash
   npm run dev
   ```
   
   For production:
   ```bash
   npm start
   ```

### Accessing the Application

- **API Base URL**: http://localhost:3000
- **Swagger Documentation**: http://localhost:3000/api-docs

---

## Environment Variables

The application uses the following environment variables:

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port | 3000 | No |
| `MONGO_URI` | MongoDB connection string | - | Yes |
| `JWT_SECRET` | Secret key for JWT tokens | - | Yes |

### Docker Environment

When using Docker, the `MONGO_URI` is automatically set to `mongodb://mongo:27017/b3-expressjs-training` in the docker-compose.yml file.

### Manual Environment

For manual installation, create a `.env` file based on `.env.example` and configure your local MongoDB connection.

---

## Troubleshooting

### Docker Issues

**Containers not starting:**
```bash
docker-compose logs
```

**Port already in use:**
- Change the port mapping in `docker-compose.yml`
- Or stop the service using port 3000 or 27017

**Database not persisting:**
- Check that the `mongo-data` volume exists: `docker volume ls`
- Don't use `docker-compose down -v` unless you want to delete data

### Manual Installation Issues

**MongoDB connection error:**
- Verify MongoDB is running: `sudo systemctl status mongod`
- Check the `MONGO_URI` in your `.env` file
- Ensure MongoDB is accessible on the specified port

**Port already in use:**
- Change the `PORT` in your `.env` file
- Or stop the service using port 3000

**Missing dependencies:**
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## Next Steps

After installation, you can:
1. Access the Swagger documentation at http://localhost:3000/api-docs
2. Import the Postman collection from `docs/postman-json/`
3. Read the [API Documentation](api-documentation.md)
4. Learn about [Authentication](authentication.md)