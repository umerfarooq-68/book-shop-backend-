const fs = require('fs');
const path = require('path');
const logFile = path.join(__dirname, '../logs/audit.log');
const logger = (req, res, next) => {
  const logEntry = `${new Date().toISOString()} - ${req.method} ${req.originalUrl} - User: ${req.user ? req.user.username : 'Unknown'}\n`;
  fs.appendFile(logFile, logEntry, (err) => {
    if (err) {
      console.error('Failed to write log:', err);
    }
  });
  next();
};

module.exports = logger;
