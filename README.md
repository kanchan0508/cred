# Nebula Task Platform

A scalable full-stack web application with Authentication & Dashboard, built for the Frontend Developer Intern assignment.

## Tech Stack
- **Frontend**: React (Vite), Vanilla CSS (Glassmorphism design), Axios, React Router.
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT Auth.

## Features
- **Authentication**: Secure Login/Register with JWT and password hashing.
- **Dashboard**: CRUD operations for Tasks with Search and Filtering.
- **Design**: Premium "Nebula Dark" aesthetic with glassmorphism effects and responsive layout.
- **Security**: Protected routes, HTTP-only practices (conceptually), input validation.

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB installed locally or a MongoDB Atlas URI

### 1. Setup Backend
1. Navigate to `/server`
2. Install dependencies: `npm install`
3. Create `.env` file (if not exists) with:
   ```
   MONGO_URI=mongodb://localhost:27017/intern_task
   JWT_SECRET=your_super_secret_key
   PORT=5000
   ```
4. Start server: `npm run dev` (Runs on port 5000)

### 2. Setup Frontend
1. Navigate to `/client`
2. Install dependencies: `npm install`
3. Start client: `npm run dev` (Usually runs on port 5173)

### 3. Usage
- Open the client URL (e.g., http://localhost:5173).
- Register a new account.
- You will be redirected to the Login page. Login with your credentials.
- Create, Edit, Delete, and Filter tasks on the Dashboard.

## API Endpoints
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login & get token
- `GET /api/tasks` - Get all tasks (supports `?search=` and `?status=`)
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
