import React, { useEffect, useRef } from 'react';
import { Elevator } from '../types/elevator';

interface ElevatorCanvasProps {
  elevators: Elevator[];
  totalFloors: number;
}

export const ElevatorCanvas: React.FC<ElevatorCanvasProps> = ({ 
  elevators,
  totalFloors
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawElevatorSystem = (ctx: CanvasRenderingContext2D) => {
    const canvas = ctx.canvas;
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    const floorHeight = height / totalFloors;
    const shaftWidth = width / elevators.length;
    const elevatorWidth = shaftWidth * 0.8;
    const padding = (shaftWidth - elevatorWidth) / 2;
    
    // Draw floor lines
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    for (let i = 0; i <= totalFloors; i++) {
      const y = i * floorHeight;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
      
      if (i < totalFloors) {
        ctx.fillStyle = '#6b7280';
        ctx.font = '14px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(
          `Floor ${totalFloors - 1 - i}`,
          10,
          y + floorHeight - 5
        );
      }
    }
    
    // Draw elevator shafts
    ctx.strokeStyle = '#d1d5db';
    ctx.lineWidth = 1;
    for (let i = 0; i <= elevators.length; i++) {
      const x = i * shaftWidth;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    
    // Draw elevators
    elevators.forEach((elevator, index) => {
      const x = index * shaftWidth + padding;
      const y = (totalFloors - 1 - elevator.currentFloor) * floorHeight + padding;
      
      ctx.fillStyle = '#3b82f6';
      ctx.fillRect(x, y, elevatorWidth, floorHeight - padding * 2);
      
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(
        `${elevator.id + 1}`,
        x + elevatorWidth / 2,
        y + floorHeight / 2
      );
      
      const arrowY = y + floorHeight / 3;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      
      if (elevator.direction === 'up') {
        drawArrow(ctx, x + elevatorWidth / 2, arrowY, 'up');
      } else if (elevator.direction === 'down') {
        drawArrow(ctx, x + elevatorWidth / 2, arrowY + floorHeight / 3, 'down');
      }
    });
  };
  
  const drawArrow = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    direction: 'up' | 'down'
  ) => {
    const size = 10;
    ctx.beginPath();
    if (direction === 'up') {
      ctx.moveTo(x - size / 2, y + size / 2);
      ctx.lineTo(x, y - size / 2);
      ctx.lineTo(x + size / 2, y + size / 2);
    } else {
      ctx.moveTo(x - size / 2, y - size / 2);
      ctx.lineTo(x, y + size / 2);
      ctx.lineTo(x + size / 2, y - size / 2);
    }
    ctx.stroke();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (!container) return;
      
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      drawElevatorSystem(ctx);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      drawElevatorSystem(ctx);
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [elevators, totalFloors]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-[600px] bg-white rounded-lg shadow-lg"
    />
  );
};