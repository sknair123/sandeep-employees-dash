# Employee Management System

A full-stack web application built with React (Vite) and Node.js for managing employee records. This system provides user authentication, employee management, and a responsive dashboard interface.

## Features

- 👥 User Authentication (Register/Login)
- 👔 Employee Management (CRUD operations)
- 🎨 Modern UI with Tailwind CSS
- 🔒 Secure JWT Authentication
- 🗃️ PostgreSQL Database
- 🛡️ Input Validation & Error Handling
- 📱 Responsive Design
- ⚡ Fast Development with Vite

## Prerequisites

Before you begin, ensure you have the following installed on your Windows system:

- Node.js (v14 or higher) - [Download](https://nodejs.org/)
- PostgreSQL (v12 or higher) - [Download](https://www.postgresql.org/download/windows/)
- Git - [Download](https://git-scm.com/download/win/)
- A code editor (e.g., VS Code) - [Download](https://code.visualstudio.com/)

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

## Port Configuration

- Backend: Runs on port 3000 by default
  - To change: Update the PORT in server/.env
- Frontend: Runs on port 3001 by default
  - To change: Update the port in client/vite.config.ts and update FRONTEND_URL in server/.env

## Environment Variables

### Backend (.env)

```env
PORT=3000
DATABASE_URL=postgres://username:password@localhost:5432/dash
JWT_SECRET=your-jwt-secret-key-here
FRONTEND_URL=http://localhost:3001
NODE_ENV=development
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME="Employee Management System"
```

## Troubleshooting

### CORS Issues

1. Verify FRONTEND_URL in server/.env matches your frontend URL
2. Check if the backend is running and accessible
3. Ensure proper protocol (http/https) is used

### Port Conflicts

1. If port 3000 is in use:
   - Change PORT in server/.env
   - Update VITE_API_URL in client/.env
2. If port 3001 is in use:
   - Update port in client/vite.config.ts
   - Update FRONTEND_URL in server/.env

### Database Connection Issues

1. Verify PostgreSQL is running
2. Check DATABASE_URL in server/.env
3. Ensure database exists and user has proper permissions
4. Try connecting with psql to verify credentials

### JWT Authentication Issues

1. Ensure JWT_SECRET is set in server/.env
2. Clear browser localStorage and try again
3. Check if token is being sent in Authorization header

Note: Both frontend and backend have `.env.example` files that you can copy and modify for your environment.

## Running the Application

### Method 1: Separate Terminals (Recommended for Development)

1. Terminal 1 (Backend):

```bash
cd server
npm run dev
```

2. Terminal 2 (Frontend):

```bash
cd client
npm run dev
```

### Method 2: Concurrent Running (Optional)

You can set up concurrent running using packages like `concurrently`. Add this to the root package.json:

```json
{
  "scripts": {
    "dev": "concurrently \"cd server && npm run dev\" \"cd client && npm run dev\""
  }
}
```

Then run:

```bash
npm run dev
```

## Security Notes

1. Never commit .env files to version control
2. Use strong JWT secrets in production
3. Follow security best practices for storing passwords
4. Enable proper CORS settings in production
5. Use HTTPS in production environment

## Available Scripts

### Backend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server

### Frontend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

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
