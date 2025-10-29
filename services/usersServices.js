const Users = require('../models/usersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const { deleteUploadedFile } = require('../middlewares/uploadMiddleware');

class UsersService {
    /**
     * Récupère tous les utilisateurs (sans les mots de passe)
     */
    async getAllUsers() {
        const users = await Users.find().select('-password');
        if (!users.length) {
            throw { status: 404, message: 'No users found' };
        }
        return users;
    }

    async getUserById(userId, requestingUser) {
        // Vérification des permissions
        const isAdmin = requestingUser.role === 'admin';
        const isSelfQuery = requestingUser.userId === userId;
        
        if (!isAdmin && !isSelfQuery) {
            throw { status: 403, message: 'Access denied: You can only view your own account' };
        }
        
        const user = await Users.findById(userId).select('-password');
        if (!user) {
            throw { status: 404, message: 'User not found' };
        }
        
        return user;
    }

    async createUser(userData, uploadedFile = null) {
        const { name, nickname, email, password, role } = userData;
        
        // Validation des champs requis
        if (!name || !nickname || !email || !password) {
            if (uploadedFile) {
                deleteUploadedFile(uploadedFile.path);
            }
            throw { status: 400, message: 'All fields are required' };
        }
        
        // Vérification si l'utilisateur existe déjà
        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            if (uploadedFile) {
                deleteUploadedFile(uploadedFile.path);
            }
            throw { status: 409, message: 'User with this email already exists' };
        }
        
        // Préparation des données utilisateur
        const newUserData = {
            name,
            nickname,
            email,
            password: await bcrypt.hash(password, 10),
            role
        };
        
        // Ajout de la photo de profil si elle existe
        if (uploadedFile) {
            newUserData.profilepic = uploadedFile.url || `/uploads/avatars/${uploadedFile.filename}`;
        }
        
        // Création de l'utilisateur
        const user = await Users.create(newUserData);
        
        // Génération du token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET_KEY,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );
        
        return { user: user.toObject(), token };
    }

    async loginUser(email, password) {
        // Validation des champs requis
        if (!email || !password) {
            throw { status: 400, message: 'All fields are required' };
        }
        
        // Recherche de l'utilisateur
        const user = await Users.findOne({ email });
        if (!user) {
            throw { status: 401, message: 'Invalid credentials' };
        }
        
        // Vérification du mot de passe
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw { status: 401, message: 'Invalid credentials' };
        }
        
        // Génération du token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );
        
        return { token };
    }

    async updateUser(userId, updates, requestingUser, uploadedFile = null) {
        // Vérification des permissions
        const isAdmin = requestingUser.role === 'admin';
        const isSelfUpdate = requestingUser.userId === userId;
        
        if (!isAdmin && !isSelfUpdate) {
            if (uploadedFile) {
                deleteUploadedFile(uploadedFile.path);
            }
            throw { status: 403, message: 'Access denied: You can only update your own account' };
        }
        
        // Préparation des mises à jour
        const updateData = { ...updates };
        
        // Hash du mot de passe si présent
        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }
        
        // Empêcher la modification du rôle si l'utilisateur n'est pas admin
        if (!isAdmin && updateData.role) {
            delete updateData.role;
        }
        
        // Récupération de l'utilisateur actuel pour gérer l'ancienne photo
        const currentUser = await Users.findById(userId);
        
        // Gestion de la nouvelle photo de profil
        if (uploadedFile) {
            // Suppression de l'ancienne photo si elle existe
            if (currentUser && currentUser.profilepic) {
                const oldImagePath = path.join(__dirname, '../public', currentUser.profilepic);
                deleteUploadedFile(oldImagePath);
            }
            
            updateData.profilepic = uploadedFile.url || `/uploads/avatars/${uploadedFile.filename}`;
        }
        
        // Mise à jour de l'utilisateur
        const updatedUser = await Users.findByIdAndUpdate(
            userId,
            updateData,
            { new: true, runValidators: true }
        ).select('-password');
        
        if (!updatedUser) {
            if (uploadedFile) {
                deleteUploadedFile(uploadedFile.path);
            }
            throw { status: 404, message: 'User not found' };
        }
        
        return updatedUser;
    }

    async deleteUser(userId, requestingUser) {
        // Vérification des permissions
        const isAdmin = requestingUser.role === 'admin';
        const isSelfDelete = requestingUser.userId === userId;
        
        if (!isAdmin && !isSelfDelete) {
            throw { status: 403, message: 'Access denied: You can only delete your own account' };
        }
        
        // Suppression de l'utilisateur
        const userToDelete = await Users.findByIdAndDelete(userId);
        if (!userToDelete) {
            throw { status: 404, message: 'User not found' };
        }
        
        return { message: 'User deleted successfully' };
    }
}

module.exports = new UsersService();