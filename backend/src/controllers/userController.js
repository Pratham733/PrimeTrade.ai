import User from '../models/User.js';

export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('name email bio');
        res.json(user);
    } catch {
        res.status(500).json({ error: 'Could not fetch profile' });
    }
};

export const updateProfile = async (req, res) => {
    const { name, bio } = req.body;
    try {
        const updated = await User.findByIdAndUpdate(
            req.user.id,
            { $set: { name, bio } },
            { new: true }
        ).select('name email bio');

        res.json(updated);
    } catch {
        res.status(500).json({ error: 'Could not update profile' });
    }
};