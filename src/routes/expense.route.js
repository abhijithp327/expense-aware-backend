import express from 'express';
import { addExpense, getExpenses } from '../controllers/expense.controller.js';

const router = express.Router();

router.post('/create', addExpense);
router.get('/get-all-expenses', getExpenses); // ?month=2025-06

export default router;
