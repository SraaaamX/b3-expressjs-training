const jwt = require('jsonwebtoken');
const Users = require('../models/usersModel');

// Middleware to verify that the incoming request is made by an authenticated agent or admin
module.exports = async (req, res, next) => {
    try {
        // Check if the user is authenticated
        const authToken = req.headers.authorization;
        if (!authToken) {
            return res.status(401).json({ error: 'No token provided' });
        }
        
        const token = authToken.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        // Verify that the user is an agent or admin
        const user = await Users.findById(decoded.userId);
        if (!user || (user.role !== 'agent' && user.role !== 'admin')) {
            return res.status(403).json({ error: 'Access denied: Agent privileges required' });
        }
        
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token or insufficient permissions' });
    }
};