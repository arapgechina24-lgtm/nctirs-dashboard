'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface TimeSeriesChartProps {
  data: Array<{ time: string; value: number }>;
  title: string;
  color?: string;
}

export default function TimeSeriesChart({ data, title, color = '#06b6d4' }: TimeSeriesChartProps) {
  return (
    <div className="rounded-lg border border-gray-800 bg-[#111827] p-6 shadow-lg backdrop-blur-sm">
      <h3 className="mb-4 text-lg font-semibold text-gray-100 uppercase tracking-wide">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey="time"
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
          <Legend
            wrapperStyle={{ color: '#9ca3af' }}
          />
          <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
