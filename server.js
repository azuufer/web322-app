/*************************************************************************
* WEB322 – Assignment 3
* I declare that this assignment is my own work in accordance with Seneca
* Academic Policy. No part of this assignment has been copied manually or
* electronically from any other source (including web sites) or
* distributed to other students.
*
* Name: Janipan Sivaguru
* Student ID: 109601237
* Date: July 3rd, 2024
* Vercel Web App URL: [Your Vercel App URL]
* GitHub Repository URL: https://github.com/azuufer/web322-app
*
*************************************************************************/

const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

// Serve index.html as the home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Serve about.html
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
