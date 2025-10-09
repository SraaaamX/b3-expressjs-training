# Real Estate API with Express.js

RESTful API for a real estate application with user management, properties, and information requests. Endpoint responses are standardized with explicit messages and data in a consistent format.

## Table of Contents

- [Installation](#installation)
- [Architecture](#architecture)
- [Data Models](#data-models)
- [Authentication System](#authentication-system)
- [Access Management](#access-management)
- [API Documentation](#api-documentation)
  - [Authentication](#authentication)
  - [Users](#users)
  - [Properties](#properties)
  - [Inquiries](#inquiries)
- [Postman Requests](#postman-requests)

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and configure environment variables
4. Create the upload directories for images:
   ```
   mkdir -p public/uploads/avatars
   mkdir -p public/uploads/properties
   ```
5. Start the server: `npm start`

## Architecture

The API is structured according to the MVC (Model-View-Controller) pattern:

- **Models**: Define data structure and interactions with the database
- **Controllers**: Contain business logic and handle requests/responses
- **Routes**: Define API endpoints and direct to appropriate controllers
- **Middlewares**: Provide cross-cutting functionalities like authentication and role verification

## Data Models

### User (Users)
- **name**: Full name (required)
- **nickname**: Unique username (required)
- **email**: Unique email (required)
- **profilepic**: Profile picture URL (optional) - Uploaded to `/public/uploads/avatars/`
- **password**: Hashed password (required)
- **role**: User role (user, agent, admin)
- **phone**: Phone number (optional)

### Property (Properties)
- **title**: Listing title (required)
- **image**: Property image URL (optional) - Uploaded to `/public/uploads/properties/`
- **description**: Detailed description (optional)
- **price**: Price (required)
- **property_type**: Property type (house, apartment, villa, studio, office, land)
- **transaction_type**: Transaction type (sale, rent)
- **address**: Address (required)
- **city**: City (required)
- **postal_code**: Postal code (optional)
- **surface_area**: Surface area in m² (optional)
- **rooms**: Number of rooms (optional)
- **bedrooms**: Number of bedrooms (optional)
- **bathrooms**: Number of bathrooms (optional)
- **parking**: Parking availability (optional)
- **garden**: Garden availability (optional)
- **balcony**: Balcony availability (optional)
- **elevator**: Elevator availability (optional)
- **construction_year**: Construction year (optional)
- **availability_date**: Availability date (optional)
- **featured**: Featured property (optional)
- **status**: Status (available, sold, rented, pending)
- **agent_id**: Real estate agent ID (optional)

### Inquiry (Inquiries)
- **user_id**: User ID (required)
- **property_id**: Property ID (required)
- **inquiry_type**: Inquiry type (visit_request, info_request, offer)
- **message**: User message (optional)
- **preferred_date**: Preferred visit date (optional)
- **preferred_time**: Preferred visit time (optional)
- **status**: Inquiry status (pending, confirmed, completed, cancelled)
- **agent_response**: Agent response (optional)

## File Upload System

The API supports file uploads for user profile pictures and property images:

1. **User Profile Pictures**: 
   - Uploaded to `/public/uploads/avatars/`
   - Maximum file size: 5MB
   - Supported formats: JPEG, JPG, PNG, GIF
   - Updated via PATCH request to `/api/users/:id` with form-data

2. **Property Images**:
   - Uploaded to `/public/uploads/properties/`
   - Maximum file size: 10MB
   - Supported formats: JPEG, JPG, PNG, GIF
   - Added during property creation or update via POST/PUT requests with form-data

3. **Error Handling for Uploads**:
   - Images are not stored in the backend if there are validation errors in the request
   - If required fields are missing, the uploaded file is automatically deleted
   - If database operations fail, the uploaded file is automatically deleted
   - This prevents orphaned files in the upload directories
   
4. **Image Replacement**:
   - When updating a user's profile picture, the previous image is automatically deleted
   - When updating a property's image, the previous image is automatically deleted
   - This ensures efficient storage usage and prevents accumulation of unused files

## Authentication System

The API uses JSON Web Tokens (JWT) for authentication:

1. The user registers or logs in
2. The server generates a JWT token containing the user's ID and role
3. The client includes this token in the `Authorization` header of requests
4. Middlewares verify the token validity and associated permissions

## Access Management

The API implements a role-based access control system:

### Available Roles
- **user**: Standard user
- **agent**: Real estate agent
- **admin**: Administrator

### Security Middlewares

#### verifyToken Middleware
- Checks for the presence and validity of the JWT token
- Extracts user information and adds it to the `req` object
- Required for all protected routes

#### verifyAdmin Middleware
- Checks that the user has the "admin" role
- Used for operations that require administrator privileges

#### verifyAgent Middleware
- Checks that the user has the "agent" or "admin" role
- Used for operations related to property management

### Specific Access Rules

1. **Users**:
   - A user can view and modify their own profile
   - A user can delete their own account
   - Only an administrator can view the list of all users
   - Only an administrator can modify a user's role

2. **Properties**:
   - Anyone can view properties (public)
   - Only agents and administrators can create/modify/delete properties

3. **Inquiries**:
   - A user can create inquiries and view their own inquiries
   - Only agents and administrators can view and manage all inquiries

## API Documentation

### Response Format

All API responses follow a standardized format:

#### Responses for GET by ID requests
```json
{
  "message": "Resource retrieved successfully",
  "data": {
    // Requested resource data
  }
}
```

#### Responses for UPDATE requests
```json
{
  "message": "Resource updated successfully",
  "data": {
    // Updated data
  }
}
```

#### Responses for DELETE requests
```json
{
  "message": "Resource deleted successfully"
}
```

### Authentication

#### User Registration
- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "nickname": "johndoe",
    "email": "john@example.com",
    "password": "password123",
    "role": "user"
  }
  ```
- **Response**: Created user with JWT token

#### Login
- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**: JWT Token

### Users

#### Get all users (admin only)
- **URL**: `/api/users`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer {token}`
- **Response**: List of users

#### Get user by ID (admin or concerned user)
- **URL**: `/api/users/{userId}`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer {token}`
- **Response**: User details

#### Update a user (admin or concerned user)
- **URL**: `/api/users/{userId}`
- **Method**: `PATCH`
- **Headers**: `Authorization: Bearer {token}`
- **Request Body**:
  ```json
  {
    "name": "John Updated",
    "phone": "0123456789"
  }
  ```
- **Response**: Updated user
- **Note**: Only an admin can modify a user's role

#### Delete a user (admin or concerned user)
- **URL**: `/api/users/{userId}`
- **Method**: `DELETE`
- **Headers**: `Authorization: Bearer {token}`
- **Response**: Confirmation message
- **Note**: A user can delete their own account, an admin can delete any account

### Properties

#### Get all properties (public)
- **URL**: `/api/properties`
- **Method**: `GET`
- **Response**: List of properties

#### Search properties (public)
- **URL**: `/api/properties/search?property_type=apartment&transaction_type=sale&min_price=100000&max_price=300000&city=Paris`
- **Method**: `GET`
- **Response**: List of properties matching criteria

#### Get property by ID (public)
- **URL**: `/api/properties/{propertyId}`
- **Method**: `GET`
- **Response**: Property details

#### Create a property (agent/admin)
- **URL**: `/api/properties`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer {token}`
- **Request Body**:
  ```json
  {
    "title": "Beautiful apartment in city center",
    "description": "Bright apartment with city view",
    "price": 250000,
    "property_type": "apartment",
    "transaction_type": "sale",
    "address": "123 Paris Street",
    "city": "Paris",
    "postal_code": "75001",
    "surface_area": 75,
    "rooms": 3,
    "bedrooms": 2,
    "bathrooms": 1,
    "parking": true,
    "balcony": true
  }
  ```
- **Response**: Created property

#### Update a property (agent/admin)
- **URL**: `/api/properties/{propertyId}`
- **Method**: `PUT`
- **Headers**: `Authorization: Bearer {token}`
- **Request Body**:
  ```json
  {
    "price": 260000,
    "description": "Bright apartment with city view and close to shops"
  }
  ```
- **Response**: Updated property

#### Delete a property (agent/admin)
- **URL**: `/api/properties/{propertyId}`
- **Method**: `DELETE`
- **Headers**: `Authorization: Bearer {token}`
- **Response**: Confirmation message

#### Mark a property as featured (agent/admin)
- **URL**: `/api/properties/{propertyId}/featured`
- **Method**: `PATCH`
- **Headers**: `Authorization: Bearer {token}`
- **Response**: Updated property

#### Change property status (agent/admin)
- **URL**: `/api/properties/{propertyId}/status`
- **Method**: `PATCH`
- **Headers**: `Authorization: Bearer {token}`
- **Request Body**:
  ```json
  {
    "status": "sold"
  }
  ```
- **Response**: Updated property

### Inquiries

#### Create an inquiry (authenticated user)
- **URL**: `/api/inquiries`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer {token}`
- **Request Body**:
  ```json
  {
    "user_id": "{userId}",
    "property_id": "{propertyId}",
    "inquiry_type": "visit_request",
    "message": "I would like to visit this property as soon as possible",
    "preferred_date": "2023-12-15T10:00:00.000Z"
  }
  ```
- **Response**: Created inquiry

#### Get user inquiries (concerned user)
- **URL**: `/api/inquiries/user/{userId}`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer {token}`
- **Response**: List of user's inquiries

#### Get all inquiries (agent/admin)
- **URL**: `/api/inquiries`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer {token}`
- **Response**: List of all inquiries

#### Get inquiry by ID (agent/admin)
- **URL**: `/api/inquiries/{inquiryId}`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer {token}`
- **Response**: Inquiry details

#### Get inquiries for a property (agent/admin)
- **URL**: `/api/inquiries/property/{propertyId}`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer {token}`
- **Response**: List of inquiries for the property

#### Update an inquiry (agent/admin)
- **URL**: `/api/inquiries/{inquiryId}`
- **Method**: `PUT`
- **Headers**: `Authorization: Bearer {token}`
- **Request Body**:
  ```json
  {
    "preferred_date": "2023-12-16T14:00:00.000Z",
    "preferred_time": "14:00"
  }
  ```
- **Response**: Updated inquiry

#### Delete an inquiry (agent/admin)
- **URL**: `/api/inquiries/{inquiryId}`
- **Method**: `DELETE`
- **Headers**: `Authorization: Bearer {token}`
- **Response**: Confirmation message

#### Update inquiry status (agent/admin)
- **URL**: `/api/inquiries/{inquiryId}/status`
- **Method**: `PATCH`
- **Headers**: `Authorization: Bearer {token}`
- **Request Body**:
  ```json
  {
    "status": "confirmed"
  }
  ```
- **Response**: Updated inquiry

#### Add agent response (agent/admin)
- **URL**: `/api/inquiries/{inquiryId}/response`
- **Method**: `PATCH`
- **Headers**: `Authorization: Bearer {token}`
- **Request Body**:
  ```json
  {
    "agent_response": "Your request has been accepted. I suggest a visit on December 16th at 2pm."
  }
  ```
- **Response**: Updated inquiry

## Postman Requests

### Authentication
```
POST /api/auth/register - Register a new user
  - For profile picture upload: Use form-data with 'profilepic' field for the image file
  - Other fields (name, nickname, email, password) should be included in the form-data
  - Supported image formats: JPEG, JPG, PNG, GIF (max 5MB)
POST /api/auth/login - Login with email and password
```

### Users
```
GET /api/users - Get all users (admin only)
GET /api/users/:id - Get user by ID (admin or self)
PATCH /api/users/:id - Update user (admin or self)
  - For profile picture upload: Use form-data with 'profilepic' field for the image file
  - Other fields to update should be included in the form-data
  - Supported image formats: JPEG, JPG, PNG, GIF (max 5MB)
DELETE /api/users/:id - Delete user (admin or self)
```

### Properties
```
GET /api/properties - Get all properties
GET /api/properties/search - Search properties with filters
GET /api/properties/:id - Get property by ID
POST /api/properties - Create property (agent only)
  - For image upload: Use form-data with 'image' field for the image file
  - All other property fields should be included in the form-data
  - Required fields: title, price, property_type, transaction_type, address, city
  - Supported image formats: JPEG, JPG, PNG, GIF (max 10MB)
PUT /api/properties/:id - Update property (agent only)
  - For image upload: Use form-data with 'image' field for the image file
  - Fields to update should be included in the form-data
  - Supported image formats: JPEG, JPG, PNG, GIF (max 10MB)
DELETE /api/properties/:id - Delete property (agent only)
PATCH /api/properties/:id/featured - Toggle featured status (agent only)
PATCH /api/properties/:id/status - Update property status (agent only)
```

### Inquiries
```
GET /api/inquiries - Get all inquiries (admin only)
GET /api/inquiries/user/:userId - Get inquiries by user ID (admin or self)
GET /api/inquiries/property/:propertyId - Get inquiries by property ID (admin or agent)
GET /api/inquiries/:id - Get inquiry by ID (admin, agent, or inquiry owner)
POST /api/inquiries - Create inquiry (authenticated user)
PATCH /api/inquiries/:id - Update inquiry (admin, agent, or inquiry owner)
DELETE /api/inquiries/:id - Delete inquiry (admin, agent, or inquiry owner)
PATCH /api/inquiries/:id/status - Update inquiry status (admin or agent)
PATCH /api/inquiries/:id/response - Add agent response (admin or agent)
```

### Authentication

#### Registration
```json
{
  "url": "http://localhost:3000/api/auth/register",
  "method": "POST",
  "header": {
    "Content-Type": "multipart/form-data"
  },
  "body": {
    "mode": "formdata",
    "formdata": [
      {
        "key": "name",
        "value": "John Doe",
        "type": "text"
      },
      {
        "key": "nickname",
        "value": "johndoe",
        "type": "text"
      },
      {
        "key": "email",
        "value": "john@example.com",
        "type": "text"
      },
      {
        "key": "password",
        "value": "password123",
        "type": "text"
      },
      {
        "key": "role",
        "value": "user",
        "type": "text"
      },
      {
        "key": "profilepic",
        "type": "file",
        "src": "/chemin/vers/votre/image.jpg"
      }
    ]
  }
}
```

**How to upload a profile picture during registration:**
1. In Postman, select the POST method for `/api/auth/register`
2. Instead of "raw" JSON, choose "form-data" in the Body tab
3. Add all required fields (name, nickname, email, password, role) as text fields
4. Add a field named "profilepic", select the "File" type and choose your image
5. Accepted image formats are JPEG, JPG, PNG, and GIF (maximum size: 5MB)
6. Send the request to create an account with a profile picture

#### Login
```json
{
  "url": "http://localhost:3000/api/auth/login",
  "method": "POST",
  "header": {
    "Content-Type": "application/json"
  },
  "body": {
    "email": "john@example.com",
    "password": "password123"
  }
}
```

### Users

#### Get all users (admin only)
```json
{
  "url": "http://localhost:3000/api/users",
  "method": "GET",
  "header": {
    "Authorization": "Bearer {{token}}"
  }
}
```

#### Get user by ID (admin or concerned user)
```json
{
  "url": "http://localhost:3000/api/users/{{userId}}",
  "method": "GET",
  "header": {
    "Authorization": "Bearer {{token}}"
  }
}
```

#### Update a user (admin or concerned user)
```json
{
  "url": "http://localhost:3000/api/users/{{userId}}",
  "method": "PATCH",
  "header": {
    "Content-Type": "multipart/form-data",
    "Authorization": "Bearer {{token}}"
  },
  "body": {
    "mode": "formdata",
    "formdata": [
      {
        "key": "name",
        "value": "John Updated",
        "type": "text"
      },
      {
        "key": "phone",
        "value": "0123456789",
        "type": "text"
      },
      {
        "key": "profilepic",
        "type": "file",
        "src": "/chemin/vers/votre/image.jpg"
      }
    ]
  }
}
```

**How to update a profile picture:**
1. In Postman, select the PATCH method for `/api/users/{{userId}}`
2. Choose "form-data" in the Body tab
3. Add the fields you want to update as text fields
4. Add a field named "profilepic", select the "File" type and choose your image
5. Accepted image formats are JPEG, JPG, PNG, and GIF (maximum size: 5MB)
6. Don't forget to include the authentication token in the header

#### Delete a user (admin or concerned user)
```json
{
  "url": "http://localhost:3000/api/users/{{userId}}",
  "method": "DELETE",
  "header": {
    "Authorization": "Bearer {{token}}"
  }
}
```

### Properties

#### Get all properties (public)
```json
{
  "url": "http://localhost:3000/api/properties",
  "method": "GET"
}
```

#### Search properties (public)
```json
{
  "url": "http://localhost:3000/api/properties/search?property_type=apartment&transaction_type=sale&min_price=100000&max_price=300000&city=Paris",
  "method": "GET"
}
```

#### Get property by ID (public)
```json
{
  "url": "http://localhost:3000/api/properties/{{propertyId}}",
  "method": "GET"
}
```

#### Create a property (agent/admin)
```json
{
  "url": "http://localhost:3000/api/properties",
  "method": "POST",
  "header": {
    "Content-Type": "multipart/form-data",
    "Authorization": "Bearer {{token}}"
  },
  "body": {
    "mode": "formdata",
    "formdata": [
      {
        "key": "title",
        "value": "Beautiful apartment in city center",
        "type": "text"
      },
      {
        "key": "description",
        "value": "Bright apartment with city view",
        "type": "text"
      },
      {
        "key": "price",
        "value": "250000",
        "type": "text"
      },
      {
        "key": "property_type",
        "value": "apartment",
        "type": "text"
      },
      {
        "key": "transaction_type",
        "value": "sale",
        "type": "text"
      },
      {
        "key": "address",
        "value": "123 Paris Street",
        "type": "text"
      },
      {
        "key": "city",
        "value": "Paris",
        "type": "text"
      },
      {
        "key": "postal_code",
        "value": "75001",
        "type": "text"
      },
      {
        "key": "surface_area",
        "value": "75",
        "type": "text"
      },
      {
        "key": "rooms",
        "value": "3",
        "type": "text"
      },
      {
        "key": "bedrooms",
        "value": "2",
        "type": "text"
      },
      {
        "key": "bathrooms",
        "value": "1",
        "type": "text"
      },
      {
        "key": "parking",
        "value": "true",
        "type": "text"
      },
      {
        "key": "balcony",
        "value": "true",
        "type": "text"
      },
      {
        "key": "image",
        "type": "file",
        "src": "/chemin/vers/votre/image.jpg"
      }
    ]
  }
}
```

**How to add an image when creating a property:**
1. In Postman, select the POST method for `/api/properties`
2. Choose "form-data" in the Body tab
3. Add all required fields as text fields
4. Add a field named "image", select the "File" type and choose your image
5. Accepted image formats are JPEG, JPG, PNG, and GIF (maximum size: 10MB)
6. Don't forget to include the authentication token in the header

#### Update a property (agent/admin)
```json
{
  "url": "http://localhost:3000/api/properties/{{propertyId}}",
  "method": "PUT",
  "header": {
    "Content-Type": "multipart/form-data",
    "Authorization": "Bearer {{token}}"
  },
  "body": {
    "mode": "formdata",
    "formdata": [
      {
        "key": "price",
        "value": "260000",
        "type": "text"
      },
      {
        "key": "description",
        "value": "Bright apartment with city view and close to shops",
        "type": "text"
      },
      {
        "key": "image",
        "type": "file",
        "src": "/chemin/vers/votre/image.jpg"
      }
    ]
  }
}
```

**How to update a property image:**
1. In Postman, select the PUT method for `/api/properties/{{propertyId}}`
2. Choose "form-data" in the Body tab
3. Add the fields you want to update as text fields
4. Add a field named "image", select the "File" type and choose your image
5. Accepted image formats are JPEG, JPG, PNG, and GIF (maximum size: 10MB)
6. Don't forget to include the authentication token in the header

#### Delete a property (agent/admin)
```json
{
  "url": "http://localhost:3000/api/properties/{{propertyId}}",
  "method": "DELETE",
  "header": {
    "Authorization": "Bearer {{token}}"
  }
}
```

#### Mark a property as featured (agent/admin)
```json
{
  "url": "http://localhost:3000/api/properties/{{propertyId}}/featured",
  "method": "PATCH",
  "header": {
    "Authorization": "Bearer {{token}}"
  }
}
```

#### Change property status (agent/admin)
```json
{
  "url": "http://localhost:3000/api/properties/{{propertyId}}/status",
  "method": "PATCH",
  "header": {
    "Content-Type": "application/json",
    "Authorization": "Bearer {{token}}"
  },
  "body": {
    "status": "sold"
  }
}
```

### Inquiries

#### Create an inquiry (authenticated user)
```json
{
  "url": "http://localhost:3000/api/inquiries",
  "method": "POST",
  "header": {
    "Content-Type": "application/json",
    "Authorization": "Bearer {{token}}"
  },
  "body": {
    "property_id": "{{propertyId}}",
    "inquiry_type": "visit_request",
    "message": "I would like to visit this property as soon as possible",
    "preferred_date": "2023-12-15T10:00:00.000Z"
  }
}
```

#### Get user inquiries (concerned user)
```json
{
  "url": "http://localhost:3000/api/inquiries/user/{{userId}}",
  "method": "GET",
  "header": {
    "Authorization": "Bearer {{token}}"
  }
}
```

#### Get all inquiries (agent/admin)
```json
{
  "url": "http://localhost:3000/api/inquiries",
  "method": "GET",
  "header": {
    "Authorization": "Bearer {{token}}"
  }
}
```

#### Get inquiry by ID (agent/admin)
```json
{
  "url": "http://localhost:3000/api/inquiries/{{inquiryId}}",
  "method": "GET",
  "header": {
    "Authorization": "Bearer {{token}}"
  }
}
```

#### Get inquiries for a property (agent/admin)
```json
{
  "url": "http://localhost:3000/api/inquiries/property/{{propertyId}}",
  "method": "GET",
  "header": {
    "Authorization": "Bearer {{token}}"
  }
}
```

#### Update an inquiry (agent/admin)
```json
{
  "url": "http://localhost:3000/api/inquiries/{{inquiryId}}",
  "method": "PUT",
  "header": {
    "Content-Type": "application/json",
    "Authorization": "Bearer {{token}}"
  },
  "body": {
    "preferred_date": "2023-12-16T14:00:00.000Z",
    "preferred_time": "14:00"
  }
}
```

#### Delete an inquiry (agent/admin)
```json
{
  "url": "http://localhost:3000/api/inquiries/{{inquiryId}}",
  "method": "DELETE",
  "header": {
    "Authorization": "Bearer {{token}}"
  }
}
```

#### Update inquiry status (agent/admin)
```json
{
  "url": "http://localhost:3000/api/inquiries/{{inquiryId}}/status",
  "method": "PATCH",
  "header": {
    "Content-Type": "application/json",
    "Authorization": "Bearer {{token}}"
  },
  "body": {
    "status": "confirmed"
  }
}
```

#### Add agent response (agent/admin)
```json
{
  "url": "http://localhost:3000/api/inquiries/{{inquiryId}}/response",
  "method": "PATCH",
  "header": {
    "Content-Type": "application/json",
    "Authorization": "Bearer {{token}}"
  },
  "body": {
    "agent_response": "Your request has been accepted. I suggest a visit on December 16th at 2pm."
  }
}
```
  "header": {
    "Content-Type": "application/json",
    "Authorization": "Bearer {{token}}"
  },
  "body": {
    "user_id": "{{userId}}",
    "property_id": "{{propertyId}}",
    "inquiry_type": "visit_request",
    "message": "I would like to visit this property as soon as possible",
    "preferred_date": "2023-12-15T10:00:00.000Z"
  }
}
```

### Inquiries - Get user inquiries
```json
{
  "url": "http://localhost:3000/api/inquiries/user/{{userId}}",
  "method": "GET",
  "header": {
    "Authorization": "Bearer {{token}}"
  }
}
```

### Inquiries - Get all inquiries (agent/admin)
```json
{
  "url": "http://localhost:3000/api/inquiries",
  "method": "GET",
  "header": {
    "Authorization": "Bearer {{token}}"
  }
}
```

### Inquiries - Get inquiry by ID (agent/admin)
```json
{
  "url": "http://localhost:3000/api/inquiries/{{inquiryId}}",
  "method": "GET",
  "header": {
    "Authorization": "Bearer {{token}}"
  }
}
```

### Inquiries - Get inquiries for a property (agent/admin)
```json
{
  "url": "http://localhost:3000/api/inquiries/property/{{propertyId}}",
  "method": "GET",
  "header": {
    "Authorization": "Bearer {{token}}"
  }
}
```

### Inquiries - Update an inquiry (agent/admin)
```json
{
  "url": "http://localhost:3000/api/inquiries/{{inquiryId}}",
  "method": "PUT",
  "header": {
    "Content-Type": "application/json",
    "Authorization": "Bearer {{token}}"
  },
  "body": {
    "preferred_date": "2023-12-16T14:00:00.000Z",
    "preferred_time": "14:00"
  }
}
```

### Inquiries - Delete an inquiry (agent/admin)
```json
{
  "url": "http://localhost:3000/api/inquiries/{{inquiryId}}",
  "method": "DELETE",
  "header": {
    "Authorization": "Bearer {{token}}"
  }
}
```

### Inquiries - Update inquiry status (agent/admin)
```json
{
  "url": "http://localhost:3000/api/inquiries/{{inquiryId}}/status",
  "method": "PATCH",
  "header": {
    "Content-Type": "application/json",
    "Authorization": "Bearer {{token}}"
  },
  "body": {
    "status": "confirmed"
  }
}
```

### Inquiries - Add agent response (agent/admin)
```json
{
  "url": "http://localhost:3000/api/inquiries/{{inquiryId}}/response",
  "method": "PATCH",
  "header": {
    "Content-Type": "application/json",
    "Authorization": "Bearer {{token}}"
  },
  "body": {
    "agent_response": "Your request has been accepted. I suggest a visit on December 16th at 2:00 PM."
  }
}
```