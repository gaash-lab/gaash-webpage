const Publication = require('../models/Publication');
const logger = require('../config/logger');
const { deleteFile, getFileUrl } = require('../middleware/upload');

// @desc    Get all publications
// @route   GET /api/publications
// @access  Private
exports.getPublications = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    // Build query
    let query = {};
    
    if (req.query.type) {
      query.type = req.query.type;
    }
    
    if (req.query.field) {
      query.field = req.query.field;
    }
    
    if (req.query.status) {
      query.status = req.query.status;
    }
    
    if (req.query.year) {
      query.year = parseInt(req.query.year);
    }
    
    if (req.query.search) {
      query.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { authors: { $regex: req.query.search, $options: 'i' } },
        { journal: { $regex: req.query.search, $options: 'i' } },
        { conference: { $regex: req.query.search, $options: 'i' } }
      ];
    }
    
    // Sort options
    let sort = { year: -1, publicationDate: -1 };
    if (req.query.sort) {
      const sortField = req.query.sort.startsWith('-') ? req.query.sort.slice(1) : req.query.sort;
      const sortOrder = req.query.sort.startsWith('-') ? -1 : 1;
      sort = { [sortField]: sortOrder };
    }

    const publications = await Publication.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Publication.countDocuments(query);

    // Add file URLs
    const publicationsWithUrls = publications.map(pub => {
      const pubObj = pub.toObject();
      if (pubObj.pdfFile && pubObj.pdfFile.filename) {
        pubObj.pdfFile.url = getFileUrl(req, pubObj.pdfFile.filename, 'documents');
      }
      return pubObj;
    });

    res.status(200).json({
      success: true,
      count: publications.length,
      total,
      pagination: {
        page,
        limit,
        pages: Math.ceil(total / limit)
      },
      data: publicationsWithUrls
    });
  } catch (error) {
    logger.error('Get publications error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get single publication
// @route   GET /api/publications/:id
// @access  Private
exports.getPublicationById = async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id);

    if (!publication) {
      return res.status(404).json({
        success: false,
        message: 'Publication not found'
      });
    }

    // Add file URL
    const pubObj = publication.toObject();
    if (pubObj.pdfFile && pubObj.pdfFile.filename) {
      pubObj.pdfFile.url = getFileUrl(req, pubObj.pdfFile.filename, 'documents');
    }

    res.status(200).json({
      success: true,
      data: pubObj
    });
  } catch (error) {
    logger.error('Get publication by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Create publication
// @route   POST /api/publications
// @access  Private
exports.createPublication = async (req, res) => {
  try {
    // Handle file upload
    if (req.file) {
      req.body.pdfFile = {
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        url: getFileUrl(req, req.file.filename, 'documents')
      };
    }

    // Parse tags if it's a string
    if (typeof req.body.tags === 'string') {
      try {
        req.body.tags = JSON.parse(req.body.tags);
      } catch (e) {
        req.body.tags = [];
      }
    }

    const publication = await Publication.create(req.body);

    logger.info(`Publication created: ${publication.title} by ${req.admin.email}`);

    res.status(201).json({
      success: true,
      data: publication
    });
  } catch (error) {
    // Delete uploaded file if publication creation fails
    if (req.file) {
      deleteFile(req.file.path);
    }
    
    logger.error('Create publication error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update publication
// @route   PUT /api/publications/:id
// @access  Private
exports.updatePublication = async (req, res) => {
  try {
    let publication = await Publication.findById(req.params.id);

    if (!publication) {
      // Delete uploaded file if publication not found
      if (req.file) {
        deleteFile(req.file.path);
      }
      
      return res.status(404).json({
        success: false,
        message: 'Publication not found'
      });
    }

    // Handle file upload
    if (req.file) {
      // Delete old file if exists
      if (publication.pdfFile && publication.pdfFile.filename) {
        deleteFile(`uploads/documents/${publication.pdfFile.filename}`);
      }
      
      req.body.pdfFile = {
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        url: getFileUrl(req, req.file.filename, 'documents')
      };
    }

    // Parse tags if it's a string
    if (typeof req.body.tags === 'string') {
      try {
        req.body.tags = JSON.parse(req.body.tags);
      } catch (e) {
        delete req.body.tags;
      }
    }

    publication = await Publication.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    logger.info(`Publication updated: ${publication.title} by ${req.admin.email}`);

    res.status(200).json({
      success: true,
      data: publication
    });
  } catch (error) {
    // Delete uploaded file if update fails
    if (req.file) {
      deleteFile(req.file.path);
    }
    
    logger.error('Update publication error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete publication
// @route   DELETE /api/publications/:id
// @access  Private
exports.deletePublication = async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id);

    if (!publication) {
      return res.status(404).json({
        success: false,
        message: 'Publication not found'
      });
    }

    // Delete associated file
    if (publication.pdfFile && publication.pdfFile.filename) {
      deleteFile(`uploads/documents/${publication.pdfFile.filename}`);
    }

    await Publication.findByIdAndDelete(req.params.id);

    logger.info(`Publication deleted: ${publication.title} by ${req.admin.email}`);

    res.status(200).json({
      success: true,
      message: 'Publication deleted successfully'
    });
  } catch (error) {
    logger.error('Delete publication error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get publication statistics
// @route   GET /api/publications/stats
// @access  Private
exports.getPublicationStats = async (req, res) => {
  try {
    const typeStats = await Publication.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 }
        }
      }
    ]);

    const fieldStats = await Publication.aggregate([
      {
        $group: {
          _id: '$field',
          count: { $sum: 1 }
        }
      }
    ]);

    const yearStats = await Publication.aggregate([
      {
        $group: {
          _id: '$year',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: -1 }
      },
      {
        $limit: 10
      }
    ]);

    const totalPublications = await Publication.countDocuments();
    const publishedPublications = await Publication.countDocuments({ status: 'published' });
    const featuredPublications = await Publication.countDocuments({ featured: true });

    res.status(200).json({
      success: true,
      data: {
        total: totalPublications,
        published: publishedPublications,
        featured: featuredPublications,
        typeBreakdown: typeStats,
        fieldBreakdown: fieldStats,
        yearBreakdown: yearStats
      }
    });
  } catch (error) {
    logger.error('Get publication stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get publications by year
// @route   GET /api/publications/by-year
// @access  Private
exports.getPublicationsByYear = async (req, res) => {
  try {
    const publications = await Publication.aggregate([
      {
        $match: { status: 'published' }
      },
      {
        $group: {
          _id: '$year',
          publications: {
            $push: {
              _id: '$_id',
              title: '$title',
              authors: '$authors',
              journal: '$journal',
              conference: '$conference',
              venue: '$venue',
              type: '$type',
              doi: '$doi',
              paperLink: '$paperLink',
              codeLink: '$codeLink',
              featured: '$featured'
            }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: -1 }
      }
    ]);

    res.status(200).json({
      success: true,
      data: publications
    });
  } catch (error) {
    logger.error('Get publications by year error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};