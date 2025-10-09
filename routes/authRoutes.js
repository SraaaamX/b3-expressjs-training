const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersControllers');
const { uploadProfilePic } = require('../middlewares/uploadMiddleware');

// Authentication routes
router.post('/register', uploadProfilePic, userController.createUser);
router.post('/login', userController.loginUser);

module.exports = router;