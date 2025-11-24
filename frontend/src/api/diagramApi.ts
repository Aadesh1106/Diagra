import { apiClient } from './client';

export interface DiagramVersion {
  id: string;
  versionNumber: number;
  dsl: string;
  imageUrl: string | null;
  createdAt: string;
}

export const diagramApi = {
  // Regenerate diagram
  async regenerateDiagram(projectId: string, diagramId: string): Promise<DiagramVersion> {
    const response = await apiClient.post<{ success: boolean; data: DiagramVersion }>(
      `/api/diagrams/projects/${projectId}/diagrams/${diagramId}/regenerate`
    );
    return response.data.data;
  },

  // Get diagram image URL
  getImageUrl(diagramId: string): string {
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    return `${baseUrl}/api/diagrams/${diagramId}/image`;
  },

  // Get diagram source URL
  getSourceUrl(diagramId: string): string {
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    return `${baseUrl}/api/diagrams/${diagramId}/source`;
  },

  // Get all versions
  async getVersions(diagramId: string): Promise<DiagramVersion[]> {
    const response = await apiClient.get<{ success: boolean; data: DiagramVersion[] }>(
      `/api/diagrams/${diagramId}/versions`
    );
    return response.data.data;
  },

  // Switch version
  async switchVersion(diagramId: string, versionId: string): Promise<DiagramVersion> {
    const response = await apiClient.put<{ success: boolean; data: DiagramVersion }>(
      `/api/diagrams/${diagramId}/versions/${versionId}`
    );
    return response.data.data;
  },
};
