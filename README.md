# PostX 📱

A full-stack MERN (MongoDB, Express, React, Node.js) application for creating, sharing, and managing posts.

## 🚀 Features

- **User Authentication** - Secure user registration and login
- **Create Posts** - Share your thoughts and content
- **Like & Comment** - Interact with posts from other users
- **User Profiles** - View and manage your profile
- **Real-time Updates** - See new posts and interactions instantly
- **Responsive Design** - Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

### Frontend
- **React** - JavaScript library for building user interfaces
- **CSS** - Styling and responsive design

### Backend
- **Node.js** - JavaScript runtime environment
- **Express** - Web application framework
- **MongoDB** - NoSQL database for data storage

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)

## 🔧 Installation

### 1. Clone the repository
```bash
git clone https://github.com/AbdulGhani9087/PostX.git
cd PostX
```

### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

## ⚙️ Configuration

### Backend Setup (.env file)
Create a `.env` file in the backend directory:
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

### Frontend Setup
Update the API endpoint in your frontend configuration to match your backend server.

## 🚀 Running the Application

### Start Backend Server
```bash
cd backend
npm start
```
Backend runs on `http://localhost:5000`

### Start Frontend Development Server
```bash
cd frontend
npm start
```
Frontend runs on `http://localhost:3000`

## 📚 Project Structure

```
PostX/
├── backend/
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API endpoints
│   ├── controllers/       # Business logic
│   └── server.js         # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── App.js        # Main component
│   │   └── index.js      # React DOM render
│   └── package.json
└── README.md
```

## 🔑 API Endpoints (Example)

### User Routes
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - User login
- `GET /api/users/:id` - Get user profile

### Post Routes
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create a new post
- `GET /api/posts/:id` - Get post details
- `PUT /api/posts/:id` - Update a post
- `DELETE /api/posts/:id` - Delete a post

### Interaction Routes
- `POST /api/posts/:id/like` - Like a post
- `POST /api/posts/:id/comment` - Comment on a post

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

**Abdul Ghani**
- GitHub: [@AbdulGhani9087](https://github.com/AbdulGhani9087)

## 💬 Support

If you have any questions or need help, feel free to open an issue on GitHub.

---

**Happy Coding! 🎉**
