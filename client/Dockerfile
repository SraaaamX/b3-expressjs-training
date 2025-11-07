# Use Node.js LTS version
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including dev dependencies for Vite)
RUN npm install

# Copy application files
COPY . .

# Expose the port
EXPOSE 5173

# Start the application
CMD ["npm", "run", "dev"]