# Data Models

## Database Models

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

## Data Transfer Objects (DTOs)

The application uses DTO classes to structure data exchanged between different layers.

### User DTOs
- **UserDto**: User representation for API responses
- **CreateUserDto**: Structure for user creation
- **UpdateUserDto**: Structure for user updates

### Property DTOs
- **PropertyDto**: Property representation for API responses
- **CreatePropertyDto**: Structure for property creation
- **UpdatePropertyDto**: Structure for property updates

### Inquiry DTOs
- **InquiryDto**: Inquiry representation for API responses
- **CreateInquiryDto**: Structure for inquiry creation
- **UpdateInquiryDto**: Structure for inquiry updates

## Mappers

Mappers are responsible for transforming data between database models and DTOs.

- **usersMappers**: Conversion between User objects and corresponding DTOs
- **propertiesMappers**: Conversion between Property objects and corresponding DTOs
- **inquiriesMappers**: Conversion between Inquiry objects and corresponding DTOs