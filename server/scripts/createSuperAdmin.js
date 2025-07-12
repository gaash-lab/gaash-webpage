const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

// Import Admin model
const Admin = require('../models/Admin');

const createSuperAdmin = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Check if super admin already exists
    const existingSuperAdmin = await Admin.findOne({ role: 'super_admin' });
    
    if (existingSuperAdmin) {
      console.log('Super admin already exists:', existingSuperAdmin.email);
      process.exit(0);
    }

    // Create super admin
    const superAdminData = {
      username: 'superadmin',
      email: 'admin@gaash.nitsri.ac.in',
      password: 'SuperAdmin@123', // Change this to a secure password
      role: 'super_admin',
      isActive: true
    };

    const superAdmin = await Admin.create(superAdminData);

    console.log('Super admin created successfully:');
    console.log('Email:', superAdmin.email);
    console.log('Username:', superAdmin.username);
    console.log('Role:', superAdmin.role);
    console.log('\nIMPORTANT: Please change the default password after first login!');

    process.exit(0);
  } catch (error) {
    console.error('Error creating super admin:', error);
    process.exit(1);
  }
};

createSuperAdmin();