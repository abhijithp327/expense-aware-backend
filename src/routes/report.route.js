import express from 'express';
import { getMonthlyReport } from '../controllers/report.controller.js';


const router = express.Router();

router.get('/get-monthly-report', getMonthlyReport); // ?month=2025-06

export default router;
