const User = require('../models/User'); // adjust path as needed

exports.getUser = async (req, res) => {
  try {
    // req.user.id should be set by verifyToken middleware
    const user = await User.findById(req.user.id).select('username Gname');
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json({ username: user.username, Gname: user.Gname });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};