const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const connectDB = require('./config/db');

const app = express();

// Connect Database (with automatic fallback to in-memory Mongo if needed)
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static captcha assets if available locally
app.use('/captcha', express.static(path.join(__dirname, '../client/public/captcha')));

// API Routes
app.use('/api/applications', require('./routes/applicationRoutes'));
app.use('/api/captcha', require('./routes/captchaRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));
app.use('/api/demo', require('./routes/demoRoutes'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    system: 'CAPTCHA HELL™ Engine',
    tagline: 'You are human. We just don\'t believe you.',
    timestamp: new Date().toISOString()
  });
});

// Serve frontend in production
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`[CAPTCHA HELL Backend] Running on http://localhost:${PORT}`);
});
