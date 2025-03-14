import React from 'react';
import { Settings } from 'lucide-react';
import { SystemConfig } from '../types/elevator';

interface ConfigDashboardProps {
  config: SystemConfig;
  onConfigChange: (newConfig: SystemConfig) => void;
}

export const ConfigDashboard: React.FC<ConfigDashboardProps> = ({
  config,
  onConfigChange,
}) => {
  const handleChange = (field: keyof SystemConfig, value: number) => {
    onConfigChange({
      ...config,
      [field]: value,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="w-6 h-6 text-blue-500" />
        <h2 className="text-xl font-semibold">System Configuration</h2>
      </div>

      <div className="grid gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Floors (2-10)
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="2"
              max="10"
              value={config.totalFloors}
              onChange={(e) => handleChange('totalFloors', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="w-12 text-center font-medium">{config.totalFloors}</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Elevators (1-10)
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="1"
              max="10"
              value={config.totalElevators}
              onChange={(e) => handleChange('totalElevators', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="w-12 text-center font-medium">{config.totalElevators}</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Floor Travel Time (seconds)
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="1"
              max="5"
              step="0.5"
              value={config.floorTravelTime}
              onChange={(e) => handleChange('floorTravelTime', parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="w-12 text-center font-medium">{config.floorTravelTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};