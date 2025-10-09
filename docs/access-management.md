# Access Management

The API implements a role-based access control system:

## Available Roles
- **user**: Standard user
- **agent**: Real estate agent
- **admin**: Administrator

## Security Middlewares

### verifyToken Middleware
- Checks for the presence and validity of the JWT token
- Extracts user information and adds it to the `req` object
- Required for all protected routes

### verifyAdmin Middleware
- Checks that the user has the "admin" role
- Used for operations that require administrator privileges

### verifyAgent Middleware
- Checks that the user has the "agent" or "admin" role
- Used for operations related to property management

## Specific Access Rules

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