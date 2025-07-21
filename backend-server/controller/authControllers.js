const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({ username, email, password: hashed });
    res.status(201).json({ message: "User created" });
  } catch (err) {
    res.status(400).json({ error: "Email already exists" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ error: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ error: "Wrong password" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'None', // or 'none' if using HTTPS
    secure: true,   // true if using HTTPS
  });
  res.json({ message: "Login successful", username: user.username });
};

exports.getUserInfo = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    res.json({ username: user.username });
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};
