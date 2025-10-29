# API Documentation

## Data Architecture

The API uses a layered architecture with:
- **Data Models**: Define the database data structure
- **DTOs (Data Transfer Objects)**: Classes that define the structure of exchanged data
- **Mappers**: Components responsible for transformation between models and DTOs

All endpoints return structured DTO objects rather than raw database models.

## Response Format

All API responses follow a standardized format:

### Responses for GET by ID requests
```json
{
  "message": "Resource retrieved successfully",
  "data": {
    // Requested resource data
  }
}
```

### Responses for UPDATE requests
```json
{
  "message": "Resource updated successfully",
  "data": {
    // Updated data
  }
}
```

### Responses for DELETE requests
```json
{
  "message": "Resource deleted successfully"
}
```

## Users Endpoints

### Get All Users (Admin only)
- **URL**: `/api/users`
- **Method**: `GET`
- **Authorization**: Admin

### Get User by ID
- **URL**: `/api/users/:id`
- **Method**: `GET`
- **Authorization**: User (own profile) or Admin

### Update User
- **URL**: `/api/users/:id`
- **Method**: `PATCH`
- **Authorization**: User (own profile) or Admin

### Delete User
- **URL**: `/api/users/:id`
- **Method**: `DELETE`
- **Authorization**: User (own profile) or Admin

## Properties Endpoints

### Get All Properties
- **URL**: `/api/properties`
- **Method**: `GET`
- **Authorization**: None (public)

### Get Property by ID
- **URL**: `/api/properties/:id`
- **Method**: `GET`
- **Authorization**: None (public)

### Create Property
- **URL**: `/api/properties`
- **Method**: `POST`
- **Authorization**: Agent or Admin

### Update Property
- **URL**: `/api/properties/:id`
- **Method**: `PUT`
- **Authorization**: Agent or Admin

### Delete Property
- **URL**: `/api/properties/:id`
- **Method**: `DELETE`
- **Authorization**: Agent or Admin

## Inquiries Endpoints

### Get All Inquiries
- **URL**: `/api/inquiries`
- **Method**: `GET`
- **Authorization**: Agent or Admin

### Get User Inquiries
- **URL**: `/api/inquiries/user`
- **Method**: `GET`
- **Authorization**: User (own inquiries)

### Get Inquiry by ID
- **URL**: `/api/inquiries/:id`
- **Method**: `GET`
- **Authorization**: User (own inquiry), Agent, or Admin

### Create Inquiry
- **URL**: `/api/inquiries`
- **Method**: `POST`
- **Authorization**: User

### Update Inquiry
- **URL**: `/api/inquiries/:id`
- **Method**: `PATCH`
- **Authorization**: Agent or Admin

### Delete Inquiry
- **URL**: `/api/inquiries/:id`
- **Method**: `DELETE`
- **Authorization**: User (own inquiry), Agent, or Admin