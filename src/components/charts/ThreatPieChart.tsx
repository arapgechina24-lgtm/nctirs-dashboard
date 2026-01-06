'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface ThreatPieChartProps {
  data: Array<{ name: string; value: number; color: string }>;
  title: string;
}

export default function ThreatPieChart({ data, title }: ThreatPieChartProps) {
  return (
    <div className="rounded-lg border border-gray-800 bg-[#111827] p-6 shadow-lg backdrop-blur-sm">
      <h3 className="mb-4 text-lg font-semibold text-gray-100 uppercase tracking-wide">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
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
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
