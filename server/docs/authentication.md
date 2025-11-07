# Authentication System

The API uses JSON Web Tokens (JWT) for authentication:

1. The user registers or logs in
2. The server generates a JWT token containing the user's ID and role
3. The client includes this token in the `Authorization` header of requests
4. Middlewares verify the token validity and associated permissions

## Authentication Endpoints

### User Registration
- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "nickname": "johndoe",
    "email": "john@example.com",
    "password": "securepassword",
    "phone": "1234567890"
  }
  ```

### User Login
- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```