import React from 'react';
import { ArrowDown, ArrowUp, Minus } from 'lucide-react';
import { Elevator } from '../types/elevator';

interface ElevatorShaftProps {
  elevator: Elevator;
  onFloorSelect: (floor: number) => void;
}

export const ElevatorShaft: React.FC<ElevatorShaftProps> = ({ 
  elevator, 
  onFloorSelect 
}) => {
  const DirectionIcon = () => {
    switch (elevator.direction) {
      case 'up':
        return <ArrowUp className="w-4 h-4" />;
      case 'down':
        return <ArrowDown className="w-4 h-4" />;
      default:
        return <Minus className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Elevator {elevator.id + 1}</h3>
      <div className="flex items-center gap-2 mb-4">
        <span>Floor {elevator.currentFloor}</span>
        <DirectionIcon />
      </div>
      <div className="grid grid-cols-2 gap-2">
        {[...Array(6)].map((_, floor) => (
          <button
            key={floor}
            onClick={() => onFloorSelect(floor)}
            className={`px-4 py-2 rounded ${
              elevator.currentFloor === floor
                ? 'bg-blue-500 text-white'
                : 'bg-white hover:bg-gray-200'
            }`}
          >
            {floor}
          </button>
        ))}
      </div>
    </div>
  );
};