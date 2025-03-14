import React, { useEffect, useState } from 'react';
import { useElevatorSystem } from './hooks/useElevatorSystem';
import { ElevatorCanvas } from './components/ElevatorCanvas';
import { FloorPanel } from './components/FloorPanel';
import { ConfigDashboard } from './components/ConfigDashboard';
import { SwaggerUIComponent } from './components/SwaggerUI';
import { BookOpen } from 'lucide-react';

function App() {
  const { config, setConfig, elevators, callElevator, selectFloor } = useElevatorSystem();
  const [showDocs, setShowDocs] = useState(false);


  useEffect(() => {
    (window as any).totalFloors = config.totalFloors;
  }, [config.totalFloors]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            Elevator Control System
          </h1>
          {/* <button
            onClick={() => setShowDocs(!showDocs)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <BookOpen className="w-5 h-5" />
            {showDocs ? 'Show Elevator Controls' : 'View API Docs'}
          </button> */}
        </div>

        {showDocs ? (
          <SwaggerUIComponent />
        ) : (
          <>
            <div className="mb-8">
              <ConfigDashboard config={config} onConfigChange={setConfig} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Floor Panels */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <h2 className="text-xl font-semibold p-4 bg-gray-50 border-b">
                  Floor Controls
                </h2>
                <div className="divide-y">
                  {[...Array(config.totalFloors)].map((_, floor) => (
                    <FloorPanel
                      key={config.totalFloors - 1 - floor}
                      floor={config.totalFloors - 1 - floor}
                      onCallElevator={(direction) => 
                        callElevator(config.totalFloors - 1 - floor, direction)
                      }
                    />
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="bg-white rounded-lg shadow-lg p-4">
                  <h2 className="text-xl font-semibold mb-4">Elevator Status</h2>
                  <ElevatorCanvas 
                    elevators={elevators}
                    totalFloors={config.totalFloors}
                  />
                </div>
                
                <div className="mt-8 grid grid-cols-5 gap-4">
                  {elevators.map((elevator) => (
                    <div
                      key={elevator.id}
                      className="bg-white rounded-lg shadow p-4"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold">
                          Elevator {elevator.id + 1}
                        </h3>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {[...Array(config.totalFloors)].map((_, floor) => (
                          <button
                            key={floor}
                            onClick={() => selectFloor(elevator.id, floor)}
                            className={`px-3 py-2 text-sm rounded ${
                              elevator.currentFloor === floor
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                          >
                            {floor}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;