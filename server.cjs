const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/college', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once('open', () => console.log('MongoDB connected'));

// Schema
const departmentSchema = new mongoose.Schema({
  name: String,
  code: String,
  head: String,
  description: String,
  establishedDate: String,
});
const Department = mongoose.model('Department', departmentSchema);

// Routes
app.get('/api/departments', async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch departments' });
  }
});

app.post('/api/departments', async (req, res) => {
  try {
    const newDept = new Department(req.body);
    await newDept.save();
    res.status(201).json({ message: 'Department created' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save department' });
  }
});

app.put('/api/departments/:id', async (req, res) => {
  try {
    await Department.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: 'Department updated' });
  } catch (err) {
    res.status(500).json({ error: 'Update failed' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
