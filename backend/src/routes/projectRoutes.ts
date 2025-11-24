import { Router } from 'express';
import projectController from '../controllers/projectController';
import { optionalAuth } from '../middlewares/authMiddleware';

const router = Router();

// Create new project (auth optional for guest usage)
router.post(
  '/',
  optionalAuth,
  projectController.validateCreate,
  projectController.create
);

// Get all projects (filtered by user if authenticated)
router.get('/', optionalAuth, projectController.list);

// Get single project by ID
router.get('/:id', projectController.getById);

// Delete project
router.delete('/:id', optionalAuth, projectController.delete);

export default router;
