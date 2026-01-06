'use client';

import { useEffect, useState } from 'react';
import { Users, Building2, Clock, CheckCircle2 } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import type { AgencyCollaboration } from '@/types';
import { formatDistanceToNow } from 'date-fns';

export default function FusionPage() {
  const [agencies, setAgencies] = useState<AgencyCollaboration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/agencies');
        const data = await res.json();
        setAgencies(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch agencies:', error);
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 20000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-lg text-gray-600">Loading fusion center data...</div>
      </div>
    );
  }

  const activeAgencies = agencies.filter(a => a.status === 'active').length;
  const totalThreatsShared = agencies.reduce((acc, a) => acc + a.threatsShared, 0);
  const totalIncidents = agencies.reduce((acc, a) => acc + a.incidentsReported, 0);
  const avgResponseTime = agencies.reduce((acc, a) => acc + a.responseTime, 0) / agencies.length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#00ff41] font-mono">&gt; National Cyber Fusion Center</h1>
        <p className="mt-2 text-sm text-[#00ff41]/70 font-mono">
          Inter-agency collaboration and threat intelligence sharing platform
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Active Agencies"
          value={activeAgencies}
          subtitle={`${agencies.length} total partners`}
          icon={<Building2 className="h-6 w-6" />}
          colorClass="bg-[#00ff41]"
        />
        <StatCard
          title="Threats Shared"
          value={totalThreatsShared}
          subtitle="Last 30 days"
          icon={<Users className="h-6 w-6" />}
          colorClass="bg-[#008f11]"
          trend={{ value: 15, isPositive: true }}
        />
        <StatCard
          title="Incidents Reported"
          value={totalIncidents}
          subtitle="Cross-agency"
          icon={<CheckCircle2 className="h-6 w-6" />}
          colorClass="bg-[#00ff41]"
        />
        <StatCard
          title="Avg Response Time"
          value={`${avgResponseTime.toFixed(0)}min`}
          subtitle="Inter-agency coordination"
          icon={<Clock className="h-6 w-6" />}
          colorClass="bg-[#ffb000]"
        />
      </div>

      {/* Agency Status */}
      <div className="rounded-none border border-[#1a1a1a] bg-[#0d0d0d] shadow-sm">
        <div className="border-b border-[#1a1a1a] px-6 py-4">
          <h3 className="text-lg font-semibold text-[#00ff41] font-mono">Partner Agencies</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#1a1a1a]/30">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-[#00ff41]/70 font-mono">
                  Agency
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-[#00ff41]/70 font-mono">
                  Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-[#00ff41]/70 font-mono">
                  Threats Shared
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-[#00ff41]/70 font-mono">
                  Incidents Reported
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-[#00ff41]/70 font-mono">
                  Response Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-[#00ff41]/70 font-mono">
                  Last Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-[#00ff41]/70 font-mono">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a1a1a] bg-[#0d0d0d]">
              {agencies.map((agency) => (
                <tr key={agency.agencyCode} className="hover:bg-[#1a1a1a]/50">
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-[#00ff41] font-mono">
                    {agency.agencyName}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-[#4d4d4d] font-mono">
                    <span className="rounded-none bg-[#1a1a1a] px-2 py-1 font-mono text-xs text-[#00ff41]">
                      {agency.agencyCode}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-[#00ff41] font-mono">
                    {agency.threatsShared}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-[#00ff41] font-mono">
                    {agency.incidentsReported}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-[#00ff41] font-mono">
                    {agency.responseTime} min
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-[#4d4d4d] font-mono">
                    {formatDistanceToNow(new Date(agency.lastContact), { addSuffix: true })}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`rounded-none px-3 py-1 text-xs font-semibold font-mono border ${agency.status === 'active'
                          ? 'border-[#00ff41] text-[#00ff41]'
                          : 'border-[#4d4d4d] text-[#4d4d4d]'
                        }`}
                    >
                      {agency.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Collaboration Network */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-none border border-[#1a1a1a] bg-[#0d0d0d] p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-[#00ff41] font-mono">Recent Intelligence Sharing</h3>
          <div className="space-y-3">
            {agencies.slice(0, 5).map((agency, idx) => (
              <div key={idx} className="flex items-center justify-between rounded-none border border-[#1a1a1a] p-4 bg-[#0d0d0d]">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-none bg-[#1a1a1a] text-sm font-bold text-[#00ff41] font-mono border border-[#00ff41]/30">
                    {agency.agencyCode}
                  </div>
                  <div>
                    <p className="font-medium text-[#00ff41] font-mono">{agency.agencyName}</p>
                    <p className="text-sm text-[#4d4d4d] font-mono">
                      Shared {agency.threatsShared} threats
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-[#00ff41] font-mono">
                    {agency.incidentsReported} incidents
                  </p>
                  <p className="text-xs text-[#4d4d4d] font-mono">
                    {formatDistanceToNow(new Date(agency.lastContact), { addSuffix: true })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-none border border-[#1a1a1a] bg-[#0d0d0d] p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-[#00ff41] font-mono">Joint Operations</h3>
          <div className="space-y-4">
            <div className="rounded-none border border-[#00ff41] bg-[#00ff41]/10 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-[#00ff41] font-mono">Operation SafeGuard</p>
                  <p className="text-sm text-[#00ff41]/70 font-mono">Protecting financial infrastructure</p>
                  <div className="mt-2 flex space-x-2">
                    <span className="rounded-none border border-[#00ff41] bg-black px-2 py-1 text-xs font-medium text-[#00ff41] font-mono">
                      CBK
                    </span>
                    <span className="rounded-none border border-[#00ff41] bg-black px-2 py-1 text-xs font-medium text-[#00ff41] font-mono">
                      KRA
                    </span>
                    <span className="rounded-none border border-[#00ff41] bg-black px-2 py-1 text-xs font-medium text-[#00ff41] font-mono">
                      NIS
                    </span>
                  </div>
                </div>
                <span className="rounded-none border border-[#00ff41] bg-[#00ff41]/20 px-3 py-1 text-xs font-semibold text-[#00ff41] font-mono">
                  ACTIVE
                </span>
              </div>
            </div>

            <div className="rounded-none border border-[#008f11] bg-[#008f11]/10 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-[#008f11] font-mono">Digital ID Protection</p>
                  <p className="text-sm text-[#008f11]/70 font-mono">Securing national digital identity</p>
                  <div className="mt-2 flex space-x-2">
                    <span className="rounded-none border border-[#008f11] bg-black px-2 py-1 text-xs font-medium text-[#008f11] font-mono">
                      MICT
                    </span>
                    <span className="rounded-none border border-[#008f11] bg-black px-2 py-1 text-xs font-medium text-[#008f11] font-mono">
                      DPC
                    </span>
                    <span className="rounded-none border border-[#008f11] bg-black px-2 py-1 text-xs font-medium text-[#008f11] font-mono">
                      NPS
                    </span>
                  </div>
                </div>
                <span className="rounded-none border border-[#008f11] bg-[#008f11]/20 px-3 py-1 text-xs font-semibold text-[#008f11] font-mono">
                  ACTIVE
                </span>
              </div>
            </div>

            <div className="rounded-none border border-[#4d4d4d] bg-[#1a1a1a] p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-[#4d4d4d] font-mono">Counter-APT Initiative</p>
                  <p className="text-sm text-[#4d4d4d]/70 font-mono">Advanced threat detection</p>
                  <div className="mt-2 flex space-x-2">
                    <span className="rounded-none border border-[#4d4d4d] bg-black px-2 py-1 text-xs font-medium text-[#4d4d4d] font-mono">
                      KDF
                    </span>
                    <span className="rounded-none border border-[#4d4d4d] bg-black px-2 py-1 text-xs font-medium text-[#4d4d4d] font-mono">
                      NIS
                    </span>
                    <span className="rounded-none border border-[#4d4d4d] bg-black px-2 py-1 text-xs font-medium text-[#4d4d4d] font-mono">
                      CA
                    </span>
                  </div>
                </div>
                <span className="rounded-none border border-[#4d4d4d] bg-[#4d4d4d]/20 px-3 py-1 text-xs font-semibold text-[#4d4d4d] font-mono">
                  PLANNING
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
