# Student Team Members Management Application

A complete, production-ready MERN stack application to manage student team members.

## Features
- **Frontend**: Built with React (Vite) and React Router for fast, client-side routing.
- **Backend**: Node.js and Express REST API.
- **Database**: MongoDB via Mongoose.
- **File Uploads**: Image uploading handled by Multer.
- **Styling**: Premium, responsive, modern custom CSS with custom properties and micro-animations.

## Tech Stack
- MongoDB, Express.js, React.js, Node.js
- Axios for API requests
- Lucide-react for modern icons

## Prerequisites
- Node.js installed
- MongoDB installed and running locally on `mongodb://127.0.0.1:27017/` (or update `server/.env` with your cluster URL)

## Folder Structure
```
project-root/
│
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Application pages
│   │   ├── App.jsx         # Main routing
│   │   └── index.css       # Global styles
│
├── server/                 # Node/Express Backend
│   ├── config/             # DB connection
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API routes
│   ├── uploads/            # Uploaded images
│   ├── .env                # Environment variables
│   └── server.js           # Entry point
```

## Setup and Installation

### 1. Database Setup
Ensure MongoDB is running locally. The app connects to `mongodb://127.0.0.1:27017/student_teams` by default.

### 2. Run the Backend
1. Open a terminal and navigate to the `server` folder:
   ```bash
   cd server
   ```
2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm run dev
   ```
   *The server will start on http://localhost:5000*

### 3. Run the Frontend
1. Open a **new** terminal and navigate to the `client` folder:
   ```bash
   cd client
   ```
2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The app will open typically on http://localhost:5173*

## API Endpoints

- `GET /api/members` - Retrieve all members
- `GET /api/members/:id` - Retrieve a single member by ID
- `POST /api/members` - Create a new member (expects `multipart/form-data` with an `image` field)
