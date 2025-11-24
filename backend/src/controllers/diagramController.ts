import { Request, Response, NextFunction } from 'express';
import diagramManagementService from '../services/diagramManagementService';
import diagramService from '../services/diagramService';
import prisma from '../db/prismaClient';
import { AppError } from '../middlewares/errorHandler';

export class DiagramController {
  async regenerate(req: Request, res: Response, next: NextFunction) {
    try {
      const { diagramId } = req.params;

      const newVersion = await diagramManagementService.regenerateDiagram(diagramId);

      res.json({
        success: true,
        data: newVersion,
      });
    } catch (error) {
      next(error);
    }
  }

  async getImage(req: Request, res: Response, next: NextFunction) {
    try {
      const { diagramId } = req.params;

      const diagram = await prisma.diagram.findUnique({
        where: { id: diagramId },
        include: { currentVersion: true },
      });

      if (!diagram || !diagram.currentVersion?.imageUrl) {
        throw new AppError('Diagram image not found', 404);
      }

      const filename = diagram.currentVersion.imageUrl.split('/').pop();
      if (!filename) {
        throw new AppError('Invalid image URL', 400);
      }

      const imageBuffer = await diagramService.getDiagramFile(filename);

      res.set('Content-Type', 'image/svg+xml');
      res.send(imageBuffer);
    } catch (error) {
      next(error);
    }
  }

  async getSource(req: Request, res: Response, next: NextFunction) {
    try {
      const { diagramId } = req.params;

      const diagram = await prisma.diagram.findUnique({
        where: { id: diagramId },
        include: { currentVersion: true },
      });

      if (!diagram || !diagram.currentVersion) {
        throw new AppError('Diagram not found', 404);
      }

      res.set('Content-Type', 'text/plain');
      res.set(
        'Content-Disposition',
        `attachment; filename="${diagram.title}.puml"`
      );
      res.send(diagram.currentVersion.dsl);
    } catch (error) {
      next(error);
    }
  }

  async getVersions(req: Request, res: Response, next: NextFunction) {
    try {
      const { diagramId } = req.params;

      const versions = await diagramManagementService.getDiagramVersions(diagramId);

      res.json({
        success: true,
        data: versions,
      });
    } catch (error) {
      next(error);
    }
  }

  async switchVersion(req: Request, res: Response, next: NextFunction) {
    try {
      const { diagramId, versionId } = req.params;

      const version = await diagramManagementService.switchDiagramVersion(
        diagramId,
        versionId
      );

      res.json({
        success: true,
        data: version,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new DiagramController();
