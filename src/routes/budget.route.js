import express from 'express';
import {
  getBudgets,
  createBudget,
  updateBudget,
  deleteBudget,
} from '../controllers/budget.controller.js';

const router = express.Router();

router.get('/get-all', getBudgets); // ?month=2025-06
router.post('/create', createBudget);
router.put('/update/:id', updateBudget);
router.delete('/delete/:id', deleteBudget);

export default router;
