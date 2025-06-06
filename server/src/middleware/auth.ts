import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { pool } from '../config/db';

interface JwtPayload {
    id: string;
}

export interface AuthRequest extends Request {
    user?: {
        id: string;
    };
}

export const auth = (async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            console.log('No token provided');
            return res.status(401).json({ message: 'No token provided' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'defaultsecret') as JwtPayload;
            const user = await pool.query('SELECT id FROM users WHERE id = $1', [decoded.id]);

            if (user.rows.length === 0) {
                console.log('User not found in database');
                return res.status(401).json({ message: 'User not found' });
            }

            (req as AuthRequest).user = { id: decoded.id };
            next();
        } catch (jwtError) {
            console.log('JWT verification failed:', jwtError);
            if (jwtError instanceof jwt.TokenExpiredError) {
                return res.status(401).json({ message: 'Token expired' });
            } else if (jwtError instanceof jwt.JsonWebTokenError) {
                return res.status(401).json({ message: 'Invalid token' });
            }
            return res.status(401).json({ message: 'Token validation failed' });
        }
    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}) as (req: Request, res: Response, next: NextFunction) => Promise<void>;
