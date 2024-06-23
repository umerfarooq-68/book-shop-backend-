const User = require('../models/User');
function checkUserRole(role) {
  return async (req, res, next) => {
    try {
      if (!req.isAuthenticated || !req.isAuthenticated()) {
        return res.status(401).json({ message: 'User is not authenticated' });
      }
      const userId = req.user && req.user.id;
      if (!userId) {
        return res.status(400).json({ error: 'User ID not provided' });
      }
      const user = await User.findByPk(userId);
      if (!user || user.role !== role) {
        return res.status(403).json({ error: 'Forbidden' });
      }
      next(); 
    } catch (error) {
      next(error);
    }
  };
}
module.exports = checkUserRole;
