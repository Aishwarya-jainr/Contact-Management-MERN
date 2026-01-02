# Contact Management Application

A full-stack web application for managing contact information, built with the MERN stack (MongoDB, Express.js, React, Node.js).


## Features

- Create and store contact information
- View all saved contacts with real-time updates
- Delete existing contacts
- Sort contacts by date or name
- Search functionality
- Form validation on both client and server side
- Responsive design for mobile and desktop

## Technology Stack

### Frontend
- React 18 with Vite
- Tailwind CSS for styling
- Lucide React for icons

### Backend
- Node.js with Express.js
- MongoDB with Mongoose ODM
- Express Validator for input validation
- CORS enabled for cross-origin requests

## Prerequisites

Before running this application, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd contact-management-app
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/contact-management
FRONTEND_URL=http://localhost:5173
```

For production, replace `MONGODB_URI` with your MongoDB Atlas connection string.

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:5001/api
```

## Running the Application

### Start Backend Server

```bash
cd backend
npm start
```

The backend will run on `http://localhost:5001`

### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173`

Open your browser and navigate to `http://localhost:5173` to use the application.

## API Documentation

### Base URL
```
http://localhost:5001/api
```

### Endpoints

#### Get All Contacts
```http
GET /contacts?sort=-createdAt
```

Query Parameters:
- `sort` (optional): Sort order. Options: `-createdAt`, `createdAt`, `name`, `-name`

#### Create Contact
```http
POST /contacts
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "message": "Optional message"
}
```

#### Delete Contact
```http
DELETE /contacts/:id
```

## Project Structure

```
contact-management-app/
├── backend/
│   ├── models/
│   │   └── Contact.js
│   ├── routes/
│   │   └── contacts.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ContactForm.jsx
│   │   │   └── ContactList.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## Database Schema

### Contact Model

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| name | String | Yes | Min 2 characters |
| email | String | Yes | Valid email format |
| phone | String | Yes | 10 digits |
| message | String | No | Max 500 characters |
| createdAt | Date | Auto | Timestamp |
| updatedAt | Date | Auto | Timestamp |

## Deployment

### Backend Deployment

Recommended platforms:
- Railway
- Render
- Heroku

Environment variables to set:
- `MONGODB_URI`: Your MongoDB Atlas connection string
- `PORT`: Port number (usually auto-assigned)
- `FRONTEND_URL`: Your deployed frontend URL

### Frontend Deployment

Recommended platforms:
- Vercel
- Netlify

Environment variables to set:
- `VITE_API_URL`: Your deployed backend API URL

After deployment, update the backend's `FRONTEND_URL` environment variable with your actual frontend URL to enable CORS.

## Development Notes

### Port Configuration

The backend runs on port 5001 instead of 5000 to avoid conflicts with macOS AirPlay Receiver service.

### Styling Approach

This project uses Tailwind CSS via CDN for simplified development. For production builds, consider installing Tailwind CSS as a dependency for better performance.

### CORS Configuration

The backend is configured to accept requests from the frontend URL specified in the environment variables. Update the `FRONTEND_URL` variable when deploying to production.

## Troubleshooting

### Backend not connecting to MongoDB
- Verify MongoDB is running locally, or check your Atlas connection string
- Ensure network access is configured in MongoDB Atlas
- Check that the database user credentials are correct

### Frontend not communicating with backend
- Verify both servers are running
- Check that `VITE_API_URL` matches your backend URL
- Clear browser cache and reload the page
- Check browser console for CORS errors

### Build errors
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Ensure Node.js version is compatible (v14+)

## License

MIT License
