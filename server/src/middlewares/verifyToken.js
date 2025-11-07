const jwt = require('jsonwebtoken');

/**
 * Middleware that verifies the JWT token sent in the Authorization header.
 * If the token is valid, it attaches the decoded payload to req.user and calls next().
 * If no token is provided or the token is invalid, it responds with a 401 status.
 */
module.exports = async (req, res, next) => {
    const authToken = req.headers.authorization;
    if (!authToken) {
        return res.status(401).json({ error: 'No token provided' });
    }
    const token = authToken.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};