# Real Estate API Documentation

## About

The Real Estate API is a comprehensive backend solution built with Express.js for managing real estate properties, user accounts, and property inquiries. This API provides a robust foundation for developing real estate applications with the following features:

- User authentication with JWT and role-based access control
- Complete property listing management with detailed property information
- Inquiry system for property visits and information requests
- File upload system for user avatars and property images
- Standardized API responses for consistent client integration
- Interactive API documentation with Swagger UI

This project follows the MVC (Model-View-Controller) architecture pattern and implements RESTful API principles to ensure scalability and maintainability.

## Project Structure

```
b3-expressjs-training/
├── config/                # Configuration files
│   ├── database/          # Database configuration
│   ├── routes/            # Routes configuration
│   ├── server/            # Server configuration
│   └── swagger/           # Swagger API documentation configuration
├── controllers/           # Business logic for handling requests
│   ├── inquiriesControllers.js
│   ├── propertiesControllers.js
│   └── usersControllers.js
├── docs/                  # Documentation files
│   ├── access-management.md
│   ├── api-documentation.md
│   ├── architecture.md
│   ├── authentication.md
│   ├── data-models.md
│   ├── file-upload.md
│   ├── installation.md
│   └── postman-json/      # Postman collection files
├── dtos/                  # Data Transfer Objects
│   ├── inquiriesDtos.js
│   ├── propertiesDtos.js
│   └── usersDtos.js
├── mappers/               # Object mappers
│   ├── inquiriesMappers.js
│   ├── propertiesMappers.js
│   └── usersMappers.js
├── middlewares/           # Request processing middleware
│   ├── uploadMiddleware.js
│   ├── verifyAdmin.js
│   ├── verifyAgent.js
│   └── verifyToken.js
├── models/                # Data models and database interactions
│   ├── inquiriesModel.js
│   ├── propertiesModel.js
│   └── usersModel.js
├── routes/                # API route definitions
│   ├── authRoutes.js
│   ├── inquiriesRoutes.js
│   ├── propertiesRoutes.js
│   └── usersRoutes.js
├── services/              # Business logic services
│   ├── inquiriesServices.js
│   ├── propertiesServices.js
│   └── usersServices.js
├── .dockerignore          # Docker ignore file
├── .env.example           # Environment variables template
├── docker-compose.yml     # Docker Compose configuration
├── Dockerfile             # Docker image definition
├── index.js               # Application entry point
├── package.json           # Project dependencies and scripts
└── README.md              # Project overview
```

## Quick Start with Docker

The easiest way to run this project is using Docker. This will automatically set up the application and MongoDB database.

### Prerequisites
- Docker and Docker Compose installed on your system

### Running with Docker

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd b3-expressjs-training
   ```

2. **Start the application**
   ```bash
   docker-compose up -d
   ```

3. **Access the API**
   - API: http://localhost:3000
   - Swagger Documentation: http://localhost:3000/api-docs

4. **View logs**
   ```bash
   docker-compose logs -f
   ```

5. **Stop the application**
   ```bash
   docker-compose down
   ```

### Docker Services

The Docker setup includes:
- **app**: Express.js application (Node.js 20)
- **mongo**: MongoDB 7 database with persistent storage

### MongoDB Connection

- **From host machine (MongoDB Compass)**: `mongodb://localhost:27017`
- **Database name**: `b3-expressjs-training`
- **From application**: Automatically configured via Docker Compose

## Table of Contents

- [Installation](docs/installation.md)
- [Docker Guide](docs/docker.md)
- [Architecture](docs/architecture.md)
- [Data Models](docs/data-models.md)
- [File Upload System](docs/file-upload.md)
- [Authentication System](docs/authentication.md)
- [Access Management](docs/access-management.md)
- [API Documentation](docs/api-documentation.md)
- [Postman Collection](docs/postman-json/)
- [Swagger Documentation](docs/swagger-documentation.md)

## Swagger Documentation

The project includes comprehensive API documentation using Swagger UI. This provides an interactive interface to explore and test all available endpoints.

### Features
- Complete documentation of all API endpoints
- Request and response schemas
- Interactive testing capability
- Authentication support for protected endpoints

### Accessing Swagger UI
Once the server is running, access the Swagger documentation at:
```
http://localhost:3000/api-docs
```

### Authentication in Swagger
For protected endpoints, use the Authorize button in Swagger UI and enter your JWT token in the format:
```
Bearer your-jwt-token
```