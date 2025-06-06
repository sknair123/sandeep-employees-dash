import { Router } from 'express';
import { getAllEmployees, createEmployee, updateEmployee, deleteEmployee } from '../controllers/employeeController';
import { auth } from '../middleware/auth';

const router = Router();

router.use(auth); // Protect all employee routes

router.get('/', getAllEmployees);
router.post('/', createEmployee);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);

export default router;
