'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';

interface Props {
  data: {
    amount: number;
    category: string;
  }[];
}

const COLORS = [
  '#845EC2', '#D65DB1', '#FF6F91', '#FF9671',
  '#FFC75F', '#F9F871', '#008F7A', '#0081CF'
];

export default function CategoryPieChart({ data }: Props) {
  const [isMobile, setIsMobile] = useState(false);

  // Check screen width to detect mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize(); // Set on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const grouped = data.reduce((acc: Record<string, number>, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
    return acc;
  }, {});

  const chartData = Object.entries(grouped).map(([category, amount]) => ({
    name: category,
    value: amount,
  }));

  return (
    <div className="w-full bg-white/60 rounded-2xl shadow-md p-4 sm:p-6 mb-10 hover:shadow-xl transition-transform hover:scale-[1.02]">
      <h2 className="text-lg sm:text-xl font-bold text-center text-gray-800 mb-4">
        📊 Category-wise Spending
      </h2>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Chart */}
        <div className="w-full h-[300px] sm:h-[400px] lg:w-2/3">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={isMobile ? 80 : 100}
                paddingAngle={4}
                dataKey="value"
                label={isMobile ? false : ({ name, percent }) =>
                  `${name} (${((percent ?? 0) * 100).toFixed(0)}%)`
                }
              >
                {chartData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Custom Legend */}
        <div className="w-full lg:w-1/3 flex flex-col gap-2 text-sm text-gray-800">
          {chartData.map((entry, index) => (
            <div key={index} className="flex items-center gap-2">
              <span
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></span>
              <span className="flex-1">{entry.name}</span>
              <span className="font-semibold">₹{entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
