// app.js

const express = require('express');
const path = require('path');
const app = express();

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for parsing JSON bodies
app.use(express.json());

// Error handling middleware
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Routes
app.get('/students', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'students.html'));
});

app.get('/students/:id', (req, res) => {
  // Assuming id is a number
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    // Handle invalid id
    const error = new Error('Invalid student id');
    error.status = 400;
    next(error);
  } else {
    res.sendFile(path.join(__dirname, 'public', 'student-details.html'));
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});