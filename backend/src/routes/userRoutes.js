import express from 'express';
import { body } from 'express-validator';
import { authMiddleware } from '../middleware/auth.js';
import { getProfile, updateProfile } from '../controllers/userController.js';
import { validationResult } from 'express-validator';

const router = express.Router();

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
};

router.get('/me', authMiddleware, getProfile);

router.put(
    '/me',
    authMiddleware,
    [body('name').optional().isLength({ min: 2 }), body('bio').optional().isLength({ max: 300 })],
    validate,
    updateProfile
);

export default router;