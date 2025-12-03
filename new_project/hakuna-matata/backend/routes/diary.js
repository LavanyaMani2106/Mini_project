const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/diary.json');

// Helper to read data
const readData = () => {
  if (!fs.existsSync(DATA_FILE)) return [];
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading diary file:", error);
    return [];
  }
};

// Helper to write data
const writeData = (data) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing diary file:", error);
  }
};

// GET /:userId - Get all entries for a user
router.get('/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    const entries = readData();
    const userEntries = entries.filter(e => e.userId === userId);
    res.json(userEntries);
  } catch (error) {
    console.error("GET Error:", error);
    res.status(500).json({ message: 'Error reading diary entries' });
  }
});

// POST / - Create a new entry
router.post('/', (req, res) => {
  try {
    const { userId, date, content, mood, title, tags, stressLevel } = req.body;
    
    if (!userId || !date || !content) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const entries = readData();
    const newEntry = {
      userId,
      date,
      content,
      mood: mood || 'neutral',
      title: title || '',
      tags: tags || [],
      stressLevel: stressLevel || 0,
      timestamp: new Date().toISOString()
    };

    // Check if entry for this date already exists, update if so, or push new
    const existingIndex = entries.findIndex(e => e.userId === userId && e.date === date);
    if (existingIndex >= 0) {
      entries[existingIndex] = { ...entries[existingIndex], ...newEntry };
    } else {
      entries.push(newEntry);
    }

    writeData(entries);
    res.json(newEntry);
  } catch (error) {
    console.error("POST Error:", error);
    res.status(500).json({ message: 'Error saving diary entry' });
  }
});

// DELETE /:userId/:date - Delete an entry
router.delete('/:userId/:date', (req, res) => {
  try {
    const { userId, date } = req.params;
    let entries = readData();
    const initialLength = entries.length;
    entries = entries.filter(e => !(e.userId === userId && e.date === date));

    if (entries.length === initialLength) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    writeData(entries);
    res.json({ message: 'Entry deleted successfully' });
  } catch (error) {
    console.error("DELETE Error:", error);
    res.status(500).json({ message: 'Error deleting diary entry' });
  }
});

module.exports = router;