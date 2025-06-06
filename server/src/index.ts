import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool } from './config/db';
import initializeDatabase from './config/dbInit';

// Routes
import userRoutes from './routes/userRoutes';
import employeeRoutes from './routes/employeeRoutes';

// Load environment variables
dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:3001',
    credentials: true,
    optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Mount routes under /api
app.use('/api/users', userRoutes);
app.use('/api/employees', employeeRoutes);

// Initialize database and start server
const startServer = async () => {
    try {
        // Test DB connection
        await pool.connect();
        console.log('Database connected successfully');

        // Initialize database schema
        await initializeDatabase();

        const PORT = parseInt(process.env.PORT || '3000', 10);
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server running on http://localhost:${PORT}`);
            console.log(`Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3001'}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
