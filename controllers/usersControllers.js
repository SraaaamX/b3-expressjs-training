const usersService = require('../services/usersServices');
const { toUserDto, toUserDtoList, fromCreateUserDto, fromUpdateUserDto } = require('../mappers/usersMappers');

// Retrieve every user from the system
exports.getAllUsers = async (req, res) => {
    try {
        const users = await usersService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ error: error.message });
    }
};

// Fetch a single user by its unique identifier
exports.getUserById = async (req, res) => {
    try {
        const user = await usersService.getUserById(req.params.id, req.user);
        res.status(200).json({ 
            message: 'User retrieved successfully',
            data: user
        });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ error: error.message });
    }
};

// Register a brand-new user with optional profile picture
exports.createUser = async (req, res) => {
    try {
        const uploadedFile = req.file ? {
            path: req.uploadedFile?.path,
            url: req.uploadedFile?.url,
            filename: req.file.filename
        } : null;
        
        const result = await usersService.createUser(req.body, uploadedFile);
        res.status(201).json(result);
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ error: error.message });
    }
};

// Authenticate an existing user and return access credentials
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await usersService.loginUser(email, password);
        res.status(200).json(result);
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ error: error.message });
    }
};

// Modify user details and optionally replace profile picture
exports.updateUser = async (req, res) => {
    try {
        const uploadedFile = req.file ? {
            path: req.uploadedFile?.path,
            url: req.uploadedFile?.url,
            filename: req.file.filename
        } : null;
        
        const updatedUser = await usersService.updateUser(
            req.params.id,
            req.body,
            req.user,
            uploadedFile
        );
        
        res.status(200).json({
            message: 'User updated successfully',
            data: updatedUser
        });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ error: error.message });
    }
};

// Permanently remove a user from the system
exports.deleteUser = async (req, res) => {
    try {
        const result = await usersService.deleteUser(req.params.id, req.user);
        res.status(200).json(result);
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ error: error.message });
    }
};