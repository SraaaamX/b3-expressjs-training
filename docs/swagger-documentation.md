# Swagger Documentation

## Overview

The Real Estate API includes comprehensive API documentation using Swagger UI. This provides an interactive interface to explore and test all available endpoints in the application.

## Accessing Swagger UI

Once the server is running, access the Swagger documentation at:
```
http://localhost:3000/api-docs
```

## Features

- **Interactive Documentation**: Browse and understand all API endpoints with detailed descriptions
- **Request/Response Schemas**: View the expected request format and response structure for each endpoint
- **Testing Interface**: Test API endpoints directly from the browser without additional tools
- **Authentication Support**: Authenticate and test protected endpoints with JWT tokens

## Authentication in Swagger

For protected endpoints that require authentication:

1. Click the "Authorize" button at the top of the Swagger UI
2. Enter your JWT token in the format: `Bearer your-jwt-token`
3. Click "Authorize" to apply the token to all subsequent requests

## Available Endpoints

The Swagger documentation covers all API endpoints, organized by resource type:

### Authentication
- POST `/auth/register` - Register a new user
- POST `/auth/login` - Authenticate and receive a JWT token

### Users
- GET `/api/users` - Get all users (Admin only)
- GET `/api/users/{id}` - Get user by ID
- PATCH `/api/users/{id}` - Update user
- DELETE `/api/users/{id}` - Delete user

### Properties
- GET `/api/properties` - Get all properties
- GET `/api/properties/{id}` - Get property by ID
- POST `/api/properties` - Create property (Agent/Admin)
- PUT `/api/properties/{id}` - Update property (Agent/Admin)
- DELETE `/api/properties/{id}` - Delete property (Agent/Admin)
- PATCH `/api/properties/{id}/featured` - Toggle featured status (Agent/Admin)
- PATCH `/api/properties/{id}/status` - Update property status (Agent/Admin)

### Inquiries
- GET `/api/inquiries` - Get all inquiries (Agent/Admin)
- GET `/api/inquiries/user` - Get user inquiries
- GET `/api/inquiries/{id}` - Get inquiry by ID
- POST `/api/inquiries` - Create inquiry
- PUT `/api/inquiries/{id}` - Update inquiry
- DELETE `/api/inquiries/{id}` - Delete inquiry
- PATCH `/api/inquiries/{id}/status` - Update inquiry status
- POST `/api/inquiries/{id}/response` - Add agent response to inquiry

## Implementation Details

The Swagger documentation is implemented using:
- `swagger-jsdoc` - For generating Swagger specifications from JSDoc comments
- `swagger-ui-express` - For serving the Swagger UI

The configuration is located in `/config/swagger/swagger.config.js` and includes:
- API information and description
- Server details
- Security schemes (JWT Bearer authentication)
- Tag definitions for organizing endpoints

## Extending the Documentation

When adding new endpoints to the API, document them using JSDoc comments above the route definitions:

```javascript
/**
 * @swagger
 * /api/resource:
 *   get:
 *     summary: Brief description
 *     description: Detailed description
 *     tags: [ResourceTag]
 *     responses:
 *       200:
 *         description: Success response
 */
router.get('/resource', controller.getResource);
```