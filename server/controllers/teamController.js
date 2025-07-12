const TeamMember = require('../models/TeamMember');
const logger = require('../config/logger');
const { deleteFile, getFileUrl } = require('../middleware/upload');

// @desc    Get all team members
// @route   GET /api/team
// @access  Private
exports.getTeamMembers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    
    // Build query
    let query = {};
    
    if (req.query.type) {
      query.type = req.query.type;
    }
    
    if (req.query.isActive !== undefined) {
      query.isActive = req.query.isActive === 'true';
    }
    
    if (req.query.search) {
      query.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { position: { $regex: req.query.search, $options: 'i' } },
        { university: { $regex: req.query.search, $options: 'i' } }
      ];
    }
    
    // Sort options
    let sort = { displayOrder: 1, createdAt: -1 };
    if (req.query.sort) {
      const sortField = req.query.sort.startsWith('-') ? req.query.sort.slice(1) : req.query.sort;
      const sortOrder = req.query.sort.startsWith('-') ? -1 : 1;
      sort = { [sortField]: sortOrder };
    }

    const teamMembers = await TeamMember.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await TeamMember.countDocuments(query);

    // Add file URLs
    const membersWithUrls = teamMembers.map(member => {
      const memberObj = member.toObject();
      if (memberObj.profilePicture && memberObj.profilePicture.filename) {
        memberObj.profilePicture.url = getFileUrl(req, memberObj.profilePicture.filename, 'profiles');
      }
      return memberObj;
    });

    res.status(200).json({
      success: true,
      count: teamMembers.length,
      total,
      pagination: {
        page,
        limit,
        pages: Math.ceil(total / limit)
      },
      data: membersWithUrls
    });
  } catch (error) {
    logger.error('Get team members error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get single team member
// @route   GET /api/team/:id
// @access  Private
exports.getTeamMemberById = async (req, res) => {
  try {
    const teamMember = await TeamMember.findById(req.params.id);

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }

    // Add file URL
    const memberObj = teamMember.toObject();
    if (memberObj.profilePicture && memberObj.profilePicture.filename) {
      memberObj.profilePicture.url = getFileUrl(req, memberObj.profilePicture.filename, 'profiles');
    }

    res.status(200).json({
      success: true,
      data: memberObj
    });
  } catch (error) {
    logger.error('Get team member by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Create team member
// @route   POST /api/team
// @access  Private
exports.createTeamMember = async (req, res) => {
  try {
    // Handle file upload
    if (req.file) {
      req.body.profilePicture = {
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        url: getFileUrl(req, req.file.filename, 'profiles')
      };
    }

    // Parse social media if it's a string
    if (typeof req.body.socialMedia === 'string') {
      try {
        req.body.socialMedia = JSON.parse(req.body.socialMedia);
      } catch (e) {
        req.body.socialMedia = {};
      }
    }

    // Parse arrays if they're strings
    if (typeof req.body.researchInterests === 'string') {
      try {
        req.body.researchInterests = JSON.parse(req.body.researchInterests);
      } catch (e) {
        req.body.researchInterests = [];
      }
    }

    if (typeof req.body.education === 'string') {
      try {
        req.body.education = JSON.parse(req.body.education);
      } catch (e) {
        req.body.education = [];
      }
    }

    const teamMember = await TeamMember.create(req.body);

    logger.info(`Team member created: ${teamMember.name} by ${req.admin.email}`);

    res.status(201).json({
      success: true,
      data: teamMember
    });
  } catch (error) {
    // Delete uploaded file if team member creation fails
    if (req.file) {
      deleteFile(req.file.path);
    }
    
    logger.error('Create team member error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update team member
// @route   PUT /api/team/:id
// @access  Private
exports.updateTeamMember = async (req, res) => {
  try {
    let teamMember = await TeamMember.findById(req.params.id);

    if (!teamMember) {
      // Delete uploaded file if team member not found
      if (req.file) {
        deleteFile(req.file.path);
      }
      
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }

    // Handle file upload
    if (req.file) {
      // Delete old file if exists
      if (teamMember.profilePicture && teamMember.profilePicture.filename) {
        deleteFile(`uploads/profiles/${teamMember.profilePicture.filename}`);
      }
      
      req.body.profilePicture = {
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        url: getFileUrl(req, req.file.filename, 'profiles')
      };
    }

    // Parse social media if it's a string
    if (typeof req.body.socialMedia === 'string') {
      try {
        req.body.socialMedia = JSON.parse(req.body.socialMedia);
      } catch (e) {
        // Keep existing social media if parsing fails
        delete req.body.socialMedia;
      }
    }

    // Parse arrays if they're strings
    if (typeof req.body.researchInterests === 'string') {
      try {
        req.body.researchInterests = JSON.parse(req.body.researchInterests);
      } catch (e) {
        delete req.body.researchInterests;
      }
    }

    if (typeof req.body.education === 'string') {
      try {
        req.body.education = JSON.parse(req.body.education);
      } catch (e) {
        delete req.body.education;
      }
    }

    teamMember = await TeamMember.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    logger.info(`Team member updated: ${teamMember.name} by ${req.admin.email}`);

    res.status(200).json({
      success: true,
      data: teamMember
    });
  } catch (error) {
    // Delete uploaded file if update fails
    if (req.file) {
      deleteFile(req.file.path);
    }
    
    logger.error('Update team member error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete team member
// @route   DELETE /api/team/:id
// @access  Private
exports.deleteTeamMember = async (req, res) => {
  try {
    const teamMember = await TeamMember.findById(req.params.id);

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }

    // Delete associated file
    if (teamMember.profilePicture && teamMember.profilePicture.filename) {
      deleteFile(`uploads/profiles/${teamMember.profilePicture.filename}`);
    }

    await TeamMember.findByIdAndDelete(req.params.id);

    logger.info(`Team member deleted: ${teamMember.name} by ${req.admin.email}`);

    res.status(200).json({
      success: true,
      message: 'Team member deleted successfully'
    });
  } catch (error) {
    logger.error('Delete team member error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update team member display order
// @route   PUT /api/team/reorder
// @access  Private
exports.reorderTeamMembers = async (req, res) => {
  try {
    const { members } = req.body; // Array of { id, displayOrder }

    if (!Array.isArray(members)) {
      return res.status(400).json({
        success: false,
        message: 'Members array is required'
      });
    }

    // Update display order for each member
    const updatePromises = members.map(member => 
      TeamMember.findByIdAndUpdate(
        member.id,
        { displayOrder: member.displayOrder },
        { new: true }
      )
    );

    await Promise.all(updatePromises);

    logger.info(`Team members reordered by ${req.admin.email}`);

    res.status(200).json({
      success: true,
      message: 'Team members reordered successfully'
    });
  } catch (error) {
    logger.error('Reorder team members error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get team statistics
// @route   GET /api/team/stats
// @access  Private
exports.getTeamStats = async (req, res) => {
  try {
    const stats = await TeamMember.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalMembers = await TeamMember.countDocuments();
    const activeMembers = await TeamMember.countDocuments({ isActive: true });
    const inactiveMembers = await TeamMember.countDocuments({ isActive: false });

    res.status(200).json({
      success: true,
      data: {
        total: totalMembers,
        active: activeMembers,
        inactive: inactiveMembers,
        typeBreakdown: stats
      }
    });
  } catch (error) {
    logger.error('Get team stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};