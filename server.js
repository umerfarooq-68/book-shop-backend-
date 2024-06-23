
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const sequelize = require('./config/database');
const titlesRoutes = require('./routes/dashboard');
const auditLogger = require('./middleware/auditLogger');
const app = express();
const PORT = 5000;
// Middleware
app.use(bodyParser.json());
app.use(session({ secret: 'session_secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(auditLogger); 
// Routes
app.use('/titles', titlesRoutes);
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
// Start the server
sequelize.sync({ force: false}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
