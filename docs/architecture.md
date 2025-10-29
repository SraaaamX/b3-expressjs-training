# Architecture

The API is structured according to the MVC (Model-View-Controller) pattern with additional layers for better separation of concerns:

- **Models**: Define data structure and interactions with the database
- **DTOs (Data Transfer Objects)**: Classes that define the structure of data exchanged between layers
- **Mappers**: Components responsible for transforming data between models and DTOs
- **Services**: Contain core business logic and orchestrate operations
- **Controllers**: Handle HTTP requests/responses and delegate to services
- **Routes**: Define API endpoints and direct to appropriate controllers
- **Middlewares**: Provide cross-cutting functionalities like authentication and role verification

## DTOs and Mappers

The application uses a clear separation between DTOs and mappers:

- **DTOs** are classes that define the structure of data objects used for data transfer between layers. They are located in the `dtos/` directory.
- **Mappers** contain the logic for transforming data between domain models and DTOs. They are responsible for converting database objects to DTOs and vice versa. Mappers are located in the `mappers/` directory.