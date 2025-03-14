import { useState, useCallback, useEffect } from 'react';
import { Direction, Elevator, SystemConfig } from '../types/elevator';

const DEFAULT_CONFIG: SystemConfig = {
  totalFloors: 6,
  totalElevators: 5,
  floorTravelTime: 2,
};

const initializeElevators = (totalElevators: number): Elevator[] =>
  Array.from({ length: totalElevators }, (_, i) => ({
    id: i,
    currentFloor: 0,
    direction: 'idle' as Direction,
    destinationFloor: null,
    queue: [],
  }));

export const useElevatorSystem = () => {
  const [config, setConfig] = useState<SystemConfig>(DEFAULT_CONFIG);
  const [elevators, setElevators] = useState<Elevator[]>(() => 
    initializeElevators(config.totalElevators)
  );
  const [lastAssignedElevator, setLastAssignedElevator] = useState<number>(-1);

  const handleConfigChange = (newConfig: SystemConfig) => {
    // Ensure totalFloors is within bounds
    const validatedConfig = {
      ...newConfig,
      totalFloors: Math.min(Math.max(2, newConfig.totalFloors), 10),
    };
    setConfig(validatedConfig);
  };

  // Reinitialize elevators when configuration changes
  useEffect(() => {
    setElevators(initializeElevators(config.totalElevators));
    setLastAssignedElevator(-1);
  }, [config.totalElevators]);

  const calculateElevatorScore = (
    elevator: Elevator,
    fromFloor: number,
    direction: Direction
  ): number => {
    const distance = Math.abs(elevator.currentFloor - fromFloor);
    const queuePenalty = elevator.queue.length * 2;
    
    let score = distance + queuePenalty;

    if (elevator.direction === 'idle') {
      score -= 3;
    }
    
    if (
      (direction === 'up' && elevator.direction === 'up' && elevator.currentFloor <= fromFloor) ||
      (direction === 'down' && elevator.direction === 'down' && elevator.currentFloor >= fromFloor)
    ) {
      score -= 2;
    }

    if (elevator.id === lastAssignedElevator) {
      score += 5;
    }

    return score;
  };

  const findNearestElevator = (fromFloor: number, direction: Direction): number => {
    let bestElevator = -1;
    let bestScore = Infinity;

    elevators.forEach((elevator, index) => {
      const score = calculateElevatorScore(elevator, fromFloor, direction);
      if (score < bestScore) {
        bestScore = score;
        bestElevator = index;
      }
    });

    return bestElevator;
  };

  const callElevator = useCallback((fromFloor: number, direction: Direction) => {
    if (fromFloor >= config.totalFloors) return;
    
    const elevatorIndex = findNearestElevator(fromFloor, direction);
    if (elevatorIndex === -1) return;

    setLastAssignedElevator(elevatorIndex);

    setElevators(prev => {
      const newElevators = [...prev];
      const elevator = newElevators[elevatorIndex];
      
      if (elevator.direction === 'idle') {
        elevator.direction = direction;
        elevator.destinationFloor = fromFloor;
      } else {
        elevator.queue.push(fromFloor);
        elevator.queue.sort((a, b) => {
          if (elevator.direction === 'up') {
            return a - b;
          } else {
            return b - a;
          }
        });
      }
      
      return newElevators;
    });
  }, [lastAssignedElevator, config.totalFloors]);

  const selectFloor = useCallback((elevatorId: number, targetFloor: number) => {
    if (targetFloor >= config.totalFloors) return;

    setElevators(prev => {
      const newElevators = [...prev];
      const elevator = newElevators[elevatorId];

      if (elevator.destinationFloor === null) {
        elevator.destinationFloor = targetFloor;
        elevator.direction = targetFloor > elevator.currentFloor ? 'up' : 'down';
      } else {
        elevator.queue.push(targetFloor);
        elevator.queue.sort((a, b) => {
          if (elevator.direction === 'up') {
            return a - b;
          } else {
            return b - a;
          }
        });
      }
      
      return newElevators;
    });
  }, [config.totalFloors]);

  useEffect(() => {
    const interval = setInterval(() => {
      setElevators(prev => {
        const newElevators = [...prev];
        
        newElevators.forEach(elevator => {
          if (elevator.destinationFloor !== null) {
            if (elevator.currentFloor === elevator.destinationFloor) {
              if (elevator.queue.length > 0) {
                const nextFloor = elevator.queue.shift()!;
                elevator.destinationFloor = nextFloor;
                elevator.direction = nextFloor > elevator.currentFloor ? 'up' : 'down';
              } else {
                elevator.destinationFloor = null;
                elevator.direction = 'idle';
              }
            } else {
              if (elevator.currentFloor < elevator.destinationFloor) {
                elevator.currentFloor += 1;
                elevator.direction = 'up';
              } else {
                elevator.currentFloor -= 1;
                elevator.direction = 'down';
              }
            }
          }
        });
        
        return newElevators;
      });
    }, config.floorTravelTime * 1000);

    return () => clearInterval(interval);
  }, [config.floorTravelTime]);

  return {
    config,
    setConfig: handleConfigChange,
    elevators,
    callElevator,
    selectFloor,
  };
};