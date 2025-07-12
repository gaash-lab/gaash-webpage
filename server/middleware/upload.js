const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const logger = require('../config/logger');

// Ensure upload directories exist
const uploadDirs = ['uploads/images', 'uploads/documents', 'uploads/profiles'];
uploadDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = 'uploads/images';
    
    if (file.fieldname === 'profilePicture') {
      uploadPath = 'uploads/profiles';
    } else if (file.fieldname === 'pdfFile') {
      uploadPath = 'uploads/documents';
    }
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

// File filter function
const fileFilter = (req, file, cb) => {
  // Allowed image types
  const imageTypes = /jpeg|jpg|png|gif|webp/;
  // Allowed document types
  const documentTypes = /pdf|doc|docx/;
  
  const extname = imageTypes.test(path.extname(file.originalname).toLowerCase()) ||
                  documentTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = file.mimetype.startsWith('image/') || 
                   file.mimetype === 'application/pdf' ||
                   file.mimetype === 'application/msword' ||
                   file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    logger.warn(`Invalid file type attempted: ${file.mimetype}`);
    cb(new Error('Invalid file type. Only images (JPEG, JPG, PNG, GIF, WebP) and documents (PDF, DOC, DOCX) are allowed.'));
  }
};

// Multer configuration
const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024, // 5MB default
    files: 5 // Maximum 5 files per request
  },
  fileFilter: fileFilter
});

// Error handling middleware for multer
exports.handleMulterError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large. Maximum size is 5MB.'
      });
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        message: 'Too many files. Maximum 5 files allowed.'
      });
    }
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        success: false,
        message: 'Unexpected file field.'
      });
    }
  }
  
  if (error.message.includes('Invalid file type')) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
  
  logger.error('Upload error:', error);
  return res.status(500).json({
    success: false,
    message: 'File upload failed.'
  });
};

// Single file upload
exports.uploadSingle = (fieldName) => upload.single(fieldName);

// Multiple files upload
exports.uploadMultiple = (fieldName, maxCount = 5) => upload.array(fieldName, maxCount);

// Mixed upload (different field names)
exports.uploadFields = (fields) => upload.fields(fields);

// Delete file helper
exports.deleteFile = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      logger.info(`File deleted: ${filePath}`);
      return true;
    }
    return false;
  } catch (error) {
    logger.error(`Error deleting file ${filePath}:`, error);
    return false;
  }
};

// Get file URL helper
exports.getFileUrl = (req, filename, type = 'images') => {
  if (!filename) return null;
  return `${req.protocol}://${req.get('host')}/uploads/${type}/${filename}`;
};