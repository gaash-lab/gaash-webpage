const express = require('express');
const {
  getNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
  getNewsStats
} = require('../controllers/newsController');

const { protect, authorize, auditLog } = require('../middleware/auth');
const { uploadSingle, handleMulterError } = require('../middleware/upload');
const { uploadLimiter } = require('../middleware/security');
const {
  validateNews,
  validateId,
  validatePagination,
  handleValidationErrors
} = require('../middleware/validation');

const router = express.Router();

// All routes are protected
router.use(protect);

// GET routes
router.get('/', validatePagination, handleValidationErrors, getNews);
router.get('/stats', getNewsStats);
router.get('/:id', validateId, handleValidationErrors, getNewsById);

// POST routes
router.post('/',
  uploadLimiter,
  uploadSingle('featuredImage'),
  handleMulterError,
  validateNews,
  handleValidationErrors,
  auditLog('create_news', 'news'),
  createNews
);

// PUT routes
router.put('/:id',
  validateId,
  uploadLimiter,
  uploadSingle('featuredImage'),
  handleMulterError,
  validateNews,
  handleValidationErrors,
  auditLog('update_news', 'news'),
  updateNews
);

// DELETE routes
router.delete('/:id',
  validateId,
  handleValidationErrors,
  authorize('admin', 'super_admin'),
  auditLog('delete_news', 'news'),
  deleteNews
);

module.exports = router;