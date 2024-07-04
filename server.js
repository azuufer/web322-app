/*************************************************************************
* WEB322 – Assignment 3
* I declare that this assignment is my own work in accordance with Seneca
* Academic Policy. No part of this assignment has been copied manually or
* electronically from any other source (including web sites) or
* distributed to other students.
*
* Name: [Janipan Sivaguru] Student ID: [109601237] Date: [July 3rd,2024]
* Vercel Web App URL:
* GitHub Repository URL: https://github.com/azuufer/web322-app
*
*************************************************************************/
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;
const storeService = require('./store-service');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Redirect root to /index.html
app.get('/', (req, res) => {
  res.redirect('/index.html');
});

// Serve index.html as the home page
app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

// Serve about.html
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/about.html'));
});

app.get('/shop', async (req, res) => {
  try {
    const items = await storeService.getPublishedItems();
    res.json(items);
  } catch (err) {
    console.error('Error fetching published items:', err);
    res.status(500).json({ message: 'Failed to fetch published items' });
  }
});

// Handle /items route
app.get('/items', async (req, res) => {
  try {
    const items = await storeService.getAllItems();
    res.json(items);
  } catch (err) {
    console.error('Error fetching all items:', err);
    res.status(500).json({ message: 'Failed to fetch all items' });
  }
});

// Handle /categories route
app.get('/categories', async (req, res) => {
  try {
    const categories = await storeService.getCategories();
    res.json(categories);
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ message: 'Failed to fetch categories' });
  }
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).send('Page Not Found');
});

// Initialize the store service and start the server
storeService.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Express http server listening on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Failed to initialize store service:', error);
  });
