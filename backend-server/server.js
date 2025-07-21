const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

const app = express();

const allowedOrigins = [
  "https://leoai-nym8.onrender.com"
];

app.use(cors({
  origin: "https://leoai-nym8.onrender.com",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use('/api', require('./routes/authRoutes'));

app.listen(5000, () => {
  console.log('Backend server running on port 5000');
});
