import prisma from '../db/prismaClient';
import llmService from './llmService';
import diagramService from './diagramService';
import { AppError } from '../middlewares/errorHandler';

export class DiagramManagementService {
  async regenerateDiagram(diagramId: string): Promise<{
    id: string;
    versionNumber: number;
    dsl: string;
    imageUrl: string | null;
  }> {
    // Fetch diagram with project and current version
    const diagram = await prisma.diagram.findUnique({
      where: { id: diagramId },
      include: {
        project: true,
        currentVersion: true,
        versions: {
          orderBy: { versionNumber: 'desc' },
          take: 1,
        },
      },
    });

    if (!diagram) {
      throw new AppError('Diagram not found', 404);
    }

    if (!diagram.currentVersion) {
      throw new AppError('No current version found for diagram', 400);
    }

    try {
      // Call LLM to regenerate diagram
      const regenerated = await llmService.regenerateDiagram(
        diagram.project.prompt,
        diagram.type,
        diagram.currentVersion.dsl
      );

      // Render new diagram
      let imageUrl: string | null = null;
      try {
        imageUrl = await diagramService.renderDiagram(regenerated.plantuml);
      } catch (renderError) {
        console.error('Failed to render regenerated diagram:', renderError);
      }

      // Get next version number
      const lastVersion = diagram.versions[0];
      const nextVersionNumber = lastVersion ? lastVersion.versionNumber + 1 : 1;

      // Create new version
      const newVersion = await prisma.diagramVersion.create({
        data: {
          diagramId: diagram.id,
          versionNumber: nextVersionNumber,
          dsl: regenerated.plantuml,
          imageUrl,
        },
      });

      // Update diagram current version
      await prisma.diagram.update({
        where: { id: diagram.id },
        data: {
          currentVersionId: newVersion.id,
          title: regenerated.title,
        },
      });

      return newVersion;
    } catch (error) {
      throw new AppError(
        `Failed to regenerate diagram: ${error instanceof Error ? error.message : 'Unknown error'}`,
        500
      );
    }
  }

  async getDiagramVersions(diagramId: string) {
    const versions = await prisma.diagramVersion.findMany({
      where: { diagramId },
      orderBy: { versionNumber: 'desc' },
    });

    return versions;
  }

  async switchDiagramVersion(diagramId: string, versionId: string) {
    const version = await prisma.diagramVersion.findUnique({
      where: { id: versionId },
    });

    if (!version || version.diagramId !== diagramId) {
      throw new AppError('Version not found', 404);
    }

    await prisma.diagram.update({
      where: { id: diagramId },
      data: { currentVersionId: versionId },
    });

    return version;
  }
}

export default new DiagramManagementService();
