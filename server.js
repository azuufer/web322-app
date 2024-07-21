const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;
const storeService = require('./store-service');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Redirect root to /index.html
app.get('/', (req, res) => {
  res.redirect('/index.html');
});

// Serve index.html as the home page
app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Serve about.html
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/about.html'));
});

// Serve shop.html
app.get('/shop', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/shop.html'));
});

// Serve items.html
app.get('/items', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/items.html'));
});

// Serve categories.html
app.get('/categories', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/categories.html'));
});

// Serve addItem.html for /items/add route
app.get('/items/add', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/addItem.html'));
});

// Handle /shop route to get items
app.get('/api/shop', async (req, res) => {
  try {
    const items = await storeService.getPublishedItems();
    res.json(items);
  } catch (err) {
    console.error('Error fetching published items:', err);
    res.status(500).json({ message: 'Failed to fetch published items' });
  }
});

// Handle /items route to get all items
app.get('/api/items', async (req, res) => {
  try {
    const items = await storeService.getAllItems();
    res.json(items);
  } catch (err) {
    console.error('Error fetching all items:', err);
    res.status(500).json({ message: 'Failed to fetch all items' });
  }
});

// Handle /categories route to get categories
app.get('/api/categories', async (req, res) => {
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
