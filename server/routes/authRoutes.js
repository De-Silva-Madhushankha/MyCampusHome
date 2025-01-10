import express from 'express';
import passport from 'passport';

const router = express.Router();

// Initiate Google OAuth
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

// Google OAuth callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: true }),
  (req, res) => {
    // Successful authentication, redirect to frontend
    res.redirect('http://localhost:3000/'); // Replace with your frontend URL
  }
);

// Logout Route
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('http://localhost:3000/'); // Redirect to frontend after logout
  });
});

// Current User Route
router.get('/current_user', (req, res) => {
  res.send(req.user);
});

export default router;