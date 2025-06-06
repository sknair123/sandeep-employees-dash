import { Router, Request, Response, NextFunction } from 'express';
import { getAllEmployees, createEmployee, updateEmployee, deleteEmployee } from '../controllers/employeeController';
import { auth } from '../middleware/auth';

const router = Router();

router.use(auth); // Protect all employee routes

router.get('/', (async (req: Request, res: Response) => {
    await getAllEmployees(req, res);
}) as (req: Request, res: Response, next: NextFunction) => Promise<void>);

router.post('/', (async (req: Request, res: Response) => {
    await createEmployee(req, res);
}) as (req: Request, res: Response, next: NextFunction) => Promise<void>);

router.put('/:id', (async (req: Request, res: Response) => {
    await updateEmployee(req, res);
}) as (req: Request, res: Response, next: NextFunction) => Promise<void>);

router.delete('/:id', (async (req: Request, res: Response) => {
    await deleteEmployee(req, res);
}) as (req: Request, res: Response, next: NextFunction) => Promise<void>);

export default router;
