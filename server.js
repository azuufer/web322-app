const express = require('express');
const path = require('path');
const storeService = require('./store-service'); // Assuming this provides similar functionality to legoData
const app = express();
const PORT = process.env.PORT || 8080;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine to EJS
app.set('view engine', 'ejs');

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', async (req, res) => {
  res.render('home'); // Ensure you have a home.ejs in the views directory
});

app.get('/about', async (req, res) => {
  res.render('about'); // Ensure you have an about.ejs in the views directory
});

app.get('/items/add', (req, res) => {
  res.render('addItem'); // Ensure you have addItem.ejs in the views directory
});

// Example of getting and rendering items
app.get('/items', async (req, res) => {
  try {
    const items = await storeService.getAllItems(); // Replace with actual service method
    res.render('items', { items }); // Ensure you have items.ejs in the views directory
  } catch (err) {
    res.status(500).render('500', { message: `Error fetching items: ${err}` });
  }
});

// POST route to handle form submission
app.post('/items/add', async (req, res) => {
  try {
    await storeService.addItem(req.body); // Replace with actual service method
    res.redirect('/items');
  } catch (err) {
    res.status(500).render('500', { message: `Error adding item: ${err}` });
  }
});

// Handle other routes
app.use((req, res, next) => {
  res.status(404).render('404', { message: "Page not found." });
});

// Initialize store service and start server
storeService.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error(`Failed to initialize store service: ${err}`);
  });
