const ensureAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized. Please login via Google.' });
  }
  next();
};

module.exports = ensureAuth;
