const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersControllers');

// Routes d'authentification
router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);

module.exports = router;