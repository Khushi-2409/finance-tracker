'use client';

import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Card, CardContent } from '@/components/ui/card';

export default function BudgetComparisonChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/budget/compare')
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <Card className="w-full bg-white/80 backdrop-blur-lg border border-gray-300 rounded-2xl shadow-md mb-10 hover:shadow-xl transition-transform hover:scale-[1.01]">
      <CardContent className="p-4 sm:p-6">
        <h2 className="text-lg sm:text-2xl font-semibold text-center text-gray-800 mb-4">
          📊 Budget vs Actual
        </h2>

        <div className="w-full h-[250px] sm:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
              barGap={8}
            >
              <XAxis
                dataKey="category"
                tick={{ fontSize: 12 }}
                interval={0}
                angle={-20}
                textAnchor="end"
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', marginBottom: '-25px', alignItems: 'center' }} />
              <Bar dataKey="budget" fill="#8884d8" radius={[4, 4, 0, 0]} />
              <Bar dataKey="actual" fill="#82ca9d" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
