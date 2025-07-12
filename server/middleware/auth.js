const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const AuditLog = require('../models/AuditLog');
const logger = require('../config/logger');

// Protect routes - require authentication
exports.protect = async (req, res, next) => {
  try {
    let token;

    // Get token from header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    // Get token from cookie
    else if (req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route'
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Get admin from token
      const admin = await Admin.findById(decoded.id).select('+password');
      
      if (!admin) {
        return res.status(401).json({
          success: false,
          message: 'No admin found with this token'
        });
      }

      if (!admin.isActive) {
        return res.status(401).json({
          success: false,
          message: 'Admin account is deactivated'
        });
      }

      if (admin.isLocked) {
        return res.status(401).json({
          success: false,
          message: 'Admin account is temporarily locked'
        });
      }

      req.admin = admin;
      next();
    } catch (error) {
      logger.error('Token verification failed:', error);
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route'
      });
    }
  } catch (error) {
    logger.error('Auth middleware error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.admin.role)) {
      return res.status(403).json({
        success: false,
        message: `Admin role ${req.admin.role} is not authorized to access this route`
      });
    }
    next();
  };
};

// Audit log middleware
exports.auditLog = (action, resource) => {
  return async (req, res, next) => {
    const originalSend = res.send;
    
    res.send = function(data) {
      // Log successful operations (2xx status codes)
      if (res.statusCode >= 200 && res.statusCode < 300) {
        const auditData = {
          admin: req.admin._id,
          action,
          resource,
          ipAddress: req.ip || req.connection.remoteAddress,
          userAgent: req.get('User-Agent') || 'Unknown',
          details: {
            method: req.method,
            url: req.originalUrl,
            body: req.body,
            params: req.params,
            query: req.query
          }
        };

        // Add resource ID if available
        if (req.params.id) {
          auditData.resourceId = req.params.id;
        }

        // Create audit log entry
        AuditLog.create(auditData).catch(error => {
          logger.error('Failed to create audit log:', error);
        });
      }
      
      originalSend.call(this, data);
    };
    
    next();
  };
};