// authMiddleware.js
const jwt = require('jsonwebtoken');
const { secretKey } = require('../auth'); // Adjust with the correct path

// Middleware for user authentication based on token
const authenticateUser = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access denied. Token is required.' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        console.log('Decoded Token:', { id: decoded.id, username: decoded.username, role: decoded.role });
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Token Verification Error:', error);
        res.status(401).json({ error: 'Invalid token.' });
    }
};

// Middleware for authorization based on user roles
const authorizeUser = (allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.user.role;

        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({
                error: `Forbidden. You do not have permission to access this resource. Required roles: ${allowedRoles.join(', ')}`
            });
        }

        next();
    };
};

module.exports = {
    authenticateUser,
    authorizeUser,
};
