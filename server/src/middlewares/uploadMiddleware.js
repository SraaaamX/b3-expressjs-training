const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure storage for profile pictures
const profilePicStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../../public/uploads/avatars');
        // Create directory if it doesn't exist
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, 'avatar-' + uniqueSuffix + ext);
    }
});

// Configure storage for property images
const propertyImageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../../public/uploads/properties');
        // Create directory if it doesn't exist
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, 'property-' + uniqueSuffix + ext);
    }
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'));
    }
};

// Helper function to delete uploaded file
const deleteUploadedFile = (filePath) => {
    if (filePath && fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
};

// Wrapper for profile picture uploads with error handling
const uploadProfilePic = (req, res, next) => {
    const upload = multer({
        storage: profilePicStorage,
        limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
        fileFilter: fileFilter
    }).single('profilepic');

    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        // Store the file info in req for potential cleanup
        if (req.file) {
            req.uploadedFile = {
                path: path.join(__dirname, '../../public/uploads/avatars', req.file.filename),
                url: `/uploads/avatars/${req.file.filename}`
            };
        }
        next();
    });
};

// Wrapper for property image uploads with error handling
const uploadPropertyImage = (req, res, next) => {
    const upload = multer({
        storage: propertyImageStorage,
        limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
        fileFilter: fileFilter
    }).single('image');

    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        // Store the file info in req for potential cleanup
        if (req.file) {
            req.uploadedFile = {
                path: path.join(__dirname, '../../public/uploads/properties', req.file.filename),
                url: `/uploads/properties/${req.file.filename}`
            };
        }
        next();
    });
};

module.exports = {
    uploadProfilePic,
    uploadPropertyImage,
    deleteUploadedFile
};
