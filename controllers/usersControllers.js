const Users = require('../models/usersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getAllUsers = async (req, res) => {
    try {
        const allUsers = await Users.find().select('-password');
        if (!allUsers.length) {
            return res.status(404).json({ error: 'No users found' });
        }
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const userById = await Users.findById(req.params.id).select('-password');
        if (!userById) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(userById);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const { name, nickname, email, password, role } = req.body;
        if (!name || !nickname || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'User with this email already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await Users.create({ name, nickname, email, password: hashedPassword, role });
        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN });
        res.status(201).json({ ...user.toObject(), token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const updates = { ...req.body };
        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }
        const updatedUser = await Users.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true }).select('-password');
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const userToDelete = await Users.findByIdAndDelete(req.params.id);
        if (!userToDelete) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// POSTMAN requests with content-type application/json raw json

// GET http://localhost:3000/api/users

// GET http://localhost:3000/api/users/1

// POST http://localhost:3000/api/users
// {
//     "name": "John Doe",
//     "nickname": "johndoe",
//     "email": "L1NtM@example.com",
//     "password": "password123"
// }

// PUT http://localhost:3000/api/users/1
// {
//     "name": "John Doe",
//     "nickname": "johndoe",
//     "email": "L1NtM@example.com",
//     "password": "password1234"
// }

// DELETE http://localhost:3000/api/users/1
