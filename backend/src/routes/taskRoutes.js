import express from 'express';
import { body, param } from 'express-validator';
import { authMiddleware } from '../middleware/auth.js';
import { createTask, getTasks, getTask, updateTask, deleteTask } from '../controllers/taskController.js';
import { validationResult } from 'express-validator';

const router = express.Router();

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
};

router.post(
    '/',
    authMiddleware,
    [
        body('title').isLength({ min: 1 }).withMessage('Title required'),
        body('description').optional().isString(),
        body('status').optional().isIn(['todo', 'in-progress', 'done'])
    ],
    validate,
    createTask
);

router.get('/', authMiddleware, getTasks);

router.get('/:id', authMiddleware, [param('id').isMongoId()], validate, getTask);

router.put(
    '/:id',
    authMiddleware,
    [
        param('id').isMongoId(),
        body('title').optional().isLength({ min: 1 }),
        body('description').optional().isString(),
        body('status').optional().isIn(['todo', 'in-progress', 'done'])
    ],
    validate,
    updateTask
);

router.delete('/:id', authMiddleware, [param('id').isMongoId()], validate, deleteTask);

export default router;