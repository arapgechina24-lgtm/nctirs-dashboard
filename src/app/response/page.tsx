'use client';

import { useEffect, useState } from 'react';
import { Zap, CheckCircle, XCircle, Clock, Shield } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import type { AutomatedResponse } from '@/types';
import { formatDistanceToNow } from 'date-fns';

export default function ResponsePage() {
  const [responses, setResponses] = useState<AutomatedResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/responses');
        const data = await res.json();
        setResponses(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch responses:', error);
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 8000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-lg text-gray-600">Loading response data...</div>
      </div>
    );
  }

  const completedResponses = responses.filter(r => r.status === 'completed').length;
  const executingResponses = responses.filter(r => r.status === 'executing').length;
  const failedResponses = responses.filter(r => r.status === 'failed').length;
  const successRate = completedResponses / responses.length * 100;

  const actionColors: Record<string, string> = {
    'block-ip': 'border-[#cc0000] text-[#cc0000]',
    'quarantine-email': 'border-[#ffb000] text-[#ffb000]',
    'isolate-system': 'border-[#ffb000] text-[#ffb000]',
    'suspend-account': 'border-[#ffb000] text-[#ffb000]',
    'dns-sinkhole': 'border-[#008f11] text-[#008f11]',
    'firewall-rule': 'border-[#00ff41] text-[#00ff41]',
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#00ff41] font-mono">&gt; Automated Response & Containment</h1>
        <p className="mt-2 text-sm text-[#00ff41]/70 font-mono">
          Real-time automated threat mitigation and response actions
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Responses"
          value={responses.length}
          subtitle="Last 24 hours"
          icon={<Zap className="h-6 w-6" />}
          colorClass="bg-[#00ff41]"
        />
        <StatCard
          title="Success Rate"
          value={`${successRate.toFixed(1)}%`}
          subtitle="Response effectiveness"
          icon={<CheckCircle className="h-6 w-6" />}
          colorClass="bg-[#00ff41]"
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="In Progress"
          value={executingResponses}
          subtitle="Currently executing"
          icon={<Clock className="h-6 w-6" />}
          colorClass="bg-[#ffb000]"
        />
        <StatCard
          title="Failed Actions"
          value={failedResponses}
          subtitle="Requires review"
          icon={<XCircle className="h-6 w-6" />}
          colorClass="bg-[#cc0000]"
        />
      </div>

      {/* Response Actions Table */}
      <div className="rounded-none border border-[#1a1a1a] bg-[#0d0d0d] shadow-sm">
        <div className="border-b border-[#1a1a1a] px-6 py-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[#00ff41] font-mono">Recent Response Actions</h3>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-[#00ff41] shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
              <span className="text-sm text-[#00ff41] font-mono">Auto-Response Active</span>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#1a1a1a]/30">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-[#00ff41]/70 font-mono">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-[#00ff41]/70 font-mono">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-[#00ff41]/70 font-mono">
                  Target
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-[#00ff41]/70 font-mono">
                  Execution Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-[#00ff41]/70 font-mono">
                  Approved By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-[#00ff41]/70 font-mono">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a1a1a] bg-[#0d0d0d]">
              {responses.map((response) => (
                <tr key={response.id} className="hover:bg-[#1a1a1a]/50">
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-[#4d4d4d] font-mono">
                    {formatDistanceToNow(new Date(response.timestamp), { addSuffix: true })}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <span className={`rounded-none border px-3 py-1 text-xs font-semibold font-mono ${actionColors[response.action] || 'border-[#4d4d4d] text-[#4d4d4d]'}`}>
                      {response.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#00ff41]">
                    <span className="rounded-none border border-[#1a1a1a] bg-[#000000] px-2 py-1 font-mono text-xs text-[#00ff41]">
                      {response.target}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-[#00ff41] font-mono">
                    {response.executionTime}ms
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-[#00ff41] font-mono">
                    {response.approvedBy === 'auto' ? (
                      <span className="text-[#00ff41]">Automated</span>
                    ) : (
                      <span className="text-[#ffb000]">Analyst</span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`rounded-none px-3 py-1 text-xs font-semibold font-mono border ${response.status === 'completed'
                          ? 'border-[#00ff41] text-[#00ff41]'
                          : response.status === 'executing'
                            ? 'border-[#ffb000] text-[#ffb000]'
                            : response.status === 'failed'
                              ? 'border-[#cc0000] text-[#cc0000]'
                              : 'border-[#4d4d4d] text-[#4d4d4d]'
                        }`}
                    >
                      {response.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Response Playbooks */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-none border border-[#1a1a1a] bg-[#0d0d0d] p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-[#00ff41] font-mono">Active Response Playbooks</h3>
          <div className="space-y-3">
            <div className="rounded-none border border-[#1a1a1a] p-4 bg-[#0d0d0d]">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-[#00ff41] font-mono">Phishing Email Response</p>
                  <p className="text-sm text-[#00ff41]/70 font-mono">Automated quarantine & user notification</p>
                  <div className="mt-2 text-xs text-[#4d4d4d] font-mono">
                    Triggers: 3 | Avg Time: 2.3s
                  </div>
                </div>
                <Shield className="h-5 w-5 text-[#00ff41]" />
              </div>
            </div>

            <div className="rounded-none border border-[#1a1a1a] p-4 bg-[#0d0d0d]">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-[#00ff41] font-mono">Malicious IP Blocking</p>
                  <p className="text-sm text-[#00ff41]/70 font-mono">Firewall rule deployment</p>
                  <div className="mt-2 text-xs text-[#4d4d4d] font-mono">
                    Triggers: 5 | Avg Time: 0.8s
                  </div>
                </div>
                <Shield className="h-5 w-5 text-[#00ff41]" />
              </div>
            </div>

            <div className="rounded-none border border-[#1a1a1a] p-4 bg-[#0d0d0d]">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-[#00ff41] font-mono">Ransomware Containment</p>
                  <p className="text-sm text-[#00ff41]/70 font-mono">System isolation & backup verification</p>
                  <div className="mt-2 text-xs text-[#4d4d4d] font-mono">
                    Triggers: 2 | Avg Time: 5.1s
                  </div>
                </div>
                <Shield className="h-5 w-5 text-[#cc0000]" />
              </div>
            </div>

            <div className="rounded-none border border-[#1a1a1a] p-4 bg-[#0d0d0d]">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-[#00ff41] font-mono">Credential Compromise</p>
                  <p className="text-sm text-[#00ff41]/70 font-mono">Account suspension & password reset</p>
                  <div className="mt-2 text-xs text-[#4d4d4d] font-mono">
                    Triggers: 4 | Avg Time: 3.2s
                  </div>
                </div>
                <Shield className="h-5 w-5 text-[#ffb000]" />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-none border border-[#1a1a1a] bg-[#0d0d0d] p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-[#00ff41] font-mono">Response Metrics</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm">
                <span className="text-[#00ff41]/70 font-mono">Average Response Time</span>
                <span className="font-semibold text-[#00ff41] font-mono">2.4 seconds</span>
              </div>
              <div className="mt-2 h-2 rounded-none bg-[#1a1a1a]">
                <div className="h-2 rounded-none bg-[#00ff41] shadow-[0_0_8px_rgba(34,197,94,0.5)]" style={{ width: '85%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm">
                <span className="text-[#00ff41]/70 font-mono">Automation Rate</span>
                <span className="font-semibold text-[#00ff41] font-mono">92%</span>
              </div>
              <div className="mt-2 h-2 rounded-none bg-[#1a1a1a]">
                <div className="h-2 rounded-none bg-[#00ff41] shadow-[0_0_8px_rgba(34,197,94,0.5)]" style={{ width: '92%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm">
                <span className="text-[#00ff41]/70 font-mono">Success Rate</span>
                <span className="font-semibold text-[#00ff41] font-mono">{successRate.toFixed(0)}%</span>
              </div>
              <div className="mt-2 h-2 rounded-none bg-[#1a1a1a]">
                <div className="h-2 rounded-none bg-[#00ff41] shadow-[0_0_8px_rgba(34,197,94,0.5)]" style={{ width: `${successRate}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm">
                <span className="text-[#00ff41]/70 font-mono">Human Intervention Required</span>
                <span className="font-semibold text-[#00ff41] font-mono">8%</span>
              </div>
              <div className="mt-2 h-2 rounded-none bg-[#1a1a1a]">
                <div className="h-2 rounded-none bg-[#ffb000]" style={{ width: '8%' }}></div>
              </div>
            </div>

            <div className="mt-6 rounded-none border border-[#00ff41] bg-[#00ff41]/10 p-4">
              <p className="text-sm font-semibold text-[#00ff41] font-mono">System Performance</p>
              <p className="text-2xl font-bold text-[#00ff41] font-mono">Excellent</p>
              <p className="mt-1 text-xs text-[#00ff41]/70 font-mono">
                All response modules operational. 99.8% uptime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
