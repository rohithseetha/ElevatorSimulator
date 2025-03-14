export type Direction = 'up' | 'down' | 'idle';

export interface SystemConfig {
  totalFloors: number;
  totalElevators: number;
  floorTravelTime: number;
}

export interface Elevator {
  id: number;
  currentFloor: number;
  direction: Direction;
  destinationFloor: number | null;
  queue: number[];
}

export interface ElevatorCall {
  fromFloor: number;
  direction: Direction;
}