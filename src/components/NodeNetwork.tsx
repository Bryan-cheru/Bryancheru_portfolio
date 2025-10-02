'use client';

import { useEffect, useRef, useState } from 'react';

interface Node {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  connections: number[];
  type: 'frontend' | 'backend' | 'database' | 'api';
  data: string;
}

interface Connection {
  from: number;
  to: number;
  strength: number;
  dataFlow: number;
}

const NodeNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const nodesRef = useRef<Node[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    const nodeTypes = {
      frontend: { color: '#3B82F6', label: 'React', size: 10 },
      backend: { color: '#10B981', label: 'Node.js', size: 12 },
      database: { color: '#8B5CF6', label: 'MongoDB', size: 14 },
      api: { color: '#F59E0B', label: 'API', size: 8 }
    };

    // Initialize nodes with tech stack positioning
    const nodes: Node[] = [
      // Frontend cluster
      { id: 1, x: dimensions.width * 0.2, y: dimensions.height * 0.3, vx: 0, vy: 0, connections: [2, 4], type: 'frontend', data: 'React' },
      { id: 2, x: dimensions.width * 0.25, y: dimensions.height * 0.4, vx: 0, vy: 0, connections: [1, 3, 5], type: 'frontend', data: 'Next.js' },
      { id: 3, x: dimensions.width * 0.3, y: dimensions.height * 0.2, vx: 0, vy: 0, connections: [2, 6], type: 'frontend', data: 'TypeScript' },
      
      // Backend cluster  
      { id: 4, x: dimensions.width * 0.5, y: dimensions.height * 0.5, vx: 0, vy: 0, connections: [1, 5, 7, 8], type: 'backend', data: 'Node.js' },
      { id: 5, x: dimensions.width * 0.6, y: dimensions.height * 0.4, vx: 0, vy: 0, connections: [2, 4, 9], type: 'api', data: 'REST API' },
      { id: 6, x: dimensions.width * 0.55, y: dimensions.height * 0.3, vx: 0, vy: 0, connections: [3, 7], type: 'api', data: 'GraphQL' },
      
      // Database cluster
      { id: 7, x: dimensions.width * 0.7, y: dimensions.height * 0.6, vx: 0, vy: 0, connections: [4, 6, 8], type: 'database', data: 'MongoDB' },
      { id: 8, x: dimensions.width * 0.8, y: dimensions.height * 0.5, vx: 0, vy: 0, connections: [4, 7, 9], type: 'database', data: 'Redis' },
      { id: 9, x: dimensions.width * 0.75, y: dimensions.height * 0.7, vx: 0, vy: 0, connections: [5, 8], type: 'backend', data: 'Python' },
    ];

    // Create connections
    const connections: Connection[] = [];
    nodes.forEach(node => {
      node.connections.forEach(targetId => {
        if (!connections.find(c => (c.from === node.id && c.to === targetId) || (c.from === targetId && c.to === node.id))) {
          connections.push({
            from: node.id,
            to: targetId,
            strength: Math.random() * 0.5 + 0.5,
            dataFlow: 0
          });
        }
      });
    });

    nodesRef.current = nodes;
    connectionsRef.current = connections;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.016; // 60fps

      // Update node positions with subtle movement
      nodesRef.current.forEach(node => {
        node.vx += (Math.sin(time + node.id) * 0.1 - node.vx) * 0.05;
        node.vy += (Math.cos(time + node.id * 1.5) * 0.1 - node.vy) * 0.05;
        node.x += node.vx;
        node.y += node.vy;
      });

      // Draw connections with data flow animation
      connectionsRef.current.forEach(connection => {
        const fromNode = nodesRef.current.find(n => n.id === connection.from);
        const toNode = nodesRef.current.find(n => n.id === connection.to);
        
        if (fromNode && toNode) {
          // Main connection line
          ctx.beginPath();
          ctx.moveTo(fromNode.x, fromNode.y);
          ctx.lineTo(toNode.x, toNode.y);
          ctx.strokeStyle = `rgba(100, 116, 139, ${connection.strength * 0.6})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Data flow particles
          connection.dataFlow += 0.02;
          if (connection.dataFlow > 1) connection.dataFlow = 0;

          const particleX = fromNode.x + (toNode.x - fromNode.x) * connection.dataFlow;
          const particleY = fromNode.y + (toNode.y - fromNode.y) * connection.dataFlow;

          ctx.beginPath();
          ctx.arc(particleX, particleY, 2, 0, Math.PI * 2);
          ctx.fillStyle = '#3B82F6';
          ctx.fill();

          // Glow effect
          const glowGradient = ctx.createRadialGradient(particleX, particleY, 0, particleX, particleY, 8);
          glowGradient.addColorStop(0, 'rgba(59, 130, 246, 0.8)');
          glowGradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
          ctx.fillStyle = glowGradient;
          ctx.fill();
        }
      });

      // Draw nodes
      nodesRef.current.forEach(node => {
        const nodeConfig = nodeTypes[node.type];
        
        // Node glow
        const glowGradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, nodeConfig.size * 2);
        glowGradient.addColorStop(0, nodeConfig.color + '60');
        glowGradient.addColorStop(1, 'transparent');
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeConfig.size * 2, 0, Math.PI * 2);
        ctx.fill();

        // Main node
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeConfig.size, 0, Math.PI * 2);
        ctx.fillStyle = nodeConfig.color;
        ctx.fill();

        // Node border
        ctx.strokeStyle = nodeConfig.color;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Pulse effect
        const pulseRadius = nodeConfig.size + Math.sin(time * 2 + node.id) * 3;
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseRadius, 0, Math.PI * 2);
        ctx.strokeStyle = nodeConfig.color + '20';
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-60"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default NodeNetwork;