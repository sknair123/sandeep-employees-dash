import { Router, Response, Request, NextFunction } from 'express';
import { register, login } from '../controllers/userController';
import { auth, AuthRequest } from '../middleware/auth';
import { pool } from '../config/db';

const router = Router();

// Register route
router.post('/register', (async (req: Request, res: Response) => {
    await register(req, res);
}) as (req: Request, res: Response, next: NextFunction) => Promise<void>);

// Login route
router.post('/login', (async (req: Request, res: Response) => {
    await login(req, res);
}) as (req: Request, res: Response, next: NextFunction) => Promise<void>);

// Protected route with better error handling
router.get('/me', auth, (async (req: Request, res: Response) => {
    try {
        const authReq = req as AuthRequest;
        if (!authReq.user?.id) {
            return res.status(401).json({ message: 'User ID not found in request' });
        }

        const user = await pool.query(
            'SELECT id, username, email FROM users WHERE id = $1',
            [authReq.user.id]
        );
        
        if (user.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.json(user.rows[0]);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ 
            message: 'Internal server error', 
            details: error instanceof Error ? error.message : 'Unknown error' 
        });
    }
}) as (req: Request, res: Response, next: NextFunction) => Promise<void>);

export default router;
