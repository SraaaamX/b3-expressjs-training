# Backend Architecture

## Project Structure

```
server/
├── src/                      # Application source code
│   ├── config/              # Configurations
│   │   ├── database/        # Database configuration
│   │   ├── routes/          # Routes configuration
│   │   ├── server/          # Express server configuration
│   │   └── swagger/         # API documentation configuration
│   ├── controllers/         # Controllers (request handling logic)
│   ├── dtos/               # Data Transfer Objects
│   ├── mappers/            # Mappers to transform data
│   ├── middlewares/        # Express middlewares
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes definition
│   ├── schemas/            # Validation schemas
│   └── services/           # Business logic
├── public/                 # Static files (uploads, etc.)
├── docs/                   # Documentation
├── index.js               # Application entry point
├── package.json           # Dependencies and scripts
├── docker-compose.yml     # Docker configuration
├── Dockerfile             # Docker image
├── .env                   # Environment variables (do not commit)
└── .env.example          # Environment variables example
```

## Architecture Principles

### Separation of Concerns

- **Routes**: Define endpoints and apply middlewares
- **Controllers**: Handle HTTP requests and responses
- **Services**: Contain business logic
- **Models**: Define MongoDB data schemas
- **Middlewares**: Handle authentication, validation, uploads, etc.
- **DTOs**: Define the structure of transferred data
- **Mappers**: Transform data between different layers

### Data Flow

```
Request → Route → Middleware → Controller → Service → Model → Database
                                                              ↓
Response ← Route ← Controller ← Service ← Model ← Database
```

## Available Scripts

```bash
# Development with auto-reload
npm run dev

# Production
npm start

# Docker
docker-compose up -d      # Start containers
docker-compose down       # Stop containers
docker-compose logs api   # View logs
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

- `PORT`: Server port (default: 3000)
- `MONGO_URI`: MongoDB connection URI
- `JWT_SECRET`: Secret for JWT tokens

## API Documentation

Once the server is started, Swagger documentation is available at:
- http://localhost:3000/api-docs

## Best Practices

1. **Imports**: Always use consistent relative paths
2. **Validation**: Validate all inputs with Joi
3. **Error Handling**: Use try/catch in controllers
4. **Security**: Always verify tokens and permissions
5. **Clean Code**: Follow naming conventions and comment your code
