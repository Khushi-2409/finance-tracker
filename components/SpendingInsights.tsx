'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface Insights {
  totalSpent: number;
  topCategory: string;
  topCategoryAmount: number;
  overBudget: boolean;
  budgetLeft: number;
}

export default function SpendingInsights() {
  const [insights, setInsights] = useState<Insights | null>(null);

  useEffect(() => {
    fetch('/api/insights')
      .then((res) => res.json())
      .then((data) => setInsights(data));
  }, []);

  if (!insights) return null;

  return (
    <Card className="w-full bg-white/60 backdrop-blur border border-gray-200 shadow-xl rounded-2xl mb-6 hover:shadow-2xl hover:scale-[1.01] transition-all">
      <CardContent className="p-4 sm:p-6 space-y-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 text-center">
          📊 Spending Insights
        </h2>
        <ul className="space-y-2 text-sm sm:text-base text-gray-700">
          <li>
            💸 <strong>Total Spent:</strong> ₹{insights.totalSpent}
          </li>
          <li>
            🏆 <strong>Top Category:</strong> {insights.topCategory} (₹{insights.topCategoryAmount})
          </li>
          <li>
            {insights.overBudget ? (
              <span className="text-red-600">
                ⚠️ You are over budget by ₹{Math.abs(insights.budgetLeft)}
              </span>
            ) : (
              <span className="text-green-600">
                ✅ You are under budget. ₹{insights.budgetLeft} left
              </span>
            )}
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
