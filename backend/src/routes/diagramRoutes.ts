import { Router } from 'express';
import diagramController from '../controllers/diagramController';

const router = Router();

// Regenerate a specific diagram
router.post(
  '/projects/:projectId/diagrams/:diagramId/regenerate',
  diagramController.regenerate
);

// Get diagram image
router.get('/:diagramId/image', diagramController.getImage);

// Get diagram source (DSL)
router.get('/:diagramId/source', diagramController.getSource);

// Get all versions of a diagram
router.get('/:diagramId/versions', diagramController.getVersions);

// Switch to a specific version
router.put('/:diagramId/versions/:versionId', diagramController.switchVersion);

export default router;
