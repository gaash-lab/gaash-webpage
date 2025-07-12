const express = require('express');
const {
  getTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  reorderTeamMembers,
  getTeamStats
} = require('../controllers/teamController');

const { protect, authorize, auditLog } = require('../middleware/auth');
const { uploadSingle, handleMulterError } = require('../middleware/upload');
const { uploadLimiter } = require('../middleware/security');
const {
  validateTeamMember,
  validateId,
  validatePagination,
  handleValidationErrors
} = require('../middleware/validation');

const router = express.Router();

// All routes are protected
router.use(protect);

// GET routes
router.get('/', validatePagination, handleValidationErrors, getTeamMembers);
router.get('/stats', getTeamStats);
router.get('/:id', validateId, handleValidationErrors, getTeamMemberById);

// POST routes
router.post('/',
  uploadLimiter,
  uploadSingle('profilePicture'),
  handleMulterError,
  validateTeamMember,
  handleValidationErrors,
  auditLog('create_team_member', 'team_member'),
  createTeamMember
);

// PUT routes
router.put('/reorder',
  auditLog('reorder_team_members', 'team_member'),
  reorderTeamMembers
);

router.put('/:id',
  validateId,
  uploadLimiter,
  uploadSingle('profilePicture'),
  handleMulterError,
  validateTeamMember,
  handleValidationErrors,
  auditLog('update_team_member', 'team_member'),
  updateTeamMember
);

// DELETE routes
router.delete('/:id',
  validateId,
  handleValidationErrors,
  authorize('admin', 'super_admin'),
  auditLog('delete_team_member', 'team_member'),
  deleteTeamMember
);

module.exports = router;