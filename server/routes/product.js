import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { getProducts,addProduct,updateProduct } from '../controllers/productController.js';
const router = express.Router();

router.get('/', authMiddleware, getProducts);   
router.post('/add', authMiddleware, addProduct);
router.put('/:id', authMiddleware, updateProduct);
// router.delete('/:id', authMiddleware, deleteSupplier);

export default router;