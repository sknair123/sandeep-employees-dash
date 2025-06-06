import { Request, Response } from 'express';
import { pool } from '../config/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserInput, LoginInput } from '../types/user.types';

export const register = async (req: Request, res: Response) => {
    try {
        const { username, email, password }: UserInput = req.body;

        // Check if username exists
        const usernameExists = await pool.query(
            'SELECT * FROM users WHERE username = $1',
            [username]
        );

        if (usernameExists.rows.length > 0) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Check if email exists
        const emailExists = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        if (emailExists.rows.length > 0) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const newUser = await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
            [username, email, hashedPassword]
        );

        // Generate JWT
        const token = jwt.sign(
            { id: newUser.rows[0].id },
            process.env.JWT_SECRET || 'defaultsecret',
            { expiresIn: '1d' }
        );

        res.status(201).json({
            id: newUser.rows[0].id,
            username: newUser.rows[0].username,
            email: newUser.rows[0].email,
            token
        });
    } catch (error) {
        console.error('Error in register:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password }: LoginInput = req.body;

        // Check if user exists
        const user = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        if (user.rows.length === 0) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.rows[0].password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user.rows[0].id },
            process.env.JWT_SECRET || 'defaultsecret',
            { expiresIn: '1d' }
        );

        res.json({
            id: user.rows[0].id,
            username: user.rows[0].username,
            email: user.rows[0].email,
            token
        });
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
