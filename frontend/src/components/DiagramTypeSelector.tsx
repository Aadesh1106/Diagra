// import { useState } from 'react'; // Removed - not used

export type DiagramTypeOption = 'CLASS' | 'SEQUENCE' | 'ACTIVITY' | 'USE_CASE' | 'STATE' | 'COMPONENT';

interface DiagramTypeSelectorProps {
  selected: DiagramTypeOption[];
  onChange: (types: DiagramTypeOption[]) => void;
}

const DIAGRAM_TYPES: { value: DiagramTypeOption; label: string; description: string }[] = [
  { value: 'CLASS', label: 'Class Diagram', description: 'Entities and relationships' },
  { value: 'SEQUENCE', label: 'Sequence Diagram', description: 'Interactions over time' },
  { value: 'ACTIVITY', label: 'Activity Diagram', description: 'Workflows and processes' },
  { value: 'USE_CASE', label: 'Use Case Diagram', description: 'User interactions' },
  { value: 'STATE', label: 'State Diagram', description: 'State transitions' },
  { value: 'COMPONENT', label: 'Component Diagram', description: 'System components' },
];

export default function DiagramTypeSelector({ selected, onChange }: DiagramTypeSelectorProps) {
  const toggleType = (type: DiagramTypeOption) => {
    if (selected.includes(type)) {
      onChange(selected.filter((t) => t !== type));
    } else {
      onChange([...selected, type]);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Select Diagram Types
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {DIAGRAM_TYPES.map((type) => (
          <label
            key={type.value}
            className={`
              flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all
              ${
                selected.includes(type.value)
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }
            `}
          >
            <input
              type="checkbox"
              checked={selected.includes(type.value)}
              onChange={() => toggleType(type.value)}
              className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <div className="ml-3">
              <div className="font-medium text-gray-900">{type.label}</div>
              <div className="text-sm text-gray-500">{type.description}</div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
