const News = require('../models/News');
const logger = require('../config/logger');
const { deleteFile, getFileUrl } = require('../middleware/upload');

// @desc    Get all news
// @route   GET /api/news
// @access  Private
exports.getNews = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    // Build query
    let query = {};
    
    if (req.query.status) {
      query.status = req.query.status;
    }
    
    if (req.query.category) {
      query.category = req.query.category;
    }
    
    if (req.query.search) {
      query.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { content: { $regex: req.query.search, $options: 'i' } }
      ];
    }
    
    // Sort options
    let sort = { createdAt: -1 };
    if (req.query.sort) {
      const sortField = req.query.sort.startsWith('-') ? req.query.sort.slice(1) : req.query.sort;
      const sortOrder = req.query.sort.startsWith('-') ? -1 : 1;
      sort = { [sortField]: sortOrder };
    }

    const news = await News.find(query)
      .populate('author', 'username email')
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await News.countDocuments(query);

    // Add file URLs
    const newsWithUrls = news.map(item => {
      const newsObj = item.toObject();
      if (newsObj.featuredImage && newsObj.featuredImage.filename) {
        newsObj.featuredImage.url = getFileUrl(req, newsObj.featuredImage.filename, 'images');
      }
      return newsObj;
    });

    res.status(200).json({
      success: true,
      count: news.length,
      total,
      pagination: {
        page,
        limit,
        pages: Math.ceil(total / limit)
      },
      data: newsWithUrls
    });
  } catch (error) {
    logger.error('Get news error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get single news
// @route   GET /api/news/:id
// @access  Private
exports.getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id).populate('author', 'username email');

    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News not found'
      });
    }

    // Add file URL
    const newsObj = news.toObject();
    if (newsObj.featuredImage && newsObj.featuredImage.filename) {
      newsObj.featuredImage.url = getFileUrl(req, newsObj.featuredImage.filename, 'images');
    }

    res.status(200).json({
      success: true,
      data: newsObj
    });
  } catch (error) {
    logger.error('Get news by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Create news
// @route   POST /api/news
// @access  Private
exports.createNews = async (req, res) => {
  try {
    // Add author to request body
    req.body.author = req.admin._id;

    // Handle file upload
    if (req.file) {
      req.body.featuredImage = {
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        url: getFileUrl(req, req.file.filename, 'images')
      };
    }

    const news = await News.create(req.body);
    await news.populate('author', 'username email');

    logger.info(`News created: ${news.title} by ${req.admin.email}`);

    res.status(201).json({
      success: true,
      data: news
    });
  } catch (error) {
    // Delete uploaded file if news creation fails
    if (req.file) {
      deleteFile(req.file.path);
    }
    
    logger.error('Create news error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update news
// @route   PUT /api/news/:id
// @access  Private
exports.updateNews = async (req, res) => {
  try {
    let news = await News.findById(req.params.id);

    if (!news) {
      // Delete uploaded file if news not found
      if (req.file) {
        deleteFile(req.file.path);
      }
      
      return res.status(404).json({
        success: false,
        message: 'News not found'
      });
    }

    // Handle file upload
    if (req.file) {
      // Delete old file if exists
      if (news.featuredImage && news.featuredImage.filename) {
        deleteFile(`uploads/images/${news.featuredImage.filename}`);
      }
      
      req.body.featuredImage = {
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        url: getFileUrl(req, req.file.filename, 'images')
      };
    }

    news = await News.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('author', 'username email');

    logger.info(`News updated: ${news.title} by ${req.admin.email}`);

    res.status(200).json({
      success: true,
      data: news
    });
  } catch (error) {
    // Delete uploaded file if update fails
    if (req.file) {
      deleteFile(req.file.path);
    }
    
    logger.error('Update news error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete news
// @route   DELETE /api/news/:id
// @access  Private
exports.deleteNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News not found'
      });
    }

    // Delete associated file
    if (news.featuredImage && news.featuredImage.filename) {
      deleteFile(`uploads/images/${news.featuredImage.filename}`);
    }

    await News.findByIdAndDelete(req.params.id);

    logger.info(`News deleted: ${news.title} by ${req.admin.email}`);

    res.status(200).json({
      success: true,
      message: 'News deleted successfully'
    });
  } catch (error) {
    logger.error('Delete news error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get news statistics
// @route   GET /api/news/stats
// @access  Private
exports.getNewsStats = async (req, res) => {
  try {
    const stats = await News.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const categoryStats = await News.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalNews = await News.countDocuments();
    const publishedNews = await News.countDocuments({ status: 'published' });
    const draftNews = await News.countDocuments({ status: 'draft' });
    const featuredNews = await News.countDocuments({ featured: true });

    res.status(200).json({
      success: true,
      data: {
        total: totalNews,
        published: publishedNews,
        draft: draftNews,
        featured: featuredNews,
        statusBreakdown: stats,
        categoryBreakdown: categoryStats
      }
    });
  } catch (error) {
    logger.error('Get news stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};