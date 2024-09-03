const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/webapp', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a schema for our data
const DataSchema = new mongoose.Schema({
  text: String,
  number: Number
});

// Create a model based on the schema
const Data = mongoose.model('Data', DataSchema);

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Route to handle form submission
app.post('/api/data', async (req, res) => {
  try {
    const { text, number } = req.body;
    const newData = new Data({ text, number });
    await newData.save();
    res.status(201).json({ message: 'Data saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving data' });
  }
});

// Route to get all data
app.get('/api/data', async (req, res) => {
  try {
    const allData = await Data.find();
    res.status(200).json(allData);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving data' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
