const express = require('express');
const {
  register,
  login,
  logout,
  getMe,
  forgotPassword,
  resetPassword,
  updatePassword,
  getCSRFToken
} = require('../controllers/authController');

const { protect, authorize, auditLog } = require('../middleware/auth');
const { authLimiter, generateCSRFToken } = require('../middleware/security');
const {
  validateAdminRegistration,
  validateAdminLogin,
  handleValidationErrors
} = require('../middleware/validation');

const router = express.Router();

// Apply CSRF token generation to all routes
router.use(generateCSRFToken);

// Public routes
router.get('/csrf-token', getCSRFToken);
router.post('/login', authLimiter, validateAdminLogin, handleValidationErrors, login);
router.post('/forgotpassword', authLimiter, forgotPassword);
router.put('/resetpassword/:resettoken', authLimiter, resetPassword);

// Protected routes
router.use(protect); // All routes after this middleware are protected

router.get('/me', getMe);
router.post('/logout', auditLog('logout', 'auth'), logout);
router.put('/updatepassword', updatePassword);

// Super admin only routes
router.post('/register', 
  authorize('super_admin'), 
  validateAdminRegistration, 
  handleValidationErrors,
  auditLog('create_admin', 'admin'),
  register
);

module.exports = router;