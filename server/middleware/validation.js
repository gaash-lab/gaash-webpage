const { body, param, query, validationResult } = require('express-validator');
const logger = require('../config/logger');

// Handle validation errors
exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    logger.warn('Validation errors:', errors.array());
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  
  next();
};

// Admin validation rules
exports.validateAdminRegistration = [
  body('username')
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  
  body('role')
    .optional()
    .isIn(['super_admin', 'admin', 'editor'])
    .withMessage('Invalid role')
];

exports.validateAdminLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

// News validation rules
exports.validateNews = [
  body('title')
    .isLength({ min: 1, max: 200 })
    .withMessage('Title is required and must not exceed 200 characters')
    .trim(),
  
  body('content')
    .isLength({ min: 1 })
    .withMessage('Content is required')
    .trim(),
  
  body('excerpt')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Excerpt must not exceed 500 characters')
    .trim(),
  
  body('category')
    .isIn(['research', 'announcement', 'event', 'publication', 'general'])
    .withMessage('Invalid category'),
  
  body('status')
    .optional()
    .isIn(['draft', 'published', 'archived'])
    .withMessage('Invalid status'),
  
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  
  body('featured')
    .optional()
    .isBoolean()
    .withMessage('Featured must be a boolean')
];

// Team member validation rules
exports.validateTeamMember = [
  body('name')
    .isLength({ min: 1, max: 100 })
    .withMessage('Name is required and must not exceed 100 characters')
    .trim(),
  
  body('position')
    .isLength({ min: 1, max: 100 })
    .withMessage('Position is required and must not exceed 100 characters')
    .trim(),
  
  body('designation')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Designation must not exceed 100 characters')
    .trim(),
  
  body('university')
    .optional()
    .isLength({ max: 200 })
    .withMessage('University must not exceed 200 characters')
    .trim(),
  
  body('bio')
    .optional()
    .isLength({ max: 2000 })
    .withMessage('Bio must not exceed 2000 characters')
    .trim(),
  
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  
  body('type')
    .isIn(['faculty', 'scholar', 'student', 'collaborator', 'staff'])
    .withMessage('Invalid type'),
  
  body('displayOrder')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Display order must be a non-negative integer'),
  
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean')
];

// Publication validation rules
exports.validatePublication = [
  body('title')
    .isLength({ min: 1, max: 500 })
    .withMessage('Title is required and must not exceed 500 characters')
    .trim(),
  
  body('authors')
    .isLength({ min: 1 })
    .withMessage('Authors are required')
    .trim(),
  
  body('abstract')
    .optional()
    .isLength({ max: 3000 })
    .withMessage('Abstract must not exceed 3000 characters')
    .trim(),
  
  body('publicationDate')
    .isISO8601()
    .withMessage('Please provide a valid publication date'),
  
  body('type')
    .isIn(['journal', 'conference', 'workshop', 'book', 'chapter', 'thesis', 'preprint'])
    .withMessage('Invalid publication type'),
  
  body('field')
    .optional()
    .isIn(['multi-modal-learning', 'large-language-modelling', 'computer-architecture', 'distributed-computation', 'medical-image-analysis', 'other'])
    .withMessage('Invalid field'),
  
  body('status')
    .optional()
    .isIn(['published', 'accepted', 'under-review', 'draft'])
    .withMessage('Invalid status'),
  
  body('featured')
    .optional()
    .isBoolean()
    .withMessage('Featured must be a boolean'),
  
  body('doi')
    .optional()
    .trim(),
  
  body('paperLink')
    .optional()
    .isURL()
    .withMessage('Paper link must be a valid URL'),
  
  body('codeLink')
    .optional()
    .isURL()
    .withMessage('Code link must be a valid URL')
];

// Common validation rules
exports.validateId = [
  param('id')
    .isMongoId()
    .withMessage('Invalid ID format')
];

exports.validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  
  query('sort')
    .optional()
    .trim(),
  
  query('search')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Search term must not exceed 100 characters')
];