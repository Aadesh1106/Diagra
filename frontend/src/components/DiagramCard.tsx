import { DiagramType } from '../api/projectApi';
import { diagramApi } from '../api/diagramApi';

interface DiagramCardProps {
  diagram: DiagramType;
  projectId: string;
  onRegenerate?: () => void;
}

export default function DiagramCard({ diagram, projectId: _projectId, onRegenerate }: DiagramCardProps) {
  const imageUrl = diagram.currentVersion?.imageUrl
    ? diagramApi.getImageUrl(diagram.id)
    : null;
  const sourceUrl = diagramApi.getSourceUrl(diagram.id);

  const handleDownloadImage = () => {
    if (imageUrl) {
      window.open(imageUrl, '_blank');
    }
  };

  const handleDownloadSource = () => {
    window.open(sourceUrl, '_blank');
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <span className="inline-block px-2 py-1 text-xs font-semibold text-primary-700 bg-primary-100 rounded">
              {diagram.type}
            </span>
            <h3 className="mt-2 text-lg font-semibold text-gray-900">
              {diagram.title}
            </h3>
          </div>
        </div>
      </div>

      <div className="p-4">
        {imageUrl ? (
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <img
              src={imageUrl}
              alt={diagram.title}
              className="w-full h-auto max-h-64 object-contain"
            />
          </div>
        ) : (
          <div className="bg-gray-100 rounded-lg p-8 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="mt-2 text-sm text-gray-500">Image not available</p>
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={onRegenerate}
            className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            Regenerate
          </button>
          <button
            onClick={handleDownloadImage}
            disabled={!imageUrl}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Download SVG
          </button>
          <button
            onClick={handleDownloadSource}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Download DSL
          </button>
        </div>
      </div>
    </div>
  );
}
