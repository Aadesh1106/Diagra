import { useParams } from 'react-router-dom';
import { useProject } from '../hooks/useProject';
import { useRegenerateDiagram } from '../hooks/useDiagram';
import DiagramCard from '../components/DiagramCard';
import Navbar from '../components/Navbar';

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: project, isLoading, error } = useProject(id!);
  const regenerateMutation = useRegenerateDiagram();

  const handleRegenerate = (diagramId: string) => {
    if (!id) return;
    
    regenerateMutation.mutate(
      { projectId: id, diagramId },
      {
        onSuccess: () => {
          alert('Diagram regenerated successfully!');
        },
        onError: () => {
          alert('Failed to regenerate diagram. Please try again.');
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <svg
              className="animate-spin h-12 w-12 text-primary-600 mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <p className="mt-4 text-gray-600">Loading project...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-red-800 mb-2">Error Loading Project</h2>
            <p className="text-red-600">
              {error instanceof Error ? error.message : 'Project not found'}
            </p>
            <a
              href="/"
              className="mt-4 inline-block px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Project Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {project.title}
              </h1>
              <div className="flex items-center space-x-4">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    project.status === 'DONE'
                      ? 'bg-green-100 text-green-800'
                      : project.status === 'ERROR'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {project.status}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(project.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            <a
              href="/"
              className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← Back
            </a>
          </div>
          
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">System Description:</h3>
            <p className="text-gray-700">{project.prompt}</p>
          </div>

          {project.errorMessage && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700">
                <strong>Error:</strong> {project.errorMessage}
              </p>
            </div>
          )}
        </div>

        {/* Diagrams Grid */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Generated Diagrams ({project.diagrams.length})
          </h2>
        </div>

        {project.diagrams.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {project.diagrams.map((diagram) => (
              <DiagramCard
                key={diagram.id}
                diagram={diagram}
                projectId={project.id}
                onRegenerate={() => handleRegenerate(diagram.id)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <svg
              className="mx-auto h-16 w-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No diagrams yet</h3>
            <p className="mt-2 text-gray-500">
              Diagrams are being generated. Please refresh the page.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
