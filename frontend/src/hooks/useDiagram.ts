import { useMutation, useQueryClient } from '@tanstack/react-query';
import { diagramApi } from '../api/diagramApi';

export function useRegenerateDiagram() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId, diagramId }: { projectId: string; diagramId: string }) =>
      diagramApi.regenerateDiagram(projectId, diagramId),
    onSuccess: (_, variables) => {
      // Invalidate project query to refresh diagrams
      queryClient.invalidateQueries({ queryKey: ['project', variables.projectId] });
    },
  });
}
