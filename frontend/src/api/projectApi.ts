import { apiClient } from './client';

export interface DiagramType {
  id: string;
  type: 'CLASS' | 'SEQUENCE' | 'ACTIVITY' | 'USE_CASE' | 'STATE' | 'COMPONENT';
  title: string;
  currentVersion?: {
    id: string;
    versionNumber: number;
    dsl: string;
    imageUrl: string | null;
  } | null;
}

export interface Project {
  id: string;
  title: string;
  prompt: string;
  status: 'PENDING' | 'DONE' | 'ERROR';
  errorMessage?: string | null;
  createdAt: string;
  updatedAt: string;
  diagrams: DiagramType[];
}

export interface CreateProjectRequest {
  title: string;
  prompt: string;
  diagramTypes: string[];
}

export interface CreateProjectResponse {
  success: boolean;
  data: {
    projectId: string;
    status: string;
    diagrams: Array<{
      id: string;
      type: string;
      title: string;
      currentVersionId?: string;
    }>;
  };
}

export const projectApi = {
  // Create new project
  async createProject(data: CreateProjectRequest): Promise<CreateProjectResponse> {
    const response = await apiClient.post<CreateProjectResponse>('/api/projects', data);
    return response.data;
  },

  // Get all projects
  async getProjects(): Promise<Project[]> {
    const response = await apiClient.get<{ success: boolean; data: Project[] }>(
      '/api/projects'
    );
    return response.data.data;
  },

  // Get single project
  async getProjectById(id: string): Promise<Project> {
    const response = await apiClient.get<{ success: boolean; data: Project }>(
      `/api/projects/${id}`
    );
    return response.data.data;
  },

  // Delete project
  async deleteProject(id: string): Promise<void> {
    await apiClient.delete(`/api/projects/${id}`);
  },
};
