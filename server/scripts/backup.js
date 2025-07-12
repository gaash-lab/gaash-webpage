const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

// Import models
const Admin = require('../models/Admin');
const News = require('../models/News');
const TeamMember = require('../models/TeamMember');
const Publication = require('../models/Publication');
const AuditLog = require('../models/AuditLog');

const createBackup = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Create backup directory
    const backupDir = path.join(__dirname, '../backups');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = path.join(backupDir, `backup-${timestamp}.json`);

    // Fetch all data
    console.log('Fetching data...');
    
    const [admins, news, teamMembers, publications, auditLogs] = await Promise.all([
      Admin.find().select('-password'),
      News.find().populate('author', 'username email'),
      TeamMember.find(),
      Publication.find(),
      AuditLog.find().populate('admin', 'username email')
    ]);

    // Create backup object
    const backup = {
      metadata: {
        createdAt: new Date(),
        version: '1.0.0',
        collections: {
          admins: admins.length,
          news: news.length,
          teamMembers: teamMembers.length,
          publications: publications.length,
          auditLogs: auditLogs.length
        }
      },
      data: {
        admins,
        news,
        teamMembers,
        publications,
        auditLogs
      }
    };

    // Write backup to file
    fs.writeFileSync(backupPath, JSON.stringify(backup, null, 2));

    console.log(`Backup created successfully: ${backupPath}`);
    console.log('Backup statistics:');
    console.log(`- Admins: ${admins.length}`);
    console.log(`- News: ${news.length}`);
    console.log(`- Team Members: ${teamMembers.length}`);
    console.log(`- Publications: ${publications.length}`);
    console.log(`- Audit Logs: ${auditLogs.length}`);

    // Clean up old backups (keep only last 10)
    const backupFiles = fs.readdirSync(backupDir)
      .filter(file => file.startsWith('backup-') && file.endsWith('.json'))
      .sort()
      .reverse();

    if (backupFiles.length > 10) {
      const filesToDelete = backupFiles.slice(10);
      filesToDelete.forEach(file => {
        fs.unlinkSync(path.join(backupDir, file));
        console.log(`Deleted old backup: ${file}`);
      });
    }

    process.exit(0);
  } catch (error) {
    console.error('Backup failed:', error);
    process.exit(1);
  }
};

// Run backup if called directly
if (require.main === module) {
  createBackup();
}

module.exports = createBackup;