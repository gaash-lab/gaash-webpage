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

const restoreBackup = async (backupFile) => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Check if backup file exists
    if (!fs.existsSync(backupFile)) {
      throw new Error(`Backup file not found: ${backupFile}`);
    }

    // Read backup file
    console.log('Reading backup file...');
    const backupData = JSON.parse(fs.readFileSync(backupFile, 'utf8'));

    if (!backupData.data) {
      throw new Error('Invalid backup file format');
    }

    console.log('Backup metadata:');
    console.log(`- Created: ${backupData.metadata.createdAt}`);
    console.log(`- Version: ${backupData.metadata.version}`);
    console.log('Collections:');
    Object.entries(backupData.metadata.collections).forEach(([key, count]) => {
      console.log(`  - ${key}: ${count} records`);
    });

    // Confirm restoration
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const answer = await new Promise(resolve => {
      readline.question('\nThis will replace all existing data. Continue? (yes/no): ', resolve);
    });

    readline.close();

    if (answer.toLowerCase() !== 'yes') {
      console.log('Restoration cancelled');
      process.exit(0);
    }

    // Clear existing data
    console.log('Clearing existing data...');
    await Promise.all([
      News.deleteMany({}),
      TeamMember.deleteMany({}),
      Publication.deleteMany({}),
      AuditLog.deleteMany({})
      // Note: We don't clear admins to prevent lockout
    ]);

    // Restore data
    console.log('Restoring data...');

    if (backupData.data.news && backupData.data.news.length > 0) {
      await News.insertMany(backupData.data.news);
      console.log(`Restored ${backupData.data.news.length} news articles`);
    }

    if (backupData.data.teamMembers && backupData.data.teamMembers.length > 0) {
      await TeamMember.insertMany(backupData.data.teamMembers);
      console.log(`Restored ${backupData.data.teamMembers.length} team members`);
    }

    if (backupData.data.publications && backupData.data.publications.length > 0) {
      await Publication.insertMany(backupData.data.publications);
      console.log(`Restored ${backupData.data.publications.length} publications`);
    }

    if (backupData.data.auditLogs && backupData.data.auditLogs.length > 0) {
      await AuditLog.insertMany(backupData.data.auditLogs);
      console.log(`Restored ${backupData.data.auditLogs.length} audit logs`);
    }

    console.log('Restoration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Restoration failed:', error);
    process.exit(1);
  }
};

// Get backup file from command line argument
const backupFile = process.argv[2];

if (!backupFile) {
  console.error('Usage: node restore.js <backup-file-path>');
  process.exit(1);
}

restoreBackup(backupFile);