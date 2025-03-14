import React from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface FloorPanelProps {
  floor: number;
  onCallElevator: (direction: 'up' | 'down') => void;
}

export const FloorPanel: React.FC<FloorPanelProps> = ({ floor, onCallElevator }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <span className="text-lg font-medium">Floor {floor}</span>
      <div className="flex gap-2">
        {/* Show up arrow for all floors except the top floor */}
        {floor < (window as any).totalFloors - 1 && (
          <button
            onClick={() => onCallElevator('up')}
            className="p-2 rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}
        {/* Show down arrow for all floors except the ground floor */}
        {floor > 0 && (
          <button
            onClick={() => onCallElevator('down')}
            className="p-2 rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            <ArrowDown className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};