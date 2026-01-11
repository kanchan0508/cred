import express from 'express';
import Task from '../models/Task.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Get all tasks (with filters)
router.get('/', verifyToken, async (req, res) => {
  try {
    const { search, status } = req.query;
    let query = { userId: req.user.id };

    if (status && status !== 'all') {
      query.status = status;
    }

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    const tasks = await Task.find(query).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create task
router.post('/', verifyToken, async (req, res) => {
  try {
    const newTask = new Task({ ...req.body, userId: req.user.id });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update task
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete task
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Task has been deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
