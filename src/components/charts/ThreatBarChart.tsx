'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ThreatBarChartProps {
  data: Array<{ name: string; value: number; color: string }>;
  title: string;
}

export default function ThreatBarChart({ data, title }: ThreatBarChartProps) {
  return (
    <div className="rounded-lg border border-gray-800 bg-[#111827] p-6 shadow-lg backdrop-blur-sm">
      <h3 className="mb-4 text-lg font-semibold text-gray-100 uppercase tracking-wide">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey="name"
            fontSize={12}
            stroke="#9ca3af"
            tick={{ fill: '#9ca3af' }}
          />
          <YAxis
            fontSize={12}
            stroke="#9ca3af"
            tick={{ fill: '#9ca3af' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              border: '1px solid #374151',
              borderRadius: '8px',
              color: '#e5e7eb'
            }}
          />
          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
