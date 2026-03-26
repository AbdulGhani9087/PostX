const express = require('express');
const multer = require('multer');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const uploadImage = require('./services/storage.service');
const postModel = require('./models/post.models');
const userModel = require('./models/user.models');
const { authMiddleware, JWT_SECRET } = require('./middleware/auth.middleware');

const app = express();

app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

// ========================
//    AUTH ROUTES
// ========================

// Signup
app.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            if (existingUser.email === email) {
                return res.status(400).json({ message: 'Email already registered' });
            }
            return res.status(400).json({ message: 'Username already taken' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await userModel.create({
            username,
            email,
            password: hashedPassword
        });

        // Generate token
        const token = jwt.sign(
            { id: user._id, username: user.username, email: user.email },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({
            message: 'Account created successfully',
            token,
            user: { id: user._id, username: user.username, email: user.email }
        });
    } catch (error) {
        console.error('Signup error:', error.message);
        res.status(500).json({ message: 'Error creating account', error: error.message });
    }
});

// Login
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate token
        const token = jwt.sign(
            { id: user._id, username: user.username, email: user.email },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: { id: user._id, username: user.username, email: user.email }
        });
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
});

// ========================
//    POST ROUTES (Protected)
// ========================

// Create post (requires auth)
app.post('/createpost', authMiddleware, upload.single("image"), async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.file);

        const result = await uploadImage(req.file);

        const post = await postModel.create({
            image: result.url,
            caption: req.body.caption,
            user: req.user.id
        });

        res.json({ message: "Post created successfully", post });
        console.log("post created successfully");
    } catch (error) {
        console.error("Error creating post:", error.message);
        res.status(500).json({ message: "Error creating post", error: error.message });
    }
});

// Get posts for logged-in user (requires auth)
app.get('/posts', authMiddleware, async (req, res) => {
    try {
        const posts = await postModel.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json({ message: "Posts fetched successfully", posts });
    } catch (error) {
        console.error("Error fetching posts:", error.message);
        res.status(500).json({ message: "Error fetching posts", error: error.message });
    }
});

// Update caption (requires auth, user can only update their own)
app.put('/updatecaption/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { caption } = req.body;

        const post = await postModel.findOneAndUpdate(
            { _id: id, user: req.user.id },
            { caption },
            { new: true }
        );

        if (!post) {
            return res.status(404).json({ message: "Post not found or not authorized" });
        }

        res.json({ message: "Caption updated successfully", post });
    } catch (error) {
        console.error("Error updating caption:", error.message);
        res.status(500).json({ message: "Error updating caption", error: error.message });
    }
});

// Delete post (requires auth, user can only delete their own)
app.delete('/deletepost/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;

        const post = await postModel.findOneAndDelete({ _id: id, user: req.user.id });

        if (!post) {
            return res.status(404).json({ message: "Post not found or not authorized" });
        }

        res.json({ message: "Post deleted successfully", post });
    } catch (error) {
        console.error("Error deleting post:", error.message);
        res.status(500).json({ message: "Error deleting post", error: error.message });
    }
});

module.exports = app;