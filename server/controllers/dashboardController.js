const News = require('../models/News');
const TeamMember = require('../models/TeamMember');
const Publication = require('../models/Publication');
const Admin = require('../models/Admin');
const AuditLog = require('../models/AuditLog');
const logger = require('../config/logger');

// @desc    Get dashboard overview
// @route   GET /api/dashboard/overview
// @access  Private
exports.getDashboardOverview = async (req, res) => {
  try {
    // Get counts
    const totalNews = await News.countDocuments();
    const publishedNews = await News.countDocuments({ status: 'published' });
    const draftNews = await News.countDocuments({ status: 'draft' });
    
    const totalTeamMembers = await TeamMember.countDocuments();
    const activeTeamMembers = await TeamMember.countDocuments({ isActive: true });
    
    const totalPublications = await Publication.countDocuments();
    const publishedPublications = await Publication.countDocuments({ status: 'published' });
    
    const totalAdmins = await Admin.countDocuments();
    const activeAdmins = await Admin.countDocuments({ isActive: true });

    // Get recent activities
    const recentNews = await News.find()
      .populate('author', 'username')
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title status createdAt author');

    const recentPublications = await Publication.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title type year createdAt');

    const recentTeamMembers = await TeamMember.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name type createdAt');

    // Get recent audit logs
    const recentActivities = await AuditLog.find()
      .populate('admin', 'username')
      .sort({ timestamp: -1 })
      .limit(10)
      .select('action resource admin timestamp details');

    // Get monthly statistics for the last 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyNews = await News.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);

    const monthlyPublications = await Publication.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        overview: {
          news: {
            total: totalNews,
            published: publishedNews,
            draft: draftNews
          },
          teamMembers: {
            total: totalTeamMembers,
            active: activeTeamMembers
          },
          publications: {
            total: totalPublications,
            published: publishedPublications
          },
          admins: {
            total: totalAdmins,
            active: activeAdmins
          }
        },
        recentActivities: {
          news: recentNews,
          publications: recentPublications,
          teamMembers: recentTeamMembers,
          auditLogs: recentActivities
        },
        monthlyStats: {
          news: monthlyNews,
          publications: monthlyPublications
        }
      }
    });
  } catch (error) {
    logger.error('Get dashboard overview error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get system statistics
// @route   GET /api/dashboard/system-stats
// @access  Private (Super Admin only)
exports.getSystemStats = async (req, res) => {
  try {
    // Get database statistics
    const dbStats = await Promise.all([
      News.collection.stats(),
      TeamMember.collection.stats(),
      Publication.collection.stats(),
      Admin.collection.stats(),
      AuditLog.collection.stats()
    ]);

    // Get login statistics for the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const loginStats = await AuditLog.aggregate([
      {
        $match: {
          action: { $in: ['login', 'login_failed'] },
          timestamp: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },
            action: '$action'
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.date': 1 }
      }
    ]);

    // Get most active admins
    const activeAdmins = await AuditLog.aggregate([
      {
        $match: {
          timestamp: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: '$admin',
          actionCount: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'admins',
          localField: '_id',
          foreignField: '_id',
          as: 'admin'
        }
      },
      {
        $unwind: '$admin'
      },
      {
        $project: {
          username: '$admin.username',
          email: '$admin.email',
          actionCount: 1
        }
      },
      {
        $sort: { actionCount: -1 }
      },
      {
        $limit: 10
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        databaseStats: {
          news: dbStats[0],
          teamMembers: dbStats[1],
          publications: dbStats[2],
          admins: dbStats[3],
          auditLogs: dbStats[4]
        },
        loginStats,
        activeAdmins
      }
    });
  } catch (error) {
    logger.error('Get system stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get audit logs
// @route   GET /api/dashboard/audit-logs
// @access  Private
exports.getAuditLogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Build query
    let query = {};
    
    if (req.query.action) {
      query.action = req.query.action;
    }
    
    if (req.query.resource) {
      query.resource = req.query.resource;
    }
    
    if (req.query.admin) {
      query.admin = req.query.admin;
    }
    
    if (req.query.startDate && req.query.endDate) {
      query.timestamp = {
        $gte: new Date(req.query.startDate),
        $lte: new Date(req.query.endDate)
      };
    }

    const auditLogs = await AuditLog.find(query)
      .populate('admin', 'username email')
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit);

    const total = await AuditLog.countDocuments(query);

    res.status(200).json({
      success: true,
      count: auditLogs.length,
      total,
      pagination: {
        page,
        limit,
        pages: Math.ceil(total / limit)
      },
      data: auditLogs
    });
  } catch (error) {
    logger.error('Get audit logs error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Export data
// @route   GET /api/dashboard/export/:type
// @access  Private (Super Admin only)
exports.exportData = async (req, res) => {
  try {
    const { type } = req.params;
    let data;

    switch (type) {
      case 'news':
        data = await News.find().populate('author', 'username email');
        break;
      case 'team':
        data = await TeamMember.find();
        break;
      case 'publications':
        data = await Publication.find();
        break;
      case 'audit-logs':
        data = await AuditLog.find().populate('admin', 'username email');
        break;
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid export type'
        });
    }

    // Log the export action
    await AuditLog.create({
      admin: req.admin._id,
      action: 'export_data',
      resource: type,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
      details: { exportType: type, recordCount: data.length }
    });

    res.status(200).json({
      success: true,
      data,
      exportInfo: {
        type,
        recordCount: data.length,
        exportedAt: new Date(),
        exportedBy: req.admin.username
      }
    });
  } catch (error) {
    logger.error('Export data error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};