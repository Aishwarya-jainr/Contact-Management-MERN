# Contact Management Web App

A full-stack MERN (MongoDB, Express, React, Node.js) application for managing contacts with a modern dark-themed user interface.

## 🚀 Live Demo

- **Frontend**: [Deploy URL will be added]
- **Backend API**: [Deploy URL will be added]

## ✨ Features

### Core Functionality
- ✅ **Contact Form** with real-time validation
  - Name (required, min 2 characters)
  - Email (required, valid email format)
  - Phone (required, 10 digits)
  - Message (optional, max 500 characters)
- ✅ **Client-side validation** with error messages
- ✅ **Submit button** disabled when form is invalid
- ✅ **Contact List** displays all saved contacts
- ✅ **Real-time updates** without page reload
- ✅ **Responsive design** for all screen sizes

### Bonus Features
- ✅ **Delete contacts** with confirmation
- ✅ **Success messages** after submission
- ✅ **Reusable React components**
- ✅ **Sorting** (Newest/Oldest, Name A-Z/Z-A)

## 🛠️ Tech Stack

### Frontend
- **React** (with Vite)
- **Tailwind CSS**
- **Lucide React** (icons)

### Backend
- **Node.js**
- **Express.js**
- **MongoDB** with Mongoose
- **Express Validator** for input validation
- **CORS** enabled

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```env
   PORT=5001
   MONGODB_URI=mongodb://localhost:27017/contact-management
   FRONTEND_URL=http://localhost:5173
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

The backend will run on `http://localhost:5001`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with:
   ```env
   VITE_API_URL=http://localhost:5001/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will run on `http://localhost:5173`

## 📡 API Endpoints

### Base URL: `http://localhost:5001/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/contacts` | Get all contacts (with optional sorting) |
| POST | `/contacts` | Create a new contact |
| DELETE | `/contacts/:id` | Delete a contact by ID |

### Example API Request

**Create Contact:**
```bash
curl -X POST http://localhost:5001/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "message": "Test message"
  }'
```

**Get All Contacts:**
```bash
curl http://localhost:5001/api/contacts
```

## 🎨 UI Design

The application features a modern, dark-themed interface with:
- Emerald/green gradient accents
- Card-based layout for contacts
- Smooth transitions and hover effects
- Responsive grid system
- Premium glassmorphism effects

## 📱 Screenshots

![Contact Form](screenshots/contact-form.png)
![Contact List](screenshots/contact-list.png)

## 🚀 Deployment

### Backend Deployment (Railway/Render)

1. Create a new project on Railway or Render
2. Connect your GitHub repository
3. Set environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `PORT`: 5001 (or use the platform's default)
   - `FRONTEND_URL`: Your deployed frontend URL

4. Deploy the backend directory

### Frontend Deployment (Vercel/Netlify)

1. Create a new project on Vercel or Netlify
2. Connect your GitHub repository
3. Set the root directory to `frontend`
4. Add environment variable:
   - `VITE_API_URL`: Your deployed backend API URL

5. Deploy

### Update CORS

After deployment, update the backend `.env`:
```env
FRONTEND_URL=https://your-frontend-url.vercel.app
```

## 📝 Project Structure

```
contact-management-app/
├── backend/
│   ├── models/
│   │   └── Contact.js          # MongoDB schema
│   ├── routes/
│   │   └── contacts.js         # API routes
│   ├── server.js               # Express server
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ContactForm.jsx
│   │   │   └── ContactList.jsx
│   │   ├── App.jsx
│   │   └── index.css
│   ├── package.json
│   └── .env
└── README.md
```

## 🧪 Testing

### Manual Testing
1. Open the application in a browser
2. Fill out the contact form with valid data
3. Submit and verify the contact appears in the list
4. Test invalid inputs to see validation errors
5. Test delete functionality
6. Test sorting options

### API Testing with curl
```bash
# Test GET endpoint
curl http://localhost:5001/api/contacts

# Test POST endpoint
curl -X POST http://localhost:5001/api/contacts \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","phone":"1234567890"}'
```

## 🎯 Assignment Requirements Met

| Requirement | Status |
|------------|--------|
| React frontend | ✅ |
| Node.js + Express backend | ✅ |
| MongoDB database | ✅ |
| Contact form with validation | ✅ |
| POST API to store contacts | ✅ |
| GET API to fetch contacts | ✅ |
| Display contacts without reload | ✅ |
| Responsive UI | ✅ |
| Submit button disabled when invalid | ✅ |
| Delete contact (bonus) | ✅ |
| Success message (bonus) | ✅ |
| Reusable components (bonus) | ✅ |
| Sorting (bonus) | ✅ |

## 👨‍💻 Author

Created as part of the MERN Stack internship assignment.

## 📄 License

MIT License
