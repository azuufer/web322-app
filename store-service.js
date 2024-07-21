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

async function addItem(itemData) {
  return new Promise(async (resolve, reject) => {
    try {
      // Ensure the items are initialized
      await initialize();
      
      // Set the published property
      itemData.published = itemData.published !== undefined ? itemData.published : false;

      // Set the id property
      itemData.id = items.length + 1;

      // Push the new item into the items array
      items.push(itemData);

      // Save the updated items array to the JSON file
      await fs.writeFile(path.join(__dirname, 'data/items.json'), JSON.stringify(items, null, 2), 'utf8');

      // Resolve the promise with the new item data
      resolve(itemData);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  initialize,
  getAllItems,
  getPublishedItems,
  getCategories,
  addItem // Export the addItem function
};
