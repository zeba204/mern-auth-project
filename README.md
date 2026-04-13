# MERN Auth + Task Manager

## 📌 Project Overview

This is a full-stack MERN (MySQL + Express + React + Node.js) application that includes:

* User Authentication (Register/Login)
* JWT-based Authorization
* Forgot Password & Reset Password
* Task Management (CRUD operations)
* Dashboard with statistics

---

## 🚀 Features

### 🔐 Authentication

* Register new user
* Login with JWT
* Protected routes
* Forgot password (token-based)
* Reset password

### 📋 Task Management

* Create tasks
* View tasks
* Update task status
* Delete tasks

### 📊 Dashboard

* Total tasks
* Active tasks
* Pending tasks
* Completed tasks

---

## 🛠️ Tech Stack

### Frontend:

* React.js
* Tailwind CSS
* Axios

### Backend:

* Node.js
* Express.js
* MySQL

### Authentication:

* JWT (JSON Web Token)
* bcrypt (password hashing)

---

## 📁 Project Structure

mern-auth-project/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── pages/
│   ├── components/
│   └── App.jsx
│
├── database.sql
├── README.md

---

## ⚙️ Setup Instructions

### 1. Clone Repository

```bash
git clone <your-repo-link>
cd mern-auth-project
```

---

### 2. Backend Setup

```bash
cd backend
npm install
npm start
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

### 4. Database Setup

* Import `database.sql` into MySQL
* Update `.env` file with DB credentials

---

## 🔐 Environment Variables (.env)

Create `.env` in backend folder:

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=mern_auth_db

JWT_SECRET=your_secret_key
JWT_EXPIRE=1d
```

---

## 📸 Screenshots

### 🔹 Authentication

* Login Page
* Register Page

### 🔹 Dashboard

* Task list
* Status updates

### 🔹 Password Reset

* Forgot password (token generation)
* Reset password

### 🔹 Database

* Users table
* Items table

---

## 🧪 API Endpoints

### Auth Routes

* POST /api/auth/register
* POST /api/auth/login
* POST /api/auth/forgot-password
* POST /api/auth/reset-password
* GET /api/auth/me

### Task Routes

* GET /api/items
* POST /api/items
* PUT /api/items/:id
* DELETE /api/items/:id
* GET /api/items/stats

---

## 🎯 Conclusion

This project demonstrates full-stack development with authentication, database integration, and CRUD functionality.

---

## 👩‍💻 Author

Zeba Farhat
