// store-service.js

const fs = require('fs').promises;
const path = require('path');

let items = [];

async function initialize() {
  try {
    const data = await fs.readFile(path.join(__dirname, 'data/items.json'), 'utf8');
    items = JSON.parse(data);
    console.log('Items loaded successfully.');
  } catch (err) {
    console.error('Failed to load items:', err);
    throw err;
  }
}

async function getAllItems() {
  await initialize(); 
  return items;
}

async function getPublishedItems() {
  await initialize(); 
  return items.filter(item => item.published);
}

async function getCategories() {
  await initialize(); 
  const categories = new Set();
  items.forEach(item => {
    categories.add(item.category);
  });
  return Array.from(categories);
}

module.exports = {
  initialize,
  getAllItems,
  getPublishedItems,
  getCategories
};
