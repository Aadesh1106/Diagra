import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import projectService from '../services/projectService';
import { AppError } from '../middlewares/errorHandler';
import { AuthRequest } from '../middlewares/authMiddleware';
import { DiagramType } from '@prisma/client';

export class ProjectController {
  // Validation rules
  validateCreate = [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('prompt').trim().notEmpty().withMessage('Prompt is required'),
    body('diagramTypes')
      .isArray({ min: 1 })
      .withMessage('At least one diagram type is required'),
    body('diagramTypes.*')
      .isIn(['CLASS', 'SEQUENCE', 'ACTIVITY', 'USE_CASE', 'STATE', 'COMPONENT'])
      .withMessage('Invalid diagram type'),
  ];

  async create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new AppError(errors.array()[0].msg, 400);
      }

      const { title, prompt, diagramTypes } = req.body;
      const userId = req.userId; // From auth middleware (optional)

      const project = await projectService.createProject({
        title,
        prompt,
        diagramTypes: diagramTypes as DiagramType[],
        userId,
      });

      res.status(201).json({
        success: true,
        data: {
          projectId: project.id,
          status: project.status,
          diagrams: project.diagrams.map((d) => ({
            id: d.id,
            type: d.type,
            title: d.title,
            currentVersionId: d.currentVersion?.id,
          })),
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const project = await projectService.getProjectById(id);

      res.json({
        success: true,
        data: project,
      });
    } catch (error) {
      next(error);
    }
  }

  async list(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.userId;
      const projects = await projectService.listProjects(userId);

      res.json({
        success: true,
        data: projects,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = req.userId;

      await projectService.deleteProject(id, userId);

      res.json({
        success: true,
        message: 'Project deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new ProjectController();
