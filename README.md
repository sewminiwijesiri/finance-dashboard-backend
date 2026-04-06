# Finance Data Processing & Access Control Backend

## 📌 Overview

This project is a backend system for a finance dashboard that manages financial records, user roles, and access control.

The system is designed to demonstrate backend development skills including API design, data modeling, business logic implementation, and role-based access control.

---

## 🚀 Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* JSON Web Tokens (JWT)
* bcryptjs

---

## 📂 Project Structure

```
src/
 ├── config/        # Database connection
 ├── controllers/   # Business logic
 ├── middleware/    # Auth & Role control
 ├── models/        # Mongoose schemas
 ├── routes/        # API routes
 └── app.js         # Entry point
```

---

## ⚙️ Setup Instructions

### 1. Clone Repository

```
git clone <your-repo-link>
cd finance-backend
```

### 2. Install Dependencies

```
npm install
```

### 3. Create `.env` File

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/finance-db
JWT_SECRET=your_secret_key
```

### 4. Run Server

```
npm run dev
```

---

## 🔐 Authentication

* JWT-based authentication is used
* Token must be sent in headers:

```
Authorization: <token>
```

---

## 👥 User Roles

| Role    | Permissions                |
| ------- | -------------------------- |
| Viewer  | View records               |
| Analyst | View + Summary             |
| Admin   | Full access (CRUD + Users) |

---

## 📊 API Endpoints

### 🔑 Auth

* POST `/api/auth/register` → Register user
* POST `/api/auth/login` → Login & get token

---

### 👤 Users (Admin Only)

* Create user
* Manage roles & status

---

### 💰 Records

* POST `/api/records` → Create record (Admin)
* GET `/api/records` → Get records (All roles)
* PUT `/api/records/:id` → Update record (Admin)
* DELETE `/api/records/:id` → Delete record (Admin)

---

### 📈 Dashboard Summary

* GET `/api/records/summary`

Returns:

* Total income
* Total expenses
* Net balance

(Accessible by Analyst & Admin)

---

## 🔒 Access Control

Role-based middleware is used to restrict actions:

* Viewer → Read only
* Analyst → Read + analytics
* Admin → Full control

---

## ✅ Features Implemented

* User authentication (JWT)
* Role-based authorization
* Financial record CRUD operations
* Filtering support
* Dashboard summary API
* Input validation & error handling
* MongoDB data persistence

---

## ⚠️ Assumptions

* Authentication is simplified using JWT
* No frontend included
* Basic validation implemented for demonstration
* Single environment (development)

---

## 🌟 Optional Improvements (Future Work)

* Pagination
* Search functionality
* Category-wise analytics
* Monthly trends
* Unit testing
* API documentation (Swagger)

---

## 📌 Author

Sewmini Wijesiri
