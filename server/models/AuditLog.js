const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  },
  action: {
    type: String,
    required: [true, 'Action is required'],
    enum: [
      'login', 'logout', 'login_failed',
      'create_news', 'update_news', 'delete_news',
      'create_team_member', 'update_team_member', 'delete_team_member',
      'create_publication', 'update_publication', 'delete_publication',
      'upload_file', 'delete_file',
      'create_admin', 'update_admin', 'delete_admin',
      'password_reset_request', 'password_reset_success'
    ]
  },
  resource: {
    type: String,
    enum: ['admin', 'news', 'team_member', 'publication', 'file', 'auth']
  },
  resourceId: {
    type: mongoose.Schema.Types.ObjectId
  },
  details: {
    type: mongoose.Schema.Types.Mixed
  },
  ipAddress: {
    type: String,
    required: true
  },
  userAgent: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Index for better query performance
auditLogSchema.index({ admin: 1, timestamp: -1 });
auditLogSchema.index({ action: 1, timestamp: -1 });
auditLogSchema.index({ resource: 1, timestamp: -1 });

module.exports = mongoose.model('AuditLog', auditLogSchema);