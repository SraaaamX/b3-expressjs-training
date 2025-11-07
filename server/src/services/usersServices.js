const Users = require('../models/usersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const { deleteUploadedFile } = require('../middlewares/uploadMiddleware');
const { toUserDto, toUserDtoList, fromCreateUserDto, fromUpdateUserDto } = require('../mappers/usersMappers');

class UsersService {
    /**
     * Retrieves all users without their passwords
     */
    async getAllUsers() {
        const users = await Users.find().select('-password');
        if (!users.length) {
            throw { status: 404, message: 'No users found' };
        }
        return toUserDtoList(users);
    }

    /**
     * Retrieves a single user by ID with permission checks
     */
    async getUserById(userId, requestingUser) {
        // Permission verification
        const isAdmin = requestingUser.role === 'admin';
        const isSelfQuery = requestingUser.userId === userId;
        
        if (!isAdmin && !isSelfQuery) {
            throw { status: 403, message: 'Access denied: You can only view your own account' };
        }
        
        const user = await Users.findById(userId).select('-password');
        if (!user) {
            throw { status: 404, message: 'User not found' };
        }
        
        return toUserDto(user);
    }

    /**
     * Creates a new user with optional profile picture
     */
    async createUser(userData, uploadedFile = null) {
        const { name, nickname, email, password, role } = userData;
        
        // Required fields validation
        if (!name || !nickname || !email || !password) {
            if (uploadedFile) {
                deleteUploadedFile(uploadedFile.path);
            }
            throw { status: 400, message: 'All fields are required' };
        }
        
        // Check if user already exists
        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            if (uploadedFile) {
                deleteUploadedFile(uploadedFile.path);
            }
            throw { status: 409, message: 'User with this email already exists' };
        }
        
        // Prepare user data with DTO
        const userDataDto = fromCreateUserDto(userData);
        userDataDto.password = await bcrypt.hash(password, 10);
        
        // Add profile picture if provided
        if (uploadedFile) {
            userDataDto.profilepic = uploadedFile.url || `/uploads/avatars/${uploadedFile.filename}`;
        }
        
        // Create the user
        const user = await Users.create(userDataDto);
        
        // Generate token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET_KEY,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );
        
        return { user: toUserDto(user), token };
    }

    /**
     * Authenticates a user and returns a JWT token
     */
    async loginUser(email, password) {
        // Required fields validation
        if (!email || !password) {
            throw { status: 400, message: 'All fields are required' };
        }
        
        // Find the user
        const user = await Users.findOne({ email });
        if (!user) {
            throw { status: 401, message: 'Invalid credentials' };
        }
        
        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw { status: 401, message: 'Invalid credentials' };
        }
        
        // Generate token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );
        
        return { token };
    }

    /**
     * Updates user information with permission checks
     */
    async updateUser(userId, updates, requestingUser, uploadedFile = null) {
        // Permission verification
        const isAdmin = requestingUser.role === 'admin';
        const isSelfUpdate = requestingUser.userId === userId;
        
        if (!isAdmin && !isSelfUpdate) {
            if (uploadedFile) {
                deleteUploadedFile(uploadedFile.path);
            }
            throw { status: 403, message: 'Access denied: You can only update your own account' };
        }
        
        // Prepare updates
        const updateData = { ...updates };
        
        // Hash password if provided
        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }
        
        // Prevent role modification for non-admin users
        if (!isAdmin && updateData.role) {
            delete updateData.role;
        }
        
        // Get current user to handle old profile picture
        const currentUser = await Users.findById(userId);
        
        // Handle new profile picture
        if (uploadedFile) {
            // Delete old picture if exists
            if (currentUser && currentUser.profilepic) {
                const oldImagePath = path.join(__dirname, '../../public', currentUser.profilepic);
                deleteUploadedFile(oldImagePath);
            }
            
            updateData.profilepic = uploadedFile.url || `/uploads/avatars/${uploadedFile.filename}`;
        }
        
        // Update the user
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

    /**
     * Deletes a user with permission checks and cleanup
     */
    async deleteUser(userId, requestingUser) {
        // Permission verification
        const isAdmin = requestingUser.role === 'admin';
        const isSelfDelete = requestingUser.userId === userId;
        
        if (!isAdmin && !isSelfDelete) {
            throw { status: 403, message: 'Access denied: You can only delete your own account' };
        }
        
        // Get user before deletion to access profile picture
        const userToDelete = await Users.findById(userId);
        if (!userToDelete) {
            throw { status: 404, message: 'User not found' };
        }
        
        // Delete profile picture if exists
        if (userToDelete.profilepic) {
            const profilePicPath = path.join(__dirname, '../../public', userToDelete.profilepic);
            deleteUploadedFile(profilePicPath);
        }
        
        // Delete the user
        await Users.findByIdAndDelete(userId);
        
        return { message: 'User deleted successfully' };
    }
}

module.exports = new UsersService();