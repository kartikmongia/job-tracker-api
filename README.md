📌 Job Tracker API

A production-ready REST API for tracking job applications, built with Node.js, Express, MongoDB, and JWT authentication.
This project demonstrates real-world backend practices such as authentication, authorization, filtering, pagination, and secure data handling.

🚀 Features Implemented
🔐 Authentication & Authorization

User registration and login

Password hashing using bcrypt

JWT-based authentication

Role-based access control (RBAC)

user

admin

👤 User Management

Secure password storage

Role support (user, admin)

Account activation status

Last login tracking

💼 Job Management

Create job applications

View jobs (user-specific or admin-wide)

Update job details

Soft delete (archive jobs)

Ownership-based authorization

🔍 Advanced Querying

Search jobs by company or position

Filter by status and priority

Sort by latest or oldest

Pagination support

📊 Job Status Tracking

Job status lifecycle:

applied

interview

offer

rejected

Status history tracking

🛡 Security Best Practices

JWT token verification

Protected routes

Centralized error handling

Secure password hashing

Soft deletes instead of hard deletes

🧱 Tech Stack

Node.js

Express.js

MongoDB & Mongoose

JWT (jsonwebtoken)

bcryptjs

express-async-handler

Swagger (API documentation)

📂 Project Structure
job-tracker-api/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   └── jobController.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── errorMiddleware.js
│
├── models/
│   ├── User.js
│   └── Job.js
│
├── routes/
│   ├── authRoutes.js
│   └── jobRoutes.js
│
├── swagger/
│   └── swagger.js
│
├── server.js
├── .env
└── package.json

🔑 API Endpoints
🔐 Auth Routes
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login user
💼 Job Routes (Protected)
Method	Endpoint	Description
POST	/api/jobs	Create a job
GET	/api/jobs	Get jobs (filters + pagination)
PUT	/api/jobs/:id	Update job
DELETE	/api/jobs/:id	Archive job
📦 Sample API Requests
Register User
{
  "name": "Ajay",
  "email": "ajay@gmail.com",
  "password": "password123"
}

Login User
{
  "email": "ajay@gmail.com",
  "password": "password123"
}

Create Job
{
  "company": "Google",
  "position": "Backend Developer",
  "status": "applied",
  "priority": "high",
  "location": "Bangalore",
  "followUpDate": "2026-02-01",
  "notes": "Applied via referral"
}

Get Jobs (with filters)
GET /api/jobs?status=applied&priority=high&search=google&page=1&limit=5

🔐 Authentication Usage

All protected routes require a JWT token in headers:

Authorization: Bearer <JWT_TOKEN>

🧪 API Testing

Tested using Postman

Supports complete CRUD lifecycle

Pagination & filtering tested via query params

📘 API Documentation

Swagger UI available at:

/api-docs

🛠 Setup Instructions
1️⃣ Clone Repository
git clone https://github.com/your-username/job-tracker-api.git
cd job-tracker-api

2️⃣ Install Dependencies
npm install

3️⃣ Environment Variables

Create .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

4️⃣ Run Server
npm run dev

🎯 Learning Outcomes

This project demonstrates:

Secure authentication & authorization

REST API design

MongoDB data modeling

Middleware patterns

Pagination & filtering

Role-based access control

Real-world backend architecture

🚧 Upcoming Features

📊 Analytics dashboard APIs

📧 Email reminders for follow-ups

🧪 Automated tests (Jest + Supertest)

🐳 Docker support

👨‍💻 Author

Kartik
Backend Developer (Node.js | MongoDB | Express)
