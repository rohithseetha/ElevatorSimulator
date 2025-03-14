import React from 'react';
import { Elevator } from '../types/elevator';
import { Clock, ArrowUpDown, Calendar } from 'lucide-react';

interface ElevatorStatsProps {
  elevator: Elevator;
}

export const ElevatorStats: React.FC<ElevatorStatsProps> = ({ elevator }) => {
  return (
    <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
      <div className="flex items-center gap-2">
        <ArrowUpDown className="w-4 h-4 text-green-500" />
        <span>Floors: {elevator.stats.floorsTraversed}</span>
      </div>
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-purple-500" />
        <span>{elevator.stats.operationalTime.toFixed(1)}h</span>
      </div>
      <div className="flex items-center gap-2 col-span-2">
        <Calendar className="w-4 h-4 text-orange-500" />
        <span>
          Last maintenance: {new Date(elevator.stats.lastMaintenance).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};