'use client';

import { useEffect, useState } from 'react';
import { Shield, AlertTriangle, Activity, Database, TrendingUp, TrendingDown } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import ThreatBarChart from '@/components/charts/ThreatBarChart';
import ThreatPieChart from '@/components/charts/ThreatPieChart';
import type { ThreatAlert, ThreatStatistics } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { getSeverityColor, getStatusColor } from '@/lib/utils';

export default function Home() {
  const [threats, setThreats] = useState<ThreatAlert[]>([]);
  const [statistics, setStatistics] = useState<ThreatStatistics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [threatsRes, statsRes] = await Promise.all([
          fetch('/api/threats'),
          fetch('/api/statistics'),
        ]);

        const threatsData = await threatsRes.json();
        const statsData = await statsRes.json();

        setThreats(threatsData);
        setStatistics(statsData);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setLoading(false);
      }
    };

    fetchData();

    // Refresh data every 10 seconds
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-lg text-cyan-400 animate-pulse">Loading threat intelligence...</div>
      </div>
    );
  }

  const criticalThreats = threats.filter(t => t.severity === 'critical').length;
  const activeThreats = threats.filter(t => t.status === 'active').length;

  // Prepare chart data
  const severityData = statistics ? [
    { name: 'Critical', value: statistics.byLevel.critical, color: '#dc2626' },
    { name: 'High', value: statistics.byLevel.high, color: '#ea580c' },
    { name: 'Medium', value: statistics.byLevel.medium, color: '#ca8a04' },
    { name: 'Low', value: statistics.byLevel.low, color: '#2563eb' },
    { name: 'Info', value: statistics.byLevel.info, color: '#6b7280' },
  ] : [];

  const vectorData = statistics ? Object.entries(statistics.byVector).map(([name, value]) => ({
    name: name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    value,
    color: '#3b82f6',
  })).slice(0, 6) : [];

  const sectorData = statistics ? Object.entries(statistics.bySector).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
    color: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#6366f1', '#8b5cf6', '#ec4899', '#f43f5e'][Math.floor(Math.random() * 8)],
  })) : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#00ff41] tracking-wide font-mono">&gt; Threat Overview</h1>
        <p className="mt-2 text-sm text-[#00ff41]/70 font-mono">
          Real-time cyber threat monitoring for Kenya&apos;s national infrastructure
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Threats"
          value={statistics?.total || 0}
          subtitle="Last 24 hours"
          icon={<Shield className="h-6 w-6" />}
          colorClass="bg-[#00ff41]"
        />
        <StatCard
          title="Critical Threats"
          value={criticalThreats}
          subtitle="Requires immediate action"
          icon={<AlertTriangle className="h-6 w-6" />}
          colorClass="bg-[#cc0000]"
          trend={{ value: 12, isPositive: false }}
        />
        <StatCard
          title="Active Incidents"
          value={activeThreats}
          subtitle="Currently investigating"
          icon={<Activity className="h-6 w-6" />}
          colorClass="bg-[#ffb000]"
        />
        <StatCard
          title="Threats Blocked"
          value={statistics?.blocked || 0}
          subtitle="Auto-response system"
          icon={<Database className="h-6 w-6" />}
          colorClass="bg-[#008f11]"
          trend={{ value: 8, isPositive: true }}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ThreatPieChart data={severityData} title="Threats by Severity Level" />
        <ThreatBarChart data={vectorData} title="Top Attack Vectors" />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <ThreatPieChart data={sectorData} title="Threats by Target Sector" />
      </div>

      {/* Live Threat Feed */}
      <div className="rounded-none border border-[#1a1a1a] bg-[#0d0d0d] shadow-lg">
        <div className="border-b border-[#1a1a1a] px-6 py-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[#00ff41] uppercase tracking-wide font-mono">Live Threat Feed</h3>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-[#cc0000] shadow-[0_0_8px_rgba(204,0,0,0.8)]"></div>
              <span className="text-sm text-[#cc0000] font-medium font-mono">LIVE</span>
            </div>
          </div>
        </div>
        <div className="divide-y divide-[#1a1a1a]">
          {threats.slice(0, 10).map((threat) => (
            <div key={threat.id} className="px-6 py-4 hover:bg-[#1a1a1a]/50 transition-colors cursor-crosshair">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 font-mono">
                    <span
                      className={`rounded-none px-3 py-1 text-xs font-semibold border ${threat.severity === 'critical' ? 'border-[#cc0000] text-[#cc0000]' :
                          threat.severity === 'high' ? 'border-[#ffb000] text-[#ffb000]' :
                            threat.severity === 'medium' ? 'border-[#00ff41] text-[#00ff41]' :
                              'border-[#008f11] text-[#008f11]'
                        }`}
                    >
                      {threat.severity.toUpperCase()}
                    </span>
                    <span
                      className={`text-xs text-[#00ff41]/70`}
                    >
                      [{threat.status.toUpperCase()}]
                    </span>
                    <span className="text-xs text-[#4d4d4d]">
                      {formatDistanceToNow(new Date(threat.timestamp), { addSuffix: true })}
                    </span>
                  </div>
                  <h4 className="mt-2 font-semibold text-[#00ff41] font-mono">{threat.title}</h4>
                  <p className="mt-1 text-sm text-[#00ff41]/70 font-mono">{threat.description}</p>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-[#00ff41]/60 font-mono">
                    <span className="rounded-none border border-[#333] bg-black px-2 py-1">
                      TARGET: {threat.targetSystem}
                    </span>
                    <span className="rounded-none border border-[#333] bg-black px-2 py-1">
                      ORIGIN: {threat.sourceCountry}
                    </span>
                    <span className="rounded-none border border-[#333] bg-black px-2 py-1">
                      VECTOR: {threat.attackVector}
                    </span>
                    <span className="rounded-none border border-[#333] bg-black px-2 py-1">
                      RISK: {threat.riskScore}/100
                    </span>
                  </div>
                </div>
                <div className="ml-4 text-right">
                  {threat.riskScore >= 80 ? (
                    <TrendingUp className="h-6 w-6 text-[#cc0000]" />
                  ) : (
                    <TrendingDown className="h-6 w-6 text-[#ffb000]" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
