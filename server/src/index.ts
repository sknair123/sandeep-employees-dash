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

// Initialize database and start server
const startServer = async () => {
    try {
        // Test DB connection
        await pool.connect();
        console.log('Database connected successfully');

        // Initialize database schema
        await initializeDatabase();

        // Routes
        app.use('/api/users', userRoutes);
        app.use('/api/employees', employeeRoutes);

        app.get('/api/health', (req, res) => {
            res.json({ status: 'ok', environment: process.env.NODE_ENV });
        });

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            console.log(`Frontend URL: ${process.env.FRONTEND_URL}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
