export const logout = (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ error: 'Failed to logout' });
    res.redirect('http://localhost:3000/'); // Redirect to frontend after logout
  });
};

export const currentUser = (req, res) => {
  res.json(req.user || null);
};