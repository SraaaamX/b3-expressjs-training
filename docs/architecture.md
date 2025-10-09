# Architecture

The API is structured according to the MVC (Model-View-Controller) pattern:

- **Models**: Define data structure and interactions with the database
- **Controllers**: Contain business logic and handle requests/responses
- **Routes**: Define API endpoints and direct to appropriate controllers
- **Middlewares**: Provide cross-cutting functionalities like authentication and role verification