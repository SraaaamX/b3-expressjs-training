# b3-reactjs-expressjs-training

A full-stack real estate application built with React, Express.js, and MongoDB.

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose installed
- Node.js 18+ (for local development)

### Running with Docker
```bash
docker-compose up --build
```

**Services:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- MongoDB: localhost:27017

## 📁 Project Structure

```
├── client/          # React frontend (Vite)
├── server/          # Express.js backend
│   ├── docs/        # API documentation & Postman collections
│   └── Dockerfile
└── docker-compose.yml
```

## 🔧 Technology Stack

**Frontend:**
- React 19
- Vite
- ESLint

**Backend:**
- Express.js 5
- MongoDB with Mongoose
- JWT Authentication
- Multer (file uploads)
- Swagger (API docs)

## 📚 API Documentation

Import the Postman collection from:
```
server/docs/postman-json/Real-Estate-API-Complete.postman_collection.json
```

**Main Endpoints:**
- `/api/auth` - Authentication
- `/api/users` - User management
- `/api/properties` - Property listings
- `/api/inquiries` - Property inquiries

## 🔐 Environment Variables

**Backend (.env):**
```
PORT=3000
MONGO_URI=mongodb://mongo:27017/realestate
JWT_SECRET_KEY=your-secret-key
JWT_EXPIRES_IN=24h
```

**Frontend (.env):**
```
VITE_API_URI=http://api:3000/api/
VITE_ENV=development
```

## 🛠️ Development

**Run locally without Docker:**

```bash
# Backend
cd server
npm install
npm run dev

# Frontend
cd client
npm install
npm run dev
```