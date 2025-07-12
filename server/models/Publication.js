const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [500, 'Title cannot exceed 500 characters']
  },
  authors: {
    type: String,
    required: [true, 'Authors are required'],
    trim: true
  },
  abstract: {
    type: String,
    maxlength: [3000, 'Abstract cannot exceed 3000 characters']
  },
  publicationDate: {
    type: Date,
    required: [true, 'Publication date is required']
  },
  journal: {
    type: String,
    trim: true,
    maxlength: [200, 'Journal name cannot exceed 200 characters']
  },
  conference: {
    type: String,
    trim: true,
    maxlength: [200, 'Conference name cannot exceed 200 characters']
  },
  venue: {
    type: String,
    trim: true,
    maxlength: [200, 'Venue cannot exceed 200 characters']
  },
  doi: {
    type: String,
    trim: true
  },
  paperLink: {
    type: String,
    trim: true
  },
  codeLink: {
    type: String,
    trim: true
  },
  pdfFile: {
    filename: String,
    originalName: String,
    mimetype: String,
    size: Number,
    url: String
  },
  type: {
    type: String,
    required: [true, 'Publication type is required'],
    enum: ['journal', 'conference', 'workshop', 'book', 'chapter', 'thesis', 'preprint']
  },
  field: {
    type: String,
    enum: ['multi-modal-learning', 'large-language-modelling', 'computer-architecture', 'distributed-computation', 'medical-image-analysis', 'other']
  },
  status: {
    type: String,
    enum: ['published', 'accepted', 'under-review', 'draft'],
    default: 'published'
  },
  featured: {
    type: Boolean,
    default: false
  },
  citations: {
    type: Number,
    default: 0
  },
  tags: [{
    type: String,
    trim: true
  }],
  year: {
    type: Number,
    required: [true, 'Year is required']
  },
  volume: String,
  issue: String,
  pages: String,
  publisher: String,
  isbn: String,
  issn: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp on save
publicationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  
  // Extract year from publication date
  if (this.publicationDate) {
    this.year = this.publicationDate.getFullYear();
  }
  
  next();
});

// Index for better query performance
publicationSchema.index({ year: -1, type: 1 });
publicationSchema.index({ field: 1, status: 1 });
publicationSchema.index({ featured: 1, status: 1 });
publicationSchema.index({ authors: 'text', title: 'text' });

module.exports = mongoose.model('Publication', publicationSchema);