import { Request, Response } from 'express';
import { pool } from '../config/db';
import { CreateEmployeeInput, UpdateEmployeeInput } from '../types/employee.types';

export const getAllEmployees = async (_req: Request, res: Response) => {
    try {
        const employees = await pool.query('SELECT * FROM employees ORDER BY id DESC');
        res.json(employees.rows);
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ message: 'Failed to fetch employees' });
    }
};

export const createEmployee = async (req: Request, res: Response) => {
    try {
        const { name, company, city, phone_number }: CreateEmployeeInput = req.body;
        console.log('Received employee data:', { name, company, city, phone_number });
        
        if (!name || !company || !city || !phone_number) {
            return res.status(400).json({ 
                message: 'All fields are required',
                received: { name, company, city, phone_number }
            });
        }

        const newEmployee = await pool.query(
            'INSERT INTO employees (name, company, city, phone_number) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, company, city, phone_number]
        );
        
        console.log('Created employee:', newEmployee.rows[0]);
        res.status(201).json(newEmployee.rows[0]);
    } catch (error) {
        console.error('Error creating employee:', error);
        res.status(500).json({ 
            message: 'Failed to create employee',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

export const updateEmployee = async (req: Request, res: Response) => {
    try {
        const { id, name, company, city, phone_number }: UpdateEmployeeInput = req.body;
        const updatedEmployee = await pool.query(
            'UPDATE employees SET name = $1, company = $2, city = $3, phone_number = $4 WHERE id = $5 RETURNING *',
            [name, company, city, phone_number, id]
        );
        
        if (updatedEmployee.rows.length === 0) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        
        res.json(updatedEmployee.rows[0]);
    } catch (error) {
        console.error('Error updating employee:', error);
        res.status(500).json({ message: 'Failed to update employee' });
    }
};

export const deleteEmployee = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM employees WHERE id = $1 RETURNING *', [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        
        res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        console.error('Error deleting employee:', error);
        res.status(500).json({ message: 'Failed to delete employee' });
    }
};
