import express from 'express';

import {isAdmin, protect} from '../middleware/Auth.js';
import {
	createCategory,
	getAllCategories,
	deleteCategory,
} from '../Controllers/CategoryController.js';

const router = express.Router();

router.get('/', getAllCategories);
router.post('/', protect, isAdmin, createCategory);
router.delete('/:id', protect, isAdmin, deleteCategory);

export default router;
