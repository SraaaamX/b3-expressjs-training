# Docker Documentation

This document provides a detailed overview of the Docker setup for the Real Estate API.

## Docker Services

The application uses Docker Compose to orchestrate two services:

### app
The Express.js application service is defined in the `docker-compose.yml` file. It specifies the following:
- **Image**: The `Dockerfile` in the root directory is used to build the Node.js application container image.
- **Ports**: The application listens on port 3000, which is mapped to the host machine's port 3000.
- **Environment**: The environment variables `PORT`, `MONGO_URI`, and `JWT_SECRET` are set in the `docker-compose.yml` file.
- **Volumes**: The application code is mounted as a volume from the host machine to the container, allowing for hot reloading during development.
- **Dependencies**: The `mongo` service is specified as a dependency, ensuring that it is started before the `app` service.

### mongo
The MongoDB database service is also defined in the `docker-compose.yml` file. It specifies the following:
- **Image**: The `mongo:7` image is used to create the MongoDB container.
- **Ports**: MongoDB listens on port 27017, which is mapped to the host machine's port 27017.
- **Volumes**: Persistent storage is provided for the MongoDB data using the `mongo-data` volume.

## Docker Compose

The `docker-compose.yml` file is used to define the multi-container setup. It specifies the services, their configurations, and the volumes.

The `docker-compose.yml` file can be used to start, stop, and manage the services using Docker Compose commands.
