const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const stressRoutes = require('./routes/stress');
const diaryRoutes = require('./routes/diary');
const chatbotRoutes = require('./routes/chatbot');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/stress', stressRoutes);
app.use('/api/diary', diaryRoutes);
app.use('/api/chatbot', chatbotRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'Hakuna Matata API is running!' });
});

module.exports = app;