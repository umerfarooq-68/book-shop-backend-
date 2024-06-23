// middleware/auditLogger.js
const fs = require('fs');
const path = require('path');
const logFile = path.join(__dirname, '../logs/audit.log');
const auditLogger = (req, res, next) => {
  const userId = req.user ? req.user.userId : 'Unknown';
  const logEntry = `${new Date().toISOString()} - ${req.method} ${req.originalUrl} - User ID: ${userId}\n`;
    fs.appendFile(logFile, logEntry, (err) => {
    if (err) {
      console.error('Failed to write log:', err);
    }
  });
  
  next();
};

module.exports = auditLogger;
