
# 🧾 Expense Aware — Backend (Node.js + MySQL + JWT)

This is the backend API for the **Expense Aware** app — a simple and secure expense tracking system built using **Node.js**, **Express**, and **MySQL**, with **JWT-based authentication**.

---

## ⚙️ Tech Stack

- **Node.js + Express**
- **MySQL** (with mysql2)
- **JWT Authentication**
- **CORS + dotenv**
- **RESTful API architecture**
- **ES6 Module Syntax**

---

## 📁 Folder Structure

expense-aware-backend/
├── config/ # DB connection and environment config
├── controllers/ # All route controllers
├── middlewares/ # JWT auth, error handlers, etc.
├── models/ # DB query logic (optional layer)
├── routes/ # Route definitions
├── validators/ # Request validations (optional)
├── .env
├── server.js
└── package.json



---

## 🛠️ Getting Started (Backend)

### 1. Clone the repo

git clone https://github.com/your-username/expense-aware-backend.git
cd expense-aware-backend
2. Install dependencies
bash
Copy
Edit
npm install
3. Create .env file in the root
env
Copy
Edit
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=expense_db
JWT_SECRET=your_jwt_secret_key
4. Setup MySQL database
Create a database in MySQL:

sql
Copy
Edit
CREATE DATABASE expense_db;
Import schema if you have SQL files or use migration queries.

5. Run the server
bash
Copy
Edit
npm run dev
The server will run on:
🔗 http://localhost:5000

✅ API Features
 User Auth (Signup / Login with JWT)

 Category CRUD

 Expense Records CRUD

 Budget Records CRUD

 Department & Department Heads CRUD

 Monthly summary for dashboard charts

 Secure routes with token-based auth

🔐 Sample Routes
bash
Copy
Edit
POST   /api/auth/signup
POST   /api/auth/login
GET    /api/categories
POST   /api/expenses
PUT    /api/budgets/:id
GET    /api/dashboard/monthly-summary
🧩 To Do / Improvements
 Input validation using express-validator or zod

 Password reset route

 Rate limiting, logging, and error tracking

 Role-based authorization (admin/user)

 Dockerize the backend for production

 Add API documentation (Postman / Swagger)
