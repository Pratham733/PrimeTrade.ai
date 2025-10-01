import Task from '../models/Task.js';

export const createTask = async (req, res) => {
    const { title, description, status } = req.body;
    try {
        const task = await Task.create({ userId: req.user.id, title, description, status });
        res.status(201).json(task);
    } catch {
        res.status(400).json({ error: 'Task creation failed' });
    }
};

export const getTasks = async (req, res) => {
    const { q = '', status } = req.query;
    const filter = { userId: req.user.id };
    if (status) filter.status = status;
    if (q) filter.title = { $regex: q, $options: 'i' };

    try {
        const tasks = await Task.find(filter).sort({ createdAt: -1 });
        res.json(tasks);
    } catch {
        res.status(500).json({ error: 'Could not fetch tasks' });
    }
};

export const getTask = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });
        if (!task) return res.status(404).json({ error: 'Task not found' });
        res.json(task);
    } catch {
        res.status(500).json({ error: 'Could not fetch task' });
    }
};

export const updateTask = async (req, res) => {
    const { title, description, status } = req.body;
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            { $set: { title, description, status } },
            { new: true }
        );
        if (!task) return res.status(404).json({ error: 'Task not found' });
        res.json(task);
    } catch {
        res.status(400).json({ error: 'Task update failed' });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const deleted = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        if (!deleted) return res.status(404).json({ error: 'Task not found' });
        res.json({ message: 'Task deleted' });
    } catch {
        res.status(500).json({ error: 'Task deletion failed' });
    }
};