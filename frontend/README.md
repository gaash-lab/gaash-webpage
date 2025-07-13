# GAASH Lab - Secure Admin Backend System

A comprehensive secure admin backend system for the GAASH Lab website with authentication, content management, and audit logging capabilities.

## 🚀 Features

### Authentication & Security
- ✅ Secure JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ Rate limiting for login attempts
- ✅ Account lockout after failed attempts
- ✅ Password reset functionality
- ✅ CSRF protection
- ✅ XSS protection
- ✅ SQL injection prevention
- ✅ Secure HTTP headers
- ✅ Session management

### Content Management
- ✅ **News Management**: Create, edit, delete news articles with rich text editor
- ✅ **Team Member Management**: Manage team profiles with image uploads
- ✅ **Publications Management**: Handle research papers and publications
- ✅ **File Upload Security**: Validated image and document uploads
- ✅ **Role-based Access Control**: Different permission levels

### Admin Dashboard
- ✅ Real-time statistics and analytics
- ✅ Interactive charts and graphs
- ✅ Recent activity monitoring
- ✅ Mobile-responsive interface
- ✅ Audit log viewing

### Security & Monitoring
- ✅ Comprehensive audit logging
- ✅ Failed login attempt tracking
- ✅ Data export functionality
- ✅ Database backup system
- ✅ Error logging and monitoring

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## 🛠️ Installation & Setup

### 1. Clone and Install Dependencies

```bash
# Install backend dependencies
cd server
npm install

# Install admin dashboard dependencies
cd ../admin-dashboard
npm install
```

### 2. Environment Configuration

Create a `.env` file in the `server` directory:

```bash
cp server/.env.example server/.env
```

Update the `.env` file with your configuration:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/gaash_admin

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_make_it_very_long_and_random
JWT_EXPIRE=7d
JWT_COOKIE_EXPIRE=7

# Session Configuration
SESSION_SECRET=your_super_secret_session_key_here

# Email Configuration (for password reset)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=noreply@gaash.nitsri.ac.in

# File Upload Configuration
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads

# Security
BCRYPT_ROUNDS=12
MAX_LOGIN_ATTEMPTS=5
LOCKOUT_TIME=900000

# Frontend URLs
FRONTEND_URL=http://localhost:3000
ADMIN_URL=http://localhost:3001
```

### 3. Database Setup

Start MongoDB and create the initial super admin:

```bash
cd server
node scripts/createSuperAdmin.js
```

Default super admin credentials:
- **Email**: admin@gaash.nitsri.ac.in
- **Password**: SuperAdmin@123
- **Role**: super_admin

⚠️ **Important**: Change the default password after first login!

### 4. Start the Application

#### Development Mode (Recommended)

```bash
# Start both backend and admin dashboard
cd server
npm run dev-full
```

This will start:
- Backend server on `http://localhost:5000`
- Admin dashboard on `http://localhost:3001`

#### Production Mode

```bash
# Start backend
cd server
npm start

# Start admin dashboard (in another terminal)
cd admin-dashboard
npm run build
npm start
```

## 🔐 Security Features

### Authentication
- JWT tokens with secure HTTP-only cookies
- Password complexity requirements
- Account lockout after 5 failed attempts
- Password reset via email

### Data Protection
- Input validation and sanitization
- MongoDB injection prevention
- XSS attack prevention
- CSRF token protection
- File upload validation

### Monitoring
- Comprehensive audit logging
- Failed login tracking
- Rate limiting on all endpoints
- Security headers (Helmet.js)

## 📊 Admin Dashboard Features

### Dashboard Overview
- Real-time statistics
- Monthly activity charts
- Content status overview
- Recent activities feed

### Content Management
- **News**: Rich text editor, image uploads, categories, publishing status
- **Team**: Profile management, social media links, role assignments
- **Publications**: Research paper management, file uploads, categorization

### User Management
- Admin user creation (Super Admin only)
- Role-based permissions
- Account status management

### System Monitoring
- Audit log viewer
- System statistics
- Data export functionality

## 🗄️ Database Backup & Restore

### Create Backup

```bash
cd server
node scripts/backup.js
```

Backups are stored in `server/backups/` directory.

### Restore Backup

```bash
cd server
node scripts/restore.js path/to/backup-file.json
```

## 📝 API Documentation

### Authentication Endpoints

```
POST /api/auth/login          - Admin login
POST /api/auth/logout         - Admin logout
GET  /api/auth/me            - Get current admin info
POST /api/auth/forgotpassword - Request password reset
PUT  /api/auth/resetpassword/:token - Reset password
PUT  /api/auth/updatepassword - Update password
POST /api/auth/register      - Create new admin (Super Admin only)
```

### Content Management Endpoints

```
# News
GET    /api/news             - Get all news
POST   /api/news             - Create news
GET    /api/news/:id         - Get news by ID
PUT    /api/news/:id         - Update news
DELETE /api/news/:id         - Delete news

# Team
GET    /api/team             - Get all team members
POST   /api/team             - Create team member
GET    /api/team/:id         - Get team member by ID
PUT    /api/team/:id         - Update team member
DELETE /api/team/:id         - Delete team member
PUT    /api/team/reorder     - Reorder team members

# Publications
GET    /api/publications     - Get all publications
POST   /api/publications     - Create publication
GET    /api/publications/:id - Get publication by ID
PUT    /api/publications/:id - Update publication
DELETE /api/publications/:id - Delete publication
```

### Dashboard Endpoints

```
GET /api/dashboard/overview     - Dashboard overview data
GET /api/dashboard/system-stats - System statistics (Super Admin)
GET /api/dashboard/audit-logs   - Audit logs
GET /api/dashboard/export/:type - Export data (Super Admin)
```

## 🔧 Configuration Options

### File Upload Limits
- Maximum file size: 5MB (configurable)
- Allowed image types: JPEG, JPG, PNG, GIF, WebP
- Allowed document types: PDF, DOC, DOCX

### Rate Limiting
- General API: 100 requests per 15 minutes
- Authentication: 5 requests per 15 minutes
- File uploads: 20 requests per 15 minutes

### Security Settings
- Password requirements: 8+ characters, uppercase, lowercase, number, special character
- JWT expiration: 7 days (configurable)
- Session timeout: 24 hours
- Account lockout: 15 minutes after 5 failed attempts

## 🚀 Deployment

### Production Checklist

1. **Environment Variables**
   - Set `NODE_ENV=production`
   - Use strong, unique secrets
   - Configure production database
   - Set up email service

2. **Security**
   - Enable HTTPS
   - Configure firewall
   - Set up monitoring
   - Regular security updates

3. **Database**
   - Set up MongoDB replica set
   - Configure automated backups
   - Monitor performance

4. **Monitoring**
   - Set up log aggregation
   - Configure alerts
   - Monitor system resources

### Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up -d
```

## 🔍 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `.env`
   - Verify network connectivity

2. **Email Not Sending**
   - Check email configuration
   - Verify SMTP credentials
   - Check firewall settings

3. **File Upload Errors**
   - Check file size limits
   - Verify upload directory permissions
   - Ensure allowed file types

4. **Authentication Issues**
   - Clear browser cookies
   - Check JWT secret configuration
   - Verify token expiration settings

### Logs

- Application logs: `server/logs/`
- Error logs: `server/logs/error.log`
- Audit logs: Database collection `auditlogs`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Support

For support and questions:
- Email: janibbashir@nitsri.ac.in
- Create an issue in the repository

## 🔄 Updates & Maintenance

### Regular Maintenance Tasks

1. **Weekly**
   - Review audit logs
   - Check system performance
   - Update dependencies

2. **Monthly**
   - Database backup verification
   - Security audit
   - Performance optimization

3. **Quarterly**
   - Security updates
   - Feature updates
   - Documentation updates

---

**GAASH Lab Admin System** - Secure, scalable, and feature-rich content management for academic research labs.