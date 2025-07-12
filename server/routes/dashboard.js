const express = require('express');
const {
  getDashboardOverview,
  getSystemStats,
  getAuditLogs,
  exportData
} = require('../controllers/dashboardController');

const { protect, authorize } = require('../middleware/auth');
const {
  validatePagination,
  handleValidationErrors
} = require('../middleware/validation');

const router = express.Router();

// All routes are protected
router.use(protect);

// Dashboard overview - accessible to all authenticated admins
router.get('/overview', getDashboardOverview);

// Audit logs - accessible to all authenticated admins
router.get('/audit-logs', validatePagination, handleValidationErrors, getAuditLogs);

// System stats - super admin only
router.get('/system-stats', authorize('super_admin'), getSystemStats);

// Export data - super admin only
router.get('/export/:type', authorize('super_admin'), exportData);

module.exports = router;