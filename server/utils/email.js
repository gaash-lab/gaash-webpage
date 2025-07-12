const nodemailer = require('nodemailer');
const logger = require('../config/logger');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Send email function
exports.sendEmail = async (options) => {
  try {
    const transporter = createTransporter();

    const message = {
      from: `${process.env.EMAIL_FROM || 'GAASH Lab Admin'} <${process.env.EMAIL_USER}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: options.html || options.message.replace(/\n/g, '<br>')
    };

    const info = await transporter.sendMail(message);
    
    logger.info(`Email sent to ${options.email}: ${info.messageId}`);
    return info;
  } catch (error) {
    logger.error('Email send error:', error);
    throw error;
  }
};

// Send HTML email
exports.sendHTMLEmail = async (options) => {
  try {
    const transporter = createTransporter();

    const message = {
      from: `${process.env.EMAIL_FROM || 'GAASH Lab Admin'} <${process.env.EMAIL_USER}>`,
      to: options.email,
      subject: options.subject,
      html: options.html,
      text: options.text || options.html.replace(/<[^>]*>/g, '') // Strip HTML for text version
    };

    const info = await transporter.sendMail(message);
    
    logger.info(`HTML email sent to ${options.email}: ${info.messageId}`);
    return info;
  } catch (error) {
    logger.error('HTML email send error:', error);
    throw error;
  }
};

// Verify email configuration
exports.verifyEmailConfig = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    logger.info('Email configuration verified successfully');
    return true;
  } catch (error) {
    logger.error('Email configuration verification failed:', error);
    return false;
  }
};