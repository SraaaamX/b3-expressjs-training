const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin');
const userController = require('../controllers/usersControllers');
const { uploadProfilePic } = require('../middlewares/uploadMiddleware');

// Routes with authentication

// Routes accessible only to administrators
router.get('/', verifyToken, verifyAdmin, userController.getAllUsers);

// Routes accessible to the concerned user or an administrator
// Authorization logic is handled in the controllers
router.get('/:id', verifyToken, userController.getUserById);
router.patch('/:id', verifyToken, uploadProfilePic, userController.updateUser);
router.delete('/:id', verifyToken, userController.deleteUser);

module.exports = router;