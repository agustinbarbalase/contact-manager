module.exports = {
  isAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) return next();
    return res.redirect('/login');
  },
  isNotAuthenticated: (req, res, next) => {
    if (!req.isAuthenticated()) return next();
    return res.redirect('/contact');
  }
}