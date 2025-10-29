# Postman Requests

## Authentication

```
POST /api/auth/register - Register a new user
  - For profile picture upload: Use form-data with 'profilepic' field for the image file
  - Other fields (name, nickname, email, password) should be included in the form-data
  - Supported image formats: JPEG, JPG, PNG, GIF (max 5MB)
POST /api/auth/login - Login with email and password
```

### Registration
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
        "src": "/path/to/your/image.jpg"
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

### Login
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

## Users

### Get all users (admin only)
```json
{
  "url": "http://localhost:3000/api/users",
  "method": "GET",
  "header": {
    "Authorization": "Bearer {{token}}"
  }
}
```

### Get user by ID (admin or concerned user)
```json
{
  "url": "http://localhost:3000/api/users/{{userId}}",
  "method": "GET",
  "header": {
    "Authorization": "Bearer {{token}}"
  }
}
```

### Update a user (admin or concerned user)
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

### Delete a user (admin or concerned user)
```json
{
  "url": "http://localhost:3000/api/users/{{userId}}",
  "method": "DELETE",
  "header": {
    "Authorization": "Bearer {{token}}"
  }
}
```

## Properties

### Get all properties (public)
```json
{
  "url": "http://localhost:3000/api/properties",
  "method": "GET"
}
```

### Search properties (public)
```json
{
  "url": "http://localhost:3000/api/properties/search?property_type=apartment&transaction_type=sale&min_price=100000&max_price=300000&city=Paris",
  "method": "GET"
}
```

### Get property by ID (public)
```json
{
  "url": "http://localhost:3000/api/properties/{{propertyId}}",
  "method": "GET"
}
```

### Create a property (agent/admin)
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

### Update a property (agent/admin)
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

### Delete a property (agent/admin)
```json
{
  "url": "http://localhost:3000/api/properties/{{propertyId}}",
  "method": "DELETE",
  "header": {
    "Authorization": "Bearer {{token}}"
  }
}
```

### Mark a property as featured (agent/admin)
```json
{
  "url": "http://localhost:3000/api/properties/{{propertyId}}/featured",
  "method": "PATCH",
  "header": {
    "Authorization": "Bearer {{token}}"
  }
}
```

### Change property status (agent/admin)
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

## Inquiries

### Create an inquiry (authenticated user)
```json
{
  "url": "http://localhost:3000/api/inquiries",
  "method": "POST",
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

### Get user inquiries (concerned user)
```json
{
  "url": "http://localhost:3000/api/inquiries/user/{{userId}}",
  "method": "GET",
  "header": {
    "Authorization": "Bearer {{token}}"
  }
}
```

### Get all inquiries (agent/admin)
```json
{
  "url": "http://localhost:3000/api/inquiries",
  "method": "GET",
  "header": {
    "Authorization": "Bearer {{token}}"
  }
}
```

### Get inquiry by ID (agent/admin)
```json
{
  "url": "http://localhost:3000/api/inquiries/{{inquiryId}}",
  "method": "GET",
  "header": {
    "Authorization": "Bearer {{token}}"
  }
}
```

### Get inquiries for a property (agent/admin)
```json
{
  "url": "http://localhost:3000/api/inquiries/property/{{propertyId}}",
  "method": "GET",
  "header": {
    "Authorization": "Bearer {{token}}"
  }
}
```

### Update an inquiry (agent/admin)
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

### Delete an inquiry (agent/admin)
```json
{
  "url": "http://localhost:3000/api/inquiries/{{inquiryId}}",
  "method": "DELETE",
  "header": {
    "Authorization": "Bearer {{token}}"
  }
}
```

### Update inquiry status (agent/admin)
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

### Add agent response (agent/admin)
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