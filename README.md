# Real Estate API Documentation

## About

The Real Estate API is a comprehensive backend solution built with Express.js for managing real estate properties, user accounts, and property inquiries. This API provides a robust foundation for developing real estate applications with the following features:

- User authentication with JWT and role-based access control
- Complete property listing management with detailed property information
- Inquiry system for property visits and information requests
- File upload system for user avatars and property images
- Standardized API responses for consistent client integration

This project follows the MVC (Model-View-Controller) architecture pattern and implements RESTful API principles to ensure scalability and maintainability.

## Project Structure

```
b3-expressjs-training/
├── config/                # Configuration files
│   ├── database/          # Database configuration
│   ├── routes/            # Routes configuration
│   └── server/            # Server configuration
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
├── .env.example           # Environment variables template
├── index.js               # Application entry point
├── package.json           # Project dependencies and scripts
└── README.md              # Project overview
```

## Table of Contents

- [Installation](docs/installation.md)
- [Architecture](docs/architecture.md)
- [Data Models](docs/data-models.md)
- [File Upload System](docs/file-upload.md)
- [Authentication System](docs/authentication.md)
- [Access Management](docs/access-management.md)
- [API Documentation](docs/api-documentation.md)
- [Postman Collection](docs/postman-json/)