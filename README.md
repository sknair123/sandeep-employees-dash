# Employee Management System

A full-stack web application built with React, Node.js, and PostgreSQL for managing employee records.

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn package manager

## Project Structure

```
├── client/             # Frontend React application
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── config/     # API and axios configuration
│   │   └── ...
│   └── ...
└── server/            # Backend Node.js application
    ├── src/
    │   ├── config/    # Database and initialization
    │   ├── routes/    # API routes
    │   ├── controllers/# Route controllers
    │   └── types/     # TypeScript types
    └── ...
```

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd employee-management-system
```

### 2. Database Setup

1. Install PostgreSQL if not already installed
2. Create a new database:
   ```sql
   CREATE DATABASE dash;
   ```

### 3. Backend Setup

1. Navigate to the server directory:

   ```bash
   cd server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory (you can copy from .env.example):

   ```env
   PORT=3000
   DATABASE_URL=postgres://username:password@localhost:5432/dash
   JWT_SECRET=your-jwt-secret-key-here
   FRONTEND_URL=http://localhost:3001
   NODE_ENV=development
   ```

   Replace `username`, `password` with your PostgreSQL credentials.

4. Start the server:
   ```bash
   npm run dev
   ```
   The server will automatically:
   - Create required database tables
   - Start on port 3000
   - Allow CORS for frontend requests from port 3001

### 4. Frontend Setup

1. Navigate to the client directory:

   ```bash
   cd ../client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the client directory (you can copy from .env.example):

   ```env
   VITE_API_URL=http://localhost:3000/api
   VITE_APP_NAME="Employee Management System"
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3001`

## Features

- User authentication (register/login)
- Employee management (CRUD operations)
- Responsive design
- Form validation
- Secure password handling
- Token-based authentication

## Environment Variables

### Backend (.env)

- `PORT`: Server port (default: 3000)
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `FRONTEND_URL`: Frontend application URL (default: http://localhost:3001)
- `NODE_ENV`: Environment mode (development/production)

### Frontend (.env)

- `VITE_API_URL`: Backend API URL (default: http://localhost:3000/api)
- `VITE_APP_NAME`: Application name for display purposes

Note: Both frontend and backend have `.env.example` files that you can copy and modify for your environment.

## Available Scripts

### Backend

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm start`: Start production server

### Frontend

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build

## Technical Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Axios
- React Router
- HeadlessUI

### Backend

- Node.js
- Express
- TypeScript
- PostgreSQL
- JSON Web Token
- bcrypt

## Security Features

- Password hashing
- JWT authentication
- Input validation
- SQL injection prevention
- CORS configuration
- Secure HTTP headers

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
