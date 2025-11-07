# Frontend Architecture

## Project Structure

```
client/
├── src/                      # Application source code
│   ├── components/          # Reusable React components
│   │   ├── common/          # Common UI components
│   │   ├── layout/          # Layout components (Header, Footer, etc.)
│   │   └── features/        # Feature-specific components
│   ├── pages/              # Page components (routes)
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API service calls
│   ├── contexts/           # React Context providers
│   ├── utils/              # Utility functions
│   ├── assets/             # Static assets (images, fonts, etc.)
│   ├── styles/             # Global styles and CSS modules
│   ├── App.jsx             # Main App component
│   └── main.jsx            # Application entry point
├── public/                 # Public static files
├── docs/                   # Documentation
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
├── Dockerfile             # Docker image
├── .env                   # Environment variables (do not commit)
└── .env.example          # Environment variables example
```

## Architecture Principles

### Separation of Concerns

- **Pages**: Top-level route components
- **Components**: Reusable UI elements
- **Services**: API communication layer
- **Hooks**: Shared stateful logic
- **Contexts**: Global state management
- **Utils**: Pure helper functions

### Data Flow

```
User Action → Component → Hook/Context → Service → API
                                                     ↓
UI Update ← Component ← Hook/Context ← Service ← Response
```

## Available Scripts

```bash
# Development with hot reload
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Docker
docker-compose up -d      # Start containers
docker-compose down       # Stop containers
docker-compose logs client # View logs
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

- `VITE_API_URI`: Backend API URL (default: http://localhost:3000/api/)
- `VITE_ENV`: Environment (development/production)

## Development Guidelines

Once the development server is started, the application is available at:
- http://localhost:5173

## Best Practices

1. **Imports**: Always use consistent relative paths or path aliases
2. **Components**: Keep components small and focused
3. **State Management**: Use Context for global state, local state for component-specific data
4. **API Calls**: Centralize all API calls in service files
5. **Error Handling**: Implement proper error boundaries and user feedback
