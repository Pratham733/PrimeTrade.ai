import express from 'express';
import { body } from 'express-validator';
import { register, login } from '../controllers/authController.js';
import { validationResult } from 'express-validator';

const router = express.Router();

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
};

router.post(
    '/register',
    [
        body('name').isLength({ min: 2 }).withMessage('Name is too short'),
        body('email').isEmail().withMessage('Invalid email'),
        body('password').isLength({ min: 6 }).withMessage('Password must be 6+ chars')
    ],
    validate,
    register
);

router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Invalid email'),
        body('password').isLength({ min: 6 }).withMessage('Password must be 6+ chars')
    ],
    validate,
    login
);

export default router;