const Task = require('../models/Task');

const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks);
};

const createTask = async (req, res) => {
  const { title, description, status } = req.body;

  const task = new Task({
    title,
    description,
    status,
    user: req.user._id,
  });

  const createdTask = await task.save();
  res.status(201).json(createdTask);
};

const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task.user.toString() !== req.user._id.toString()) {
    res.status(401).json({ message: 'Not authorized' });
  }

  task.title = req.body.title || task.title;
  task.description = req.body.description || task.description;
  task.status = req.body.status || task.status;

  const updatedTask = await task.save();
  res.json(updatedTask);
};

const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404).json({ message: 'Task not found' });
    return;
  }

  if (task.user.toString() !== req.user._id.toString()) {
    res.status(401).json({ message: 'Not authorized' });
    return;
  }

  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task removed' });
};

module.exports = { getTasks, createTask, updateTask, deleteTask };