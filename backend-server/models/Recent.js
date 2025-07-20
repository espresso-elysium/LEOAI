const mongoose = require('mongoose');

const RecentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  chat: { type: Array, required: true }, // or use a more specific schema if you have one
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Recent', RecentSchema);
