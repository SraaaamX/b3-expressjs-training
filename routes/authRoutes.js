const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersControllers');
const { uploadProfilePic } = require('../middlewares/uploadMiddleware');
const validate = require('../middlewares/validationMiddleware');
const { loginSchema, registerSchema, forgotPasswordSchema, resetPasswordSchema } = require('../schemas/authSchemas');

// Authentication routes
router.post('/register', validate(registerSchema), uploadProfilePic, userController.createUser);
router.post('/login', validate(loginSchema), userController.loginUser);
module.exports = router;