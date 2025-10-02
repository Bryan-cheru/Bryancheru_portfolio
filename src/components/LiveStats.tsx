'use client';

import { useState, useEffect } from 'react';
import { Users, Eye, Activity } from 'lucide-react';

interface Stats {
  visitors: number;
  activeUsers: number;
  timestamp: string;
}

const LiveStats = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats');
        const data = await response.json();
        setStats(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
        setIsLoading(false);
      }
    };

    // Initial fetch
    fetchStats();

    // Update every 30 seconds
    const interval = setInterval(fetchStats, 30000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading || !stats) {
    return (
      <div className="flex items-center gap-2 text-slate-400 text-sm">
        <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" />
        Loading stats...
      </div>
    );
  }

  return (
    <div className="flex items-center gap-6 text-sm">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <Eye size={14} className="text-slate-400" />
        </div>
        <span className="text-slate-300">{stats.visitors}</span>
        <span className="text-slate-500">visitors</span>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
          <Users size={14} className="text-slate-400" />
        </div>
        <span className="text-slate-300">{stats.activeUsers}</span>
        <span className="text-slate-500">online</span>
      </div>

      <div className="flex items-center gap-1">
        <Activity size={14} className="text-green-400" />
        <span className="text-slate-500">live</span>
      </div>
    </div>
  );
};

export default LiveStats;