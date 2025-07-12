const crypto = require('crypto');
const Admin = require('../models/Admin');
const AuditLog = require('../models/AuditLog');
const logger = require('../config/logger');
const { sendEmail } = require('../utils/email');

// Generate JWT token
const generateToken = (id) => {
  return require('jsonwebtoken').sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

// Send token response
const sendTokenResponse = (admin, statusCode, res) => {
  const token = generateToken(admin._id);
  
  const options = {
    expires: new Date(Date.now() + (parseInt(process.env.JWT_COOKIE_EXPIRE) || 7) * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  };

  res.status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        lastLogin: admin.lastLogin
      }
    });
};

// @desc    Register admin
// @route   POST /api/auth/register
// @access  Private (Super Admin only)
exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({
      $or: [{ email }, { username }]
    });

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'Admin with this email or username already exists'
      });
    }

    // Create admin
    const admin = await Admin.create({
      username,
      email,
      password,
      role: role || 'admin'
    });

    // Log the action
    await AuditLog.create({
      admin: req.admin._id,
      action: 'create_admin',
      resource: 'admin',
      resourceId: admin._id,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
      details: { newAdminEmail: email, newAdminRole: role }
    });

    logger.info(`New admin registered: ${email} by ${req.admin.email}`);

    res.status(201).json({
      success: true,
      message: 'Admin registered successfully',
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    logger.error('Admin registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
};

// @desc    Login admin
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find admin and include password
    const admin = await Admin.findOne({ email }).select('+password');

    if (!admin) {
      await AuditLog.create({
        admin: null,
        action: 'login_failed',
        resource: 'auth',
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
        details: { email, reason: 'Admin not found' }
      });

      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if account is locked
    if (admin.isLocked) {
      await AuditLog.create({
        admin: admin._id,
        action: 'login_failed',
        resource: 'auth',
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
        details: { email, reason: 'Account locked' }
      });

      return res.status(401).json({
        success: false,
        message: 'Account temporarily locked due to too many failed login attempts'
      });
    }

    // Check if account is active
    if (!admin.isActive) {
      await AuditLog.create({
        admin: admin._id,
        action: 'login_failed',
        resource: 'auth',
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
        details: { email, reason: 'Account deactivated' }
      });

      return res.status(401).json({
        success: false,
        message: 'Account is deactivated'
      });
    }

    // Check password
    const isMatch = await admin.matchPassword(password);

    if (!isMatch) {
      // Increment login attempts
      await admin.incLoginAttempts();

      await AuditLog.create({
        admin: admin._id,
        action: 'login_failed',
        resource: 'auth',
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
        details: { email, reason: 'Invalid password' }
      });

      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Reset login attempts on successful login
    if (admin.loginAttempts > 0) {
      await admin.resetLoginAttempts();
    }

    // Update last login
    admin.lastLogin = Date.now();
    await admin.save();

    // Log successful login
    await AuditLog.create({
      admin: admin._id,
      action: 'login',
      resource: 'auth',
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
      details: { email }
    });

    logger.info(`Admin logged in: ${email}`);

    sendTokenResponse(admin, 200, res);
  } catch (error) {
    logger.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
};

// @desc    Logout admin
// @route   POST /api/auth/logout
// @access  Private
exports.logout = async (req, res) => {
  try {
    // Log the logout
    await AuditLog.create({
      admin: req.admin._id,
      action: 'logout',
      resource: 'auth',
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
      details: { email: req.admin.email }
    });

    logger.info(`Admin logged out: ${req.admin.email}`);

    res.cookie('token', 'none', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true
    });

    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    logger.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during logout'
    });
  }
};

// @desc    Get current logged in admin
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id);

    res.status(200).json({
      success: true,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        lastLogin: admin.lastLogin,
        createdAt: admin.createdAt
      }
    });
  } catch (error) {
    logger.error('Get me error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Forgot password
// @route   POST /api/auth/forgotpassword
// @access  Public
exports.forgotPassword = async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'No admin found with that email'
      });
    }

    // Get reset token
    const resetToken = admin.getResetPasswordToken();
    await admin.save({ validateBeforeSave: false });

    // Create reset URL
    const resetUrl = `${process.env.ADMIN_URL}/reset-password/${resetToken}`;

    const message = `
      You are receiving this email because you (or someone else) has requested the reset of a password.
      Please click on the following link to reset your password:
      
      ${resetUrl}
      
      If you did not request this, please ignore this email and your password will remain unchanged.
      
      This link will expire in 10 minutes.
    `;

    try {
      await sendEmail({
        email: admin.email,
        subject: 'Password Reset Request - GAASH Lab Admin',
        message
      });

      // Log the action
      await AuditLog.create({
        admin: admin._id,
        action: 'password_reset_request',
        resource: 'auth',
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
        details: { email: admin.email }
      });

      res.status(200).json({
        success: true,
        message: 'Email sent successfully'
      });
    } catch (error) {
      admin.passwordResetToken = undefined;
      admin.passwordResetExpires = undefined;
      await admin.save({ validateBeforeSave: false });

      logger.error('Email send error:', error);
      return res.status(500).json({
        success: false,
        message: 'Email could not be sent'
      });
    }
  } catch (error) {
    logger.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Reset password
// @route   PUT /api/auth/resetpassword/:resettoken
// @access  Public
exports.resetPassword = async (req, res) => {
  try {
    // Get hashed token
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.resettoken)
      .digest('hex');

    const admin = await Admin.findOne({
      passwordResetToken: resetPasswordToken,
      passwordResetExpires: { $gt: Date.now() }
    });

    if (!admin) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired token'
      });
    }

    // Set new password
    admin.password = req.body.password;
    admin.passwordResetToken = undefined;
    admin.passwordResetExpires = undefined;
    await admin.save();

    // Log the action
    await AuditLog.create({
      admin: admin._id,
      action: 'password_reset_success',
      resource: 'auth',
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
      details: { email: admin.email }
    });

    logger.info(`Password reset successful for admin: ${admin.email}`);

    sendTokenResponse(admin, 200, res);
  } catch (error) {
    logger.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update password
// @route   PUT /api/auth/updatepassword
// @access  Private
exports.updatePassword = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id).select('+password');

    // Check current password
    if (!(await admin.matchPassword(req.body.currentPassword))) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    admin.password = req.body.newPassword;
    await admin.save();

    logger.info(`Password updated for admin: ${admin.email}`);

    sendTokenResponse(admin, 200, res);
  } catch (error) {
    logger.error('Update password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get CSRF token
// @route   GET /api/auth/csrf-token
// @access  Public
exports.getCSRFToken = (req, res) => {
  res.json({
    success: true,
    csrfToken: req.session.csrfToken
  });
};