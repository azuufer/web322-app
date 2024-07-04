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
const storeService = require('./store-service');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve views
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

// API routes
app.get('/shop', async (req, res) => {
  try {
    const items = await storeService.getPublishedItems();
    res.json(items);
  } catch (err) {
    console.error('Error fetching published items:', err);
    res.status(500).json({ message: 'Failed to fetch published items' });
  }
});

app.get('/items', async (req, res) => {
  try {
    const items = await storeService.getAllItems();
    res.json(items);
  } catch (err) {
    console.error('Error fetching all items:', err);
    res.status(500).json({ message: 'Failed to fetch all items' });
  }
});

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
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

// Start the server
storeService.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Failed to initialize store service:', error);
  });
