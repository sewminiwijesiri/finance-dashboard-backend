# Finance Data Processing & Access Control Backend

## 📌 Overview

This project is a high-performance, secure backend system for a Finance Dashboard. It manages financial records, role-based user access, and provides aggregated analytics. The system demonstrates advanced backend engineering principles including **Data Isolation**, **Soft Deletion**, **Rate Limiting**, and **Schema-level Validation**.

---

## 🚀 Tech Stack

- **Node.js**: Asynchronous event-driven JavaScript runtime.
- **Express.js**: Minimal and flexible web application framework.
- **MongoDB (Mongoose)**: Document-oriented database for flexible and validated data storage.
- **JWT (JSON Web Tokens)**: Secure and stateless user authentication.
- **bcryptjs**: Industry-standard password hashing (salt rounds: 10).
- **Express Rate Limit**: Protection against brute-force and DoS attacks.

---

## 📂 Project Structure

```text
src/
 ├── config/        # Connection logic and environment setup
 ├── controllers/   # High-level business logic and transaction processing
 ├── middlewares/   # Identity verification and RBAC enforcement
 ├── models/        # Strict Mongoose Schemas (User, Record)
 ├── routes/        # Declarative API endpoints
 └── app.js         # Central application bootstrap and middleware stacking
```

---

## ⚙️ Initial Configuration

### 1. Repository Setup

```bash
git clone <your-repo-link>
cd finance-dashboard-backend
```

### 2. Dependency Installation

```bash
npm install
```

### 3. Environment Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_32_char_secret_key
JWT_EXPIRE=24h
```

### 4. Direct Execution

```bash
# Development (Auto-reload enabled)
npm run dev

# Production
npm start
```

---

## 🔐 Advanced Security & Access Control

### Role-Based Access Control (RBAC)

The system enforces strict access boundaries:

| Permission | Viewer | Analyst | Admin |
| :--- | :---: | :---: | :---: |
| **View Own Dashboard** | ✅ | ✅ | ✅ |
| **Search/Filter Records** | ✅ | ✅ | ✅ |
| **Advanced Analytics** | ❌ | ✅ | ✅ |
| **Create Transactions** | ❌ | ❌ | ✅ |
| **Edit/Delete Transactions** | ❌ | ❌ | ✅ |
| **Global User Management** | ❌ | ❌ | ✅ |

Admins can create financial records on behalf of users. Records are stored under the target user’s ID, and each non-admin user can only view records assigned to them

### Security Implementations

- **Data Isolation**: All summary analytics and record listings are scoped strictly to the authenticated user (`createdBy: userId`).
- **Soft Delete**: Deleting a record updates an `isDeleted` flag, ensuring data auditability and preventing accidental data loss.
- **Schema Validation**: Both `User` and `Record` models use `required: true` and type-casting at the database driver level.
- **Rate Limiting**: Globally enforced (100 requests / 15 min) to maintain system stability and prevent abuse.
- **HTTP Status Standards**:
    - `400`: Client validation errors (missing fields, invalid format).
    - `401`: Unauthenticated (Missing/Invalid token).
    - `403`: Unauthorized role or account status (Inactive).
    - `404`: Resource not found.
    - `500`: Unexpected server-side failures.

---

## 📊 Analytics API (`/api/records/summary`)

The summary logic provides a detailed financial snapshot for Analysts and Admins:

- **Aggregated Totals**: dynamic calculation of total income, expenses, and net balance.
- **Category-wise Breakdown**: Grouped spending/income totals per category.
- **Monthly Trends**: Chronological data mapping for trend visualization.
- **Recent Activity**: Guaranteed latest 5 transactions (sorted by date descending).

---

## 🔍 Features & API Documentation

### 🔑 Authentication (`/api/auth`)
- `POST /register`: Create account.
- `POST /login`: Generate JWT token (tokens must be sent as `Bearer <token>`).

### 👤 Management — Admin Only (`/api/users`)
- `GET /`: List all users.
- `PUT /:id`: Change user role or set status to `active`/`inactive`.
- `DELETE /:id`: Hard delete user account.

### 💰 Transactions (`/api/records`)
- `GET /`: Search and paginate transactions. Supports `keyword`, `type`, `category`, `startDate`, and `endDate`.
- `POST /`: Create transaction (Admin only).
- `PUT /:id`: Update transaction details (Admin only, user scope checked).
- `DELETE /:id`: Soft delete transaction (Admin only, user scope checked).

---

## 🛠️ Design Assumptions & Tradeoffs

1. **User Scope**: It is assumed that this is a personal workspace dashboard where users manage their own financial data. Therefore, data is strictly isolated by `createdBy` IDs.
2. **Soft Delete**: Used for transactions to preserve history, while User deletion remains a hard delete for privacy/compliance reasons.
3. **No Frontend**: The system is built as a headless RESTful API to be consumed by any modern frontend framework.
4. **Simplification**: Used `express-rate-limit` for simple IP-based limiting instead of Redis-backed distributed limiting for deployment simplicity.

---

## ✍️ Author

**Sewmini Wijesiri**
