import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DiagramTypeSelector, { DiagramTypeOption } from '../components/DiagramTypeSelector';
import { useCreateProject } from '../hooks/useProject';

export default function PromptPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [prompt, setPrompt] = useState('');
  const [diagramTypes, setDiagramTypes] = useState<DiagramTypeOption[]>(['CLASS', 'SEQUENCE']);

  const createProjectMutation = useCreateProject();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !prompt.trim() || diagramTypes.length === 0) {
      alert('Please fill in all fields and select at least one diagram type');
      return;
    }

    try {
      const result = await createProjectMutation.mutateAsync({
        title: title.trim(),
        prompt: prompt.trim(),
        diagramTypes,
      });

      // Navigate to project detail page
      navigate(`/projects/${result.data.projectId}`);
    } catch (error) {
      console.error('Failed to create project:', error);
      alert('Failed to generate diagrams. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Natural Language to UML Generator
          </h1>
          <p className="text-lg text-gray-600">
            Describe your system and we'll generate comprehensive UML diagrams automatically
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 space-y-6">
          {/* Title Input */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Project Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Online Shopping System"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>

          {/* Prompt Input */}
          <div>
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
              System Description
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your system in detail. For example: 'Design an online shopping system where customers can browse products, add items to cart, checkout, and pay via credit card or UPI. Include user authentication, product catalog, order management, and payment processing.'"
              rows={8}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              required
            />
            <p className="mt-2 text-sm text-gray-500">
              Be as detailed as possible for better diagram generation
            </p>
          </div>

          {/* Diagram Type Selector */}
          <DiagramTypeSelector selected={diagramTypes} onChange={setDiagramTypes} />

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={createProjectMutation.isPending}
              className="w-full px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {createProjectMutation.isPending ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                  Generating UML Diagrams...
                </>
              ) : (
                'Generate UML Diagrams'
              )}
            </button>
          </div>
        </form>

        {/* Examples Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Example Prompts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-md transition-shadow"
                 onClick={() => setPrompt('Design an online bus ticket booking system where users can search for buses, view schedules, select seats, and book tickets with payment integration.')}>
              <h3 className="font-semibold text-gray-900">Bus Booking System</h3>
              <p className="text-sm text-gray-600 mt-1">
                Ticket booking with seat selection and payments
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-md transition-shadow"
                 onClick={() => setPrompt('Design a library management system with book catalog, member management, borrowing/returning books, fine calculation, and search functionality.')}>
              <h3 className="font-semibold text-gray-900">Library Management</h3>
              <p className="text-sm text-gray-600 mt-1">
                Book borrowing and member management
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
