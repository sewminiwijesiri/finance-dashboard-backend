# Finance Data Processing & Access Control Backend

## 📌 Overview

This project is a  backend system for a finance dashboard. It handles financial records, user role management, and granular access control. The system is designed with scalability in mind, featuring JWT authentication, RBAC (Role-Based Access Control), and data aggregation for dashboard insights.

---

## 🚀 Tech Stack

* **Node.js**: Runtime environment
* **Express.js**: Web framework
* **MongoDB (Mongoose)**: NoSQL database for flexible data modeling
* **JSON Web Tokens (JWT)**: Secure authentication
* **bcryptjs**: Password hashing

---

## 📂 Project Structure

```
src/
 ├── config/        # Database and environment configuration
 ├── controllers/   # Business logic and request handling
 ├── middlewares/   # Authentication and Role-based authorization
 ├── models/        # Mongoose schemas (User, Record)
 ├── routes/        # API route definitions
 └── app.js         # Express application entry point
```

---

## ⚙️ Setup Instructions

### 1. Clone Repository

```bash
git clone <your-repo-link>
cd finance-dashboard-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRE=24h
```

### 4. Run the Server

```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

---

## 🔐 Authentication & Access Control

### User Roles & Permissions

| Role    | Permissions                                                                 |
| ------- | --------------------------------------------------------------------------- |
| **Viewer**  | Can view records and listing.                                               |
| **Analyst** | Can view records, listing, and access dashboard summaries/insights.          |
| **Admin**   | Full access: Create, Update, Delete records and manage users (roles/status). |

### Security Features

* **JWT-based Auth**: Tokens must be sent in the `Authorization` header as `Bearer <token>`.
* **RBAC Middleware**: Ensures users can only perform actions authorized for their role.
* **Account Status**: Users can be set to `inactive` by admins to revoke access.
* **Input Validation**: Basic validation for email formats, password length, and missing fields.

---

## 📊 API Endpoints

### 🔑 Authentication (`/api/auth`)

* `POST /register`: Create a new user (Default role: viewer).
* `POST /login`: Authenticate and receive a JWT.

### 👤 User Management — Admin Only (`/api/users`)

* `GET /`: List all users.
* `PUT /:id`: Update user details, roles, or status.
* `DELETE /:id`: Remove a user from the system.

### 💰 Financial Records (`/api/records`)

* `POST /`: Create a new transaction (Admin).
* `GET /`: Retrieve records with support for:
    * **Filtering**: `type`, `category`, `startDate`, `endDate`.
    * **Search**: `keyword` (searches category, description, and notes).
    * **Pagination**: `page`, `limit`.
* `PUT /:id`: Update an existing record (Admin).
* `DELETE /:id`: Delete a record (Admin).

### 📈 Dashboard Analytics (`/api/records/summary`)

Provides aggregated data (Analyst and Admin only):

* **Summary**: Total Income, Total Expenses, and Net Balance.
* **Category-wise Analysis**: Breakdown of income/expenses per category.
* **Monthly Trends**: Time-series data for income and expenses.
* **Recent Activity**: The 5 most recent transactions.

---

## ✅ Core Requirements Completed

1.  **User & Role Management**: Full CRUD for users with role and status management.
2.  **Financial Records**: CRUD operations with advanced filtering and search.
3.  **Dashboard Summary**: Aggregated data for business insights.
4.  **Access Control**: Robust middleware-level enforcement of role-based permissions.
5.  **Validation & Error Handling**: Proper status codes (400, 401, 403, 404, 500) and descriptive errors.
6.  **Data Persistence**: Integrated with MongoDB Atlas/Local via Mongoose.

---

## 📌 Author

**Sewmini Wijesiri**
