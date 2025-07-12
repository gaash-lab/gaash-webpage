const express = require('express');
const {
  getPublications,
  getPublicationById,
  createPublication,
  updatePublication,
  deletePublication,
  getPublicationStats,
  getPublicationsByYear
} = require('../controllers/publicationController');

const { protect, authorize, auditLog } = require('../middleware/auth');
const { uploadSingle, handleMulterError } = require('../middleware/upload');
const { uploadLimiter } = require('../middleware/security');
const {
  validatePublication,
  validateId,
  validatePagination,
  handleValidationErrors
} = require('../middleware/validation');

const router = express.Router();

// All routes are protected
router.use(protect);

// GET routes
router.get('/', validatePagination, handleValidationErrors, getPublications);
router.get('/stats', getPublicationStats);
router.get('/by-year', getPublicationsByYear);
router.get('/:id', validateId, handleValidationErrors, getPublicationById);

// POST routes
router.post('/',
  uploadLimiter,
  uploadSingle('pdfFile'),
  handleMulterError,
  validatePublication,
  handleValidationErrors,
  auditLog('create_publication', 'publication'),
  createPublication
);

// PUT routes
router.put('/:id',
  validateId,
  uploadLimiter,
  uploadSingle('pdfFile'),
  handleMulterError,
  validatePublication,
  handleValidationErrors,
  auditLog('update_publication', 'publication'),
  updatePublication
);

// DELETE routes
router.delete('/:id',
  validateId,
  handleValidationErrors,
  authorize('admin', 'super_admin'),
  auditLog('delete_publication', 'publication'),
  deletePublication
);

module.exports = router;