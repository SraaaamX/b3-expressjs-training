const usersService = require('../services/usersServices');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await usersService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ error: error.message });
    }
};

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

exports.deleteUser = async (req, res) => {
    try {
        const result = await usersService.deleteUser(req.params.id, req.user);
        res.status(200).json(result);
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ error: error.message });
    }
};