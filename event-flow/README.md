# Event Booking System API

A complete backend for an Event Booking System built with Node.js, Express, MongoDB, and JWT Authentication.

## Features

- **User Management**: Registration and Login with JWT authentication.
- **RBAC**: Admin and User roles.
- **Event Management**: Admin can CRUD events. Users can view events with filtering and pagination.
- **Booking System**: Authenticated users can book events with real-time seat reduction and transaction support.
- **Security**: Rate limiting on sensitive endpoints.
- **Export**: Export bookings as CSV (Admin only).
- **Documentation**: Swagger UI available at `/api-docs`.

## Tech Stack

- Node.js & Express.js
- MongoDB & Mongoose
- JWT for authentication
- bcryptjs for password hashing
- express-rate-limit for security
- swagger-ui-express & yamljs for documentation
- json2csv for data export
