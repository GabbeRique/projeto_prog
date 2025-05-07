const express = require('express');
const jsonServer = require('json-server');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Create JSON Server
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Set up API routes
app.use('/api', middlewares, router);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// All other routes should redirect to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});