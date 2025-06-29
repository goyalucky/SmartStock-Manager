import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { addUser,getUsers,deleteUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/add', authMiddleware, addUser);
router.get('/', authMiddleware, getUsers);   
router.delete('/:id', authMiddleware, deleteUser);

export default router;