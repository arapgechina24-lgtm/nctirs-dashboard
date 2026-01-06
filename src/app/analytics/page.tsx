'use client';

import { useEffect, useState } from 'react';
import { Brain, Cpu, Zap, TrendingUp } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import ThreatBarChart from '@/components/charts/ThreatBarChart';
import type { MLModelMetrics } from '@/types';

export default function AnalyticsPage() {
  const [models, setModels] = useState<MLModelMetrics[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/ml-models');
        const data = await res.json();
        setModels(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch ML models:', error);
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-lg text-cyan-400 animate-pulse">Loading AI analytics...</div>
      </div>
    );
  }

  const avgAccuracy = models.reduce((acc, m) => acc + m.accuracy, 0) / models.length;
  const avgInferenceTime = models.reduce((acc, m) => acc + m.inferenceTime, 0) / models.length;
  const activeModels = models.filter(m => m.status === 'active').length;

  const accuracyData = models.map(m => ({
    name: m.modelName.split(' ')[0],
    value: Math.round(m.accuracy * 100),
    color: m.accuracy > 0.95 ? '#10b981' : m.accuracy > 0.90 ? '#3b82f6' : '#f59e0b',
  }));

  const performanceData = models.map(m => ({
    name: m.modelName.split(' ')[0],
    value: m.inferenceTime,
    color: '#6366f1',
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#00ff41] tracking-wide font-mono">&gt; AI Threat Analytics</h1>
        <p className="mt-2 text-sm text-[#00ff41]/70 font-mono">
          Machine learning model performance and threat prediction insights
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Active Models"
          value={activeModels}
          subtitle={`${models.length} total models`}
          icon={<Brain className="h-6 w-6" />}
          colorClass="bg-[#00ff41]"
        />
        <StatCard
          title="Avg Accuracy"
          value={`${(avgAccuracy * 100).toFixed(1)}%`}
          subtitle="Across all models"
          icon={<TrendingUp className="h-6 w-6" />}
          colorClass="bg-[#00ff41]"
          trend={{ value: 2.3, isPositive: true }}
        />
        <StatCard
          title="Avg Inference Time"
          value={`${avgInferenceTime.toFixed(0)}ms`}
          subtitle="Response latency"
          icon={<Zap className="h-6 w-6" />}
          colorClass="bg-[#ffb000]"
        />
        <StatCard
          title="Predictions Today"
          value="142.5K"
          subtitle="Threat classifications"
          icon={<Cpu className="h-6 w-6" />}
          colorClass="bg-[#00ff41]"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ThreatBarChart data={accuracyData} title="Model Accuracy (%)" />
        <ThreatBarChart data={performanceData} title="Inference Time (ms)" />
      </div>

      {/* Model Details */}
      <div className="rounded-none border border-[#1a1a1a] bg-[#0d0d0d] shadow-lg">
        <div className="border-b border-[#1a1a1a] px-6 py-4">
          <h3 className="text-lg font-semibold text-[#00ff41] uppercase tracking-wide font-mono">ML Model Performance</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-transparent border-b border-[#1a1a1a]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#00ff41]/70 font-mono">
                  Model Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#00ff41]/70 font-mono">
                  Version
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#00ff41]/70 font-mono">
                  Accuracy
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#00ff41]/70 font-mono">
                  Precision
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#00ff41]/70 font-mono">
                  Recall
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#00ff41]/70 font-mono">
                  F1 Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#00ff41]/70 font-mono">
                  Inference
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#00ff41]/70 font-mono">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a1a1a] bg-[#0d0d0d]">
              {models.map((model) => (
                <tr key={model.modelName} className="hover:bg-[#1a1a1a]/50 transition-colors">
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-[#00ff41] font-mono">
                    {model.modelName}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-[#00ff41]/70 font-mono">
                    {model.version}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-[#00ff41] font-mono">
                    {(model.accuracy * 100).toFixed(1)}%
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-[#00ff41] font-mono">
                    {(model.precision * 100).toFixed(1)}%
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-[#00ff41] font-mono">
                    {(model.recall * 100).toFixed(1)}%
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-[#00ff41] font-mono">
                    {(model.f1Score * 100).toFixed(1)}%
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-[#00ff41] font-mono">
                    {model.inferenceTime}ms
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`rounded-none px-3 py-1 text-xs font-semibold border font-mono ${model.status === 'active'
                          ? 'border-[#00ff41] text-[#00ff41]'
                          : model.status === 'training'
                            ? 'border-[#ffb000] text-[#ffb000]'
                            : 'border-[#4d4d4d] text-[#4d4d4d]'
                        }`}
                    >
                      {model.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Insights */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-none border border-[#1a1a1a] bg-[#0d0d0d] p-6 shadow-lg">
          <h3 className="mb-4 text-lg font-semibold text-[#00ff41] uppercase tracking-wide font-mono">Threat Predictions</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-sm border border-[#cc0000] bg-[#cc0000]/10 p-4">
              <div>
                <p className="font-semibold text-[#cc0000] font-mono">High Risk Period Ahead</p>
                <p className="text-sm text-[#cc0000]/70 font-mono">Next 48 hours</p>
              </div>
              <div className="text-2xl font-bold text-[#cc0000] font-mono">85%</div>
            </div>
            <div className="flex items-center justify-between rounded-sm border border-[#ffb000] bg-[#ffb000]/10 p-4">
              <div>
                <p className="font-semibold text-[#ffb000] font-mono">Phishing Campaign Expected</p>
                <p className="text-sm text-[#ffb000]/70 font-mono">Government sector</p>
              </div>
              <div className="text-2xl font-bold text-[#ffb000] font-mono">72%</div>
            </div>
            <div className="flex items-center justify-between rounded-sm border border-[#00ff41] bg-[#00ff41]/10 p-4">
              <div>
                <p className="font-semibold text-[#00ff41] font-mono">DDoS Activity Rising</p>
                <p className="text-sm text-[#00ff41]/70 font-mono">Financial infrastructure</p>
              </div>
              <div className="text-2xl font-bold text-[#00ff41] font-mono">68%</div>
            </div>
          </div>
        </div>

        <div className="rounded-none border border-[#1a1a1a] bg-[#0d0d0d] p-6 shadow-lg">
          <h3 className="mb-4 text-lg font-semibold text-[#00ff41] uppercase tracking-wide font-mono">Model Training Queue</h3>
          <div className="space-y-3">
            <div className="rounded-none border border-[#1a1a1a] bg-[#1a1a1a]/30 p-4">
              <div className="flex items-center justify-between">
                <span className="font-medium text-[#00ff41] font-mono">Advanced APT Detector</span>
                <span className="text-sm text-[#4d4d4d] font-mono">SCHEDULED</span>
              </div>
              <div className="mt-2 h-2 rounded-none bg-[#1a1a1a]">
                <div className="h-2 rounded-none bg-[#008f11]" style={{ width: '0%' }}></div>
              </div>
            </div>
            <div className="rounded-none border border-[#1a1a1a] bg-[#1a1a1a]/30 p-4">
              <div className="flex items-center justify-between">
                <span className="font-medium text-[#00ff41] font-mono">Zero-Day Predictor</span>
                <span className="text-sm text-[#ffb000] font-mono">TRAINING</span>
              </div>
              <div className="mt-2 h-2 rounded-none bg-[#1a1a1a]">
                <div className="h-2 rounded-none bg-[#ffb000] shadow-[0_0_8px_rgba(234,179,8,0.5)]" style={{ width: '64%' }}></div>
              </div>
            </div>
            <div className="rounded-none border border-[#1a1a1a] bg-[#1a1a1a]/30 p-4">
              <div className="flex items-center justify-between">
                <span className="font-medium text-[#00ff41] font-mono">Behavioral Anomaly v2</span>
                <span className="text-sm text-[#00ff41] font-mono">COMPLETED</span>
              </div>
              <div className="mt-2 h-2 rounded-none bg-[#1a1a1a]">
                <div className="h-2 rounded-none bg-[#00ff41] shadow-[0_0_8px_rgba(34,197,94,0.5)]" style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
