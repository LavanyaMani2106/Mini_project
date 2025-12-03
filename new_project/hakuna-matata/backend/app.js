const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/auth');
const stressRoutes = require('./routes/stress');
const diaryRoutes = require('./routes/diary');
const chatbotRoutes = require('./routes/chatbot');
const sessionsRoutes = require('./routes/sessions');
const stressDataRoutes = require('./routes/stress-data');

const app = express();

// CORS configuration for production
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5000',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/stress', stressRoutes);
app.use('/api/diary', diaryRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/sessions', sessionsRoutes);
app.use('/api/stress-data', stressDataRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'Hakuna Matata API is running!',
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API Root endpoint
app.get('/api', (req, res) => {
  res.json({
    name: 'Hakuna Matata API',
    version: '1.0.0',
    description: 'AI-powered stress management platform',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      stress: '/api/stress',
      diary: '/api/diary',
      chatbot: '/api/chatbot',
      sessions: '/api/sessions',
      stressData: '/api/stress-data'
    }
  });
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the React app
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  // The "catchall" handler: for any request that doesn't
  // match one above, send back React's index.html file.
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
} else {
    app.get('/', (req, res) => {
        res.json({ 
            message: "Hakuna Matata API is running.",
            note: "Frontend is not served by backend in development mode. Use port 3000."
        });
    });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

module.exports = app;