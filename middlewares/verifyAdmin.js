const jwt = require('jsonwebtoken');
const Users = require('../models/usersModel');

module.exports = async (req, res, next) => {
    try {
        // Vérifier si l'utilisateur est authentifié
        const authToken = req.headers.authorization;
        if (!authToken) {
            return res.status(401).json({ error: 'No token provided' });
        }
        
        const token = authToken.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        // Vérifier si l'utilisateur est un admin
        const user = await Users.findById(decoded.userId);
        if (!user || user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied: Admin privileges required' });
        }
        
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token or insufficient permissions' });
    }
};