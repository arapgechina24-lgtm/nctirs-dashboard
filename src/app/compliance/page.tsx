'use client';

import { useEffect, useState } from 'react';
import { Shield, FileText, Lock, CheckCircle2 } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import type { ComplianceStatus } from '@/types';
import { format } from 'date-fns';
import { getStatusColor } from '@/lib/utils';

export default function CompliancePage() {
  const [compliance, setCompliance] = useState<ComplianceStatus[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/compliance');
        const data = await res.json();
        setCompliance(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch compliance data:', error);
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-lg text-gray-600">Loading compliance data...</div>
      </div>
    );
  }

  const avgScore = compliance.reduce((acc, c) => acc + c.score, 0) / compliance.length;
  const compliantCategories = compliance.filter(c => c.status === 'compliant').length;
  const totalIssues = compliance.reduce((acc, c) => acc + c.issues, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#00ff41] font-mono">&gt; Data Protection & Compliance</h1>
        <p className="mt-2 text-sm text-[#00ff41]/70 font-mono">
          Regulatory adherence and data privacy monitoring
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Overall Score"
          value={`${avgScore.toFixed(1)}%`}
          subtitle="Compliance rating"
          icon={<Shield className="h-6 w-6" />}
          colorClass="bg-[#00ff41]"
          trend={{ value: 3, isPositive: true }}
        />
        <StatCard
          title="Compliant Categories"
          value={compliantCategories}
          subtitle={`of ${compliance.length} total`}
          icon={<CheckCircle2 className="h-6 w-6" />}
          colorClass="bg-[#00ff41]"
        />
        <StatCard
          title="Open Issues"
          value={totalIssues}
          subtitle="Requires attention"
          icon={<FileText className="h-6 w-6" />}
          colorClass="bg-[#ffb000]"
        />
        <StatCard
          title="Data Encrypted"
          value="98.7%"
          subtitle="All systems"
          icon={<Lock className="h-6 w-6" />}
          colorClass="bg-[#008f11]"
        />
      </div>

      {/* Compliance Status */}
      <div className="rounded-none border border-[#1a1a1a] bg-[#0d0d0d] shadow-sm">
        <div className="border-b border-[#1a1a1a] px-6 py-4">
          <h3 className="text-lg font-semibold text-[#00ff41] font-mono">Compliance Categories</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#1a1a1a]/30">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-[#00ff41]/70 font-mono">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-[#00ff41]/70 font-mono">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-[#00ff41]/70 font-mono">
                  Open Issues
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-[#00ff41]/70 font-mono">
                  Last Audit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-[#00ff41]/70 font-mono">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-[#00ff41]/70 font-mono">
                  Progress
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a1a1a] bg-[#0d0d0d]">
              {compliance.map((item) => (
                <tr key={item.category} className="hover:bg-[#1a1a1a]/50">
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-[#00ff41] font-mono">
                    {item.category}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <span className="font-semibold text-[#00ff41] font-mono">{item.score}%</span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-[#00ff41] font-mono">
                    {item.issues > 0 ? (
                      <span className="font-semibold text-[#ffb000] font-mono">{item.issues}</span>
                    ) : (
                      <span className="text-[#00ff41] font-mono">0</span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-[#4d4d4d] font-mono">
                    {format(new Date(item.lastAudit), 'MMM dd, yyyy')}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className={`rounded-none px-3 py-1 text-xs font-semibold font-mono border ${item.status === 'compliant' ? 'border-[#00ff41] text-[#00ff41]' :
                        item.status === 'warning' ? 'border-[#ffb000] text-[#ffb000]' :
                          'border-[#cc0000] text-[#cc0000]'
                      }`}>
                      {item.status.toUpperCase().replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-full rounded-none bg-[#1a1a1a]">
                      <div
                        className={`h-2 rounded-none ${item.score >= 90
                          ? 'bg-[#00ff41] shadow-[0_0_8px_rgba(34,197,94,0.5)]'
                          : item.score >= 80
                            ? 'bg-[#ffb000] shadow-[0_0_8px_rgba(234,179,8,0.5)]'
                            : 'bg-[#cc0000] shadow-[0_0_8px_rgba(239,68,68,0.5)]'
                          }`}
                        style={{ width: `${item.score}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Compliance Details */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-none border border-[#1a1a1a] bg-[#0d0d0d] p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-[#00ff41] font-mono">Regulatory Frameworks</h3>
          <div className="space-y-4">
            <div className="rounded-none border-l-4 border-[#00ff41] bg-[#00ff41]/10 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-[#00ff41] font-mono">Kenya Data Protection Act 2019</p>
                  <p className="text-sm text-[#00ff41]/70 font-mono">Full compliance achieved</p>
                  <div className="mt-2 text-xs text-[#00ff41]/60 font-mono">
                    Last audit: {format(new Date(), 'MMM dd, yyyy')}
                  </div>
                </div>
                <CheckCircle2 className="h-6 w-6 text-[#00ff41]" />
              </div>
            </div>

            <div className="rounded-none border-l-4 border-[#00ff41] bg-[#00ff41]/10 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-[#00ff41] font-mono">ISO 27001:2013</p>
                  <p className="text-sm text-[#00ff41]/70 font-mono">Information Security Management</p>
                  <div className="mt-2 text-xs text-[#00ff41]/60 font-mono">
                    Certified • Valid until Dec 2026
                  </div>
                </div>
                <CheckCircle2 className="h-6 w-6 text-[#00ff41]" />
              </div>
            </div>

            <div className="rounded-none border-l-4 border-[#ffb000] bg-[#ffb000]/10 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-[#ffb000] font-mono">GDPR Compliance</p>
                  <p className="text-sm text-[#ffb000]/70 font-mono">For international data cooperation</p>
                  <div className="mt-2 text-xs text-[#ffb000]/70 font-mono">
                    2 issues pending resolution
                  </div>
                </div>
                <FileText className="h-6 w-6 text-[#ffb000]" />
              </div>
            </div>

            <div className="rounded-none border-l-4 border-[#00ff41] bg-[#00ff41]/5 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-[#00ff41] font-mono">NIST Cybersecurity Framework</p>
                  <p className="text-sm text-[#00ff41]/70 font-mono">Best practices implementation</p>
                  <div className="mt-2 text-xs text-[#00ff41]/60 font-mono">
                    Assessment in progress
                  </div>
                </div>
                <FileText className="h-6 w-6 text-[#00ff41]" />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-none border border-[#1a1a1a] bg-[#0d0d0d] p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-[#00ff41] font-mono">Data Protection Metrics</h3>
          <div className="space-y-6">
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-medium text-[#00ff41] font-mono">PII Data Encryption</span>
                <span className="font-bold text-[#00ff41] font-mono">100%</span>
              </div>
              <div className="h-2 w-full rounded-none bg-[#1a1a1a]">
                <div className="h-2 rounded-none bg-[#00ff41] shadow-[0_0_8px_rgba(34,197,94,0.5)]" style={{ width: '100%' }}></div>
              </div>
              <p className="mt-1 text-xs text-[#4d4d4d] font-mono">
                All sensitive data encrypted at rest and in transit
              </p>
            </div>

            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-medium text-[#00ff41] font-mono">Access Control Compliance</span>
                <span className="font-bold text-[#00ff41] font-mono">96.2%</span>
              </div>
              <div className="h-2 w-full rounded-none bg-[#1a1a1a]">
                <div className="h-2 rounded-none bg-[#00ff41] shadow-[0_0_8px_rgba(34,197,94,0.5)]" style={{ width: '96.2%' }}></div>
              </div>
              <p className="mt-1 text-xs text-[#4d4d4d] font-mono">
                RBAC implemented across all systems
              </p>
            </div>

            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-medium text-[#00ff41] font-mono">Audit Log Retention</span>
                <span className="font-bold text-[#00ff41] font-mono">100%</span>
              </div>
              <div className="h-2 w-full rounded-none bg-[#1a1a1a]">
                <div className="h-2 rounded-none bg-[#00ff41] shadow-[0_0_8px_rgba(34,197,94,0.5)]" style={{ width: '100%' }}></div>
              </div>
              <p className="mt-1 text-xs text-[#4d4d4d] font-mono">
                5-year retention policy active
              </p>
            </div>

            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-medium text-[#00ff41] font-mono">Incident Response Readiness</span>
                <span className="font-bold text-[#00ff41] font-mono">94.5%</span>
              </div>
              <div className="h-2 w-full rounded-none bg-[#1a1a1a]">
                <div className="h-2 rounded-none bg-[#00ff41] shadow-[0_0_8px_rgba(34,197,94,0.5)]" style={{ width: '94.5%' }}></div>
              </div>
              <p className="mt-1 text-xs text-[#4d4d4d] font-mono">
                All playbooks tested quarterly
              </p>
            </div>

            <div className="mt-6 rounded-none bg-[#00ff41]/10 p-4 border border-[#00ff41]">
              <p className="text-sm font-semibold text-[#00ff41] font-mono">Data Breach Count (2024)</p>
              <p className="text-3xl font-bold text-[#00ff41] font-mono">0</p>
              <p className="mt-1 text-xs text-[#00ff41]/70 font-mono">
                Zero data breaches recorded this year
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Audits */}
      <div className="rounded-none border border-[#1a1a1a] bg-[#0d0d0d] p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-[#00ff41] font-mono">Recent Audit Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-none border border-[#1a1a1a] p-4 bg-[#1a1a1a]/30">
            <div className="flex items-center space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-none bg-[#00ff41]/10 border border-[#00ff41]/50">
                <CheckCircle2 className="h-5 w-5 text-[#00ff41]" />
              </div>
              <div>
                <p className="font-medium text-[#00ff41] font-mono">Quarterly Security Audit</p>
                <p className="text-sm text-[#4d4d4d] font-mono">Completed • Score: 96/100</p>
              </div>
            </div>
            <span className="text-sm text-[#4d4d4d] font-mono">{format(new Date(), 'MMM dd, yyyy')}</span>
          </div>

          <div className="flex items-center justify-between rounded-none border border-[#1a1a1a] p-4 bg-[#1a1a1a]/30">
            <div className="flex items-center space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-none bg-[#008f11]/10 border border-[#008f11]/50">
                <FileText className="h-5 w-5 text-[#008f11]" />
              </div>
              <div>
                <p className="font-medium text-[#00ff41] font-mono">Data Protection Impact Assessment</p>
                <p className="text-sm text-[#4d4d4d] font-mono">In Progress • Due: Jan 15, 2026</p>
              </div>
            </div>
            <span className="text-sm text-[#ffb000] font-mono">IN PROGRESS</span>
          </div>

          <div className="flex items-center justify-between rounded-none border border-[#1a1a1a] p-4 bg-[#1a1a1a]/30">
            <div className="flex items-center space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-none bg-[#ffb000]/10 border border-[#ffb000]/50">
                <Lock className="h-5 w-5 text-[#ffb000]" />
              </div>
              <div>
                <p className="font-medium text-[#00ff41] font-mono">Access Control Review</p>
                <p className="text-sm text-[#4d4d4d] font-mono">Scheduled • Jan 10, 2026</p>
              </div>
            </div>
            <span className="text-sm text-[#00ff41] font-mono">UPCOMING</span>
          </div>
        </div>
      </div>
    </div>
  );
}
