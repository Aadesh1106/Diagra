import prisma from '../db/prismaClient';
import llmService from './llmService';
import diagramService from './diagramService';
import { AppError } from '../middlewares/errorHandler';
import { DiagramType, ProjectStatus } from '@prisma/client';

export interface CreateProjectInput {
  title: string;
  prompt: string;
  diagramTypes: DiagramType[];
  userId?: string;
}

export interface ProjectWithDiagrams {
  id: string;
  title: string;
  prompt: string;
  status: ProjectStatus;
  errorMessage: string | null;
  createdAt: Date;
  updatedAt: Date;
  diagrams: Array<{
    id: string;
    type: DiagramType;
    title: string;
    currentVersion: {
      id: string;
      versionNumber: number;
      dsl: string;
      imageUrl: string | null;
    } | null;
  }>;
}

export class ProjectService {
  async createProject(input: CreateProjectInput): Promise<ProjectWithDiagrams> {
    // Create project with PENDING status
    const project = await prisma.project.create({
      data: {
        title: input.title,
        prompt: input.prompt,
        userId: input.userId,
        status: 'PENDING',
      },
    });

    try {
      // Call LLM to generate diagrams
      const llmResponse = await llmService.generateDiagrams(
        input.prompt,
        input.diagramTypes
      );

      // Process each diagram
      for (const diagramData of llmResponse.diagrams) {
        // Create diagram entry
        const diagram = await prisma.diagram.create({
          data: {
            projectId: project.id,
            type: diagramData.type as DiagramType,
            title: diagramData.title,
          },
        });

        try {
          // Render diagram to image
          const imageUrl = await diagramService.renderDiagram(diagramData.plantuml);

          // Create diagram version
          const version = await prisma.diagramVersion.create({
            data: {
              diagramId: diagram.id,
              versionNumber: 1,
              dsl: diagramData.plantuml,
              imageUrl,
            },
          });

          // Update diagram to reference current version
          await prisma.diagram.update({
            where: { id: diagram.id },
            data: { currentVersionId: version.id },
          });
        } catch (renderError) {
          // If rendering fails, still save the DSL
          await prisma.diagramVersion.create({
            data: {
              diagramId: diagram.id,
              versionNumber: 1,
              dsl: diagramData.plantuml,
              imageUrl: null,
            },
          });

          console.error(`Failed to render diagram ${diagram.id}:`, renderError);
        }
      }

      // Update project status to DONE
      await prisma.project.update({
        where: { id: project.id },
        data: { status: 'DONE' },
      });

      return this.getProjectById(project.id);
    } catch (error) {
      // Update project status to ERROR
      await prisma.project.update({
        where: { id: project.id },
        data: {
          status: 'ERROR',
          errorMessage: error instanceof Error ? error.message : 'Unknown error',
        },
      });

      throw new AppError('Failed to generate diagrams', 500);
    }
  }

  async getProjectById(projectId: string): Promise<ProjectWithDiagrams> {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        diagrams: {
          include: {
            currentVersion: true,
          },
        },
      },
    });

    if (!project) {
      throw new AppError('Project not found', 404);
    }

    return project as ProjectWithDiagrams;
  }

  async listProjects(userId?: string): Promise<ProjectWithDiagrams[]> {
    const projects = await prisma.project.findMany({
      where: userId ? { userId } : {},
      include: {
        diagrams: {
          include: {
            currentVersion: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return projects as ProjectWithDiagrams[];
  }

  async deleteProject(projectId: string, userId?: string): Promise<void> {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        diagrams: {
          include: {
            versions: true,
          },
        },
      },
    });

    if (!project) {
      throw new AppError('Project not found', 404);
    }

    if (userId && project.userId !== userId) {
      throw new AppError('Unauthorized', 403);
    }

    // Delete diagram files
    for (const diagram of project.diagrams) {
      for (const version of diagram.versions) {
        if (version.imageUrl) {
          await diagramService.deleteDiagramFile(version.imageUrl);
        }
      }
    }

    // Delete project (cascade will delete diagrams and versions)
    await prisma.project.delete({
      where: { id: projectId },
    });
  }
}

export default new ProjectService();
