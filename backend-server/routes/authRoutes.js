const express = require('express');
const router = express.Router();
const auth = require('../controller/authControllers');
const { getUser } = require('../controller/userController');
const verifyToken = require("../middleware/verifyToken");
const Recent = require('../models/Recent');

router.get("/userinfo", verifyToken, getUser); // 👈 this protects the route


router.post('/signup', auth.signup);
router.post('/login', auth.login);
router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'lax',
    secure: false, // true if using HTTPS
  });
  res.json({ message: "Logged out" });
});
router.get('/userinfo', auth.getUserInfo);

// Save a recent chat
router.post('/recents', verifyToken, async (req, res) => {
  try {
    const { chat } = req.body;
    const recent = new Recent({ userId: req.user.id, chat });
    await recent.save();
    res.json({ message: 'Recent saved' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get recents for current user
router.get('/recents', verifyToken, async (req, res) => {
  try {
    const recents = await Recent.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(recents);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;

