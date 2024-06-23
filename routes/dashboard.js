const express = require('express');
const winston = require('winston');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const titleController = require('../controllers/titleController');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const checkUserRole = require('../middleware/checkUserRole');
const fs = require('fs');
const path = require('path');
passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Incorrect password.' });
    }
  } catch (error) {
    return done(error);
  }
}));
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: path.join(__dirname, '../logs/audit.log') })
  ]
});
// Route for title upload with role-based authorization
router.post('/upload/title', checkUserRole('admin'), titleController.uploadTitle);
// Route for user registration
router.post('/register', titleController.registerUser);
// Route for user login
router.post('/login', passport.authenticate('local'), titleController.loginUser);
// Route for user dashboard (example)
router.get('/user/dashboard',titleController.getAllTitles );
// deleting users
router.delete('/users/:id', checkUserRole('admin'),titleController.deleteUser);
// deleting particular field data
router.patch('/books/:id/delete-fields',checkUserRole('admin'),titleController.deleteFieldsById);
// Route to fetch logs
router.get('/logs', checkUserRole('admin'), (req, res) => {
  const logFile = path.join(__dirname, '../logs/audit.log');
  fs.readFile(logFile, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Failed to read log file');
    }
    res.send(`<pre>${data}</pre>`);
  });
});

module.exports = router;