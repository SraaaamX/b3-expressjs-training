# File Upload System

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