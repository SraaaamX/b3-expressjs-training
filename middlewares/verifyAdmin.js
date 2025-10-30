const jwt = require('jsonwebtoken');
const Users = require('../models/usersModel');

// Middleware to ensure the request is made by an authenticated admin
module.exports = async (req, res, next) => {
    try {
        // Check if the authorization header is present
        const authToken = req.headers.authorization;
        if (!authToken) {
            return res.status(401).json({ error: 'No token provided' });
        }
        
        // Extract and verify the JWT token
        const token = authToken.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        // Confirm the user exists and has admin role
        const user = await Users.findById(decoded.userId);
        if (!user || user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied: Admin privileges required' });
        }
        
        // Attach user info to the request for downstream use
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token or insufficient permissions' });
    }
};