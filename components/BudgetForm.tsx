'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const categories = ['Food', 'Transport', 'Entertainment', 'Health', 'Shopping', 'Travel'];

export default function BudgetForm() {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [month, setMonth] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/budgets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category, amount: +amount, month }),
    });

    if (res.ok) {
      setMessage('✅ Budget added successfully!');
      setCategory('');
      setAmount('');
      setMonth('');
    } else {
      const data = await res.json();
      setMessage(data.error || '❌ Something went wrong');
    }
  };

  return (
    <Card className="w-full max-w-xl mx-auto mb-10 bg-white/70 backdrop-blur border border-gray-200 rounded-2xl shadow hover:scale-[1.01] transition">
      <CardContent className="p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-800 text-center">
          📊 Set Monthly Budget
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Category */}
          <div className="flex flex-col space-y-1">
            <Label className="text-sm sm:text-base">Category</Label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-12 px-3 rounded-lg border border-gray-300 text-sm sm:text-base bg-white/80 backdrop-blur"
              required
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Amount */}
          <div className="flex flex-col space-y-1">
            <Label className="text-sm sm:text-base">Amount (₹)</Label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="h-12 text-sm sm:text-base"
              required
            />
          </div>

          {/* Month */}
          <div className="flex flex-col space-y-1">
            <Label className="text-sm sm:text-base">Month</Label>
            <Input
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="h-12 text-sm sm:text-base"
              required
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full h-12 text-sm sm:text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
          >
            Save Budget
          </Button>

          {message && <p className="text-center text-sm text-gray-700">{message}</p>}
        </form>
      </CardContent>
    </Card>
  );
}
