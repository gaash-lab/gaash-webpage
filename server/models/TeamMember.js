const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  position: {
    type: String,
    required: [true, 'Position is required'],
    trim: true,
    maxlength: [100, 'Position cannot exceed 100 characters']
  },
  designation: {
    type: String,
    trim: true,
    maxlength: [100, 'Designation cannot exceed 100 characters']
  },
  university: {
    type: String,
    trim: true,
    maxlength: [200, 'University cannot exceed 200 characters']
  },
  bio: {
    type: String,
    maxlength: [2000, 'Bio cannot exceed 2000 characters']
  },
  profilePicture: {
    filename: String,
    originalName: String,
    mimetype: String,
    size: Number,
    url: String
  },
  email: {
    type: String,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  phone: {
    type: String,
    trim: true
  },
  socialMedia: {
    website: String,
    linkedin: String,
    github: String,
    scholar: String,
    twitter: String,
    orcid: String
  },
  type: {
    type: String,
    required: [true, 'Type is required'],
    enum: ['faculty', 'scholar', 'student', 'collaborator', 'staff']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  displayOrder: {
    type: Number,
    default: 0
  },
  researchInterests: [{
    type: String,
    trim: true
  }],
  education: [{
    degree: String,
    institution: String,
    year: String
  }],
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
teamMemberSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for better query performance
teamMemberSchema.index({ type: 1, displayOrder: 1 });
teamMemberSchema.index({ isActive: 1, type: 1 });

module.exports = mongoose.model('TeamMember', teamMemberSchema);