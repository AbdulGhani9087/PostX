const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'posthub-secret-key-2026';

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided. Please login.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token. Please login again.' });
    }
}

module.exports = { authMiddleware, JWT_SECRET };
