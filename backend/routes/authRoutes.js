const express = require('express');
const passport = require('passport');
const router = express.Router();

// Login
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// Callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
  }
);

// Logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    req.session.destroy();
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
});

// Get current logged-in user
router.get('/current_user', (req, res) => {
  res.send(req.user);
});

module.exports = router;