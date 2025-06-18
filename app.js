import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './src/routes/auth.route.js';
import categoryRoutes from './src/routes/category.route.js';
import expenseRoutes from './src/routes/expense.route.js';
import budgetRoutes from './src/routes/budget.route.js';
import reportRoutes from './src/routes/report.route.js';


import { authMiddleware } from './src/middlewares/authMiddleware.js';


dotenv.config();

const app = express();

// Middlewares
app.use(cors({
  origin: 'https://expense-aware-frontend.vercel.app',
  credentials: true, 
}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Expense Tracker API');
});

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/categories', authMiddleware, categoryRoutes);
app.use('/api/v1/budgets', authMiddleware, budgetRoutes);
app.use('/api/v1/expenses', authMiddleware, expenseRoutes);
app.use('/api/v1/reports', authMiddleware, reportRoutes);


const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('✅ MongoDB Connected');
        app.listen(PORT, () => console.log(`🚀 Server running http://localhost:${PORT}`));
    })
    .catch((err) => console.error('MongoDB Connection Error:', err));
