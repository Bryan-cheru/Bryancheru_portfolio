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
  const mousePositionRef = useRef({ x: 0, y: 0 }); // Use ref instead of state
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

    const handleMouseMove = (e: MouseEvent) => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        mousePositionRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    const nodeTypes = {
      frontend: { color: '#3B82F6', label: 'React', size: 10 },
      backend: { color: '#10B981', label: 'Node.js', size: 12 },
      database: { color: '#8B5CF6', label: 'MongoDB', size: 14 },
      api: { color: '#F59E0B', label: 'API', size: 8 }
    };

    // Initialize nodes with distributed positioning for smooth movement
    const nodes: Node[] = [];
    const nodeData = [
      { type: 'frontend', data: 'React', color: '#61DAFB' },
      { type: 'frontend', data: 'Next.js', color: '#000000' },
      { type: 'frontend', data: 'TypeScript', color: '#3178C6' },
      { type: 'backend', data: 'Node.js', color: '#339933' },
      { type: 'api', data: 'REST API', color: '#FF6B35' },
      { type: 'api', data: 'GraphQL', color: '#E10098' },
      { type: 'database', data: 'MongoDB', color: '#47A248' },
      { type: 'database', data: 'PostgreSQL', color: '#336791' },
      { type: 'backend', data: 'Python', color: '#3776AB' },
      { type: 'backend', data: 'Docker', color: '#2496ED' },
      { type: 'api', data: 'AWS', color: '#FF9900' },
      { type: 'frontend', data: 'Tailwind', color: '#38BDF8' },
      { type: 'frontend', data: 'Vite', color: '#646CFF' },
      { type: 'api', data: 'Vercel', color: '#000000' },
      { type: 'database', data: 'Redis', color: '#DC382D' },
      { type: 'database', data: 'Firebase', color: '#FFCA28' }
    ];

    // Create nodes with proper spacing and initial positions
    nodeData.forEach((nodeInfo, i) => {
      const angle = (i / nodeData.length) * Math.PI * 2;
      const radius = Math.min(dimensions.width, dimensions.height) * 0.3;
      const centerX = dimensions.width * 0.5;
      const centerY = dimensions.height * 0.5;
      
      nodes.push({
        id: i + 1,
        x: centerX + Math.cos(angle) * radius + (Math.random() - 0.5) * 100,
        y: centerY + Math.sin(angle) * radius + (Math.random() - 0.5) * 100,
        vx: (Math.random() - 0.5) * 0.1, // Much slower initial velocity
        vy: (Math.random() - 0.5) * 0.1,
        connections: [
          ((i + 1) % nodeData.length) + 1,
          ((i + 3) % nodeData.length) + 1,
          ((i + 5) % nodeData.length) + 1
        ],
        type: nodeInfo.type as 'frontend' | 'backend' | 'database' | 'api',
        data: nodeInfo.data
      });
    });

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
      time += 0.0003; // Ultra slow motion - barely perceptible movement

      // Update node positions with smooth movement and mouse interaction
      nodesRef.current.forEach((node, index) => {
        // Store original positions for boundary checking
        const originalX = dimensions.width * (0.05 + (index % 4) * 0.3);
        const originalY = dimensions.height * (0.1 + Math.floor(index / 4) * 0.25);
        
        // Mouse interaction with smoother physics
        const dx = mousePositionRef.current.x - node.x;
        const dy = mousePositionRef.current.y - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 120;
        
        if (distance < maxDistance && distance > 0) {
          const force = (maxDistance - distance) / maxDistance * 0.02; // Minimal force
          node.vx += (dx / distance) * force * 0.005; // Very slow mouse response
          node.vy += (dy / distance) * force * 0.005;
        }
        
        // Smooth orbital motion around original position - extremely slow
        const orbitRadius = 15 + (index % 3) * 8;
        const orbitSpeed = 1 + (index % 5) * 0.3; // Very slow orbital motion
        const orbitX = originalX + Math.cos(time * orbitSpeed + index) * orbitRadius;
        const orbitY = originalY + Math.sin(time * orbitSpeed * 0.8 + index) * orbitRadius;
        
        // Gentle attraction to orbit path - ultra slow response
        const targetDx = orbitX - node.x;
        const targetDy = orbitY - node.y;
        node.vx += targetDx * 0.0005; // Extremely gentle attraction
        node.vy += targetDy * 0.0005;
        
        // Apply velocity with very strong damping for ultra slow movement
        node.vx *= 0.998;
        node.vy *= 0.998;
        node.x += node.vx;
        node.y += node.vy;
        
        // Boundary enforcement to prevent nodes from going off-screen
        const margin = 50;
        if (node.x < margin) { node.x = margin; node.vx = Math.abs(node.vx); }
        if (node.x > dimensions.width - margin) { node.x = dimensions.width - margin; node.vx = -Math.abs(node.vx); }
        if (node.y < margin) { node.y = margin; node.vy = Math.abs(node.vy); }
        if (node.y > dimensions.height - margin) { node.y = dimensions.height - margin; node.vy = -Math.abs(node.vy); }
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
  }, [dimensions]); // Remove mouse position from dependencies to prevent animation restart

  return (
    <div className="absolute inset-0 pointer-events-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-70"
        style={{ 
          width: '100%', 
          height: '100%',
          mixBlendMode: 'screen',
          filter: 'blur(0.5px)'
        }}
      />
    </div>
  );
};

export default NodeNetwork;