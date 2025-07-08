'use client';

import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/card';

interface Transaction {
    amount: number;
    date: string;
}

export default function MonthlyChart() {
    const [data, setData] = useState<{ month: string; total: number }[]>([]);

    useEffect(() => {
        fetch('/api/transactions')
            .then((res) => res.json())
            .then((transactions: Transaction[]) => {
                const grouped: { [month: string]: number } = {};
                transactions.forEach((t) => {
                    const month = new Date(t.date).toLocaleString('default', { month: 'short', year: 'numeric' });
                    grouped[month] = (grouped[month] || 0) + t.amount;
                });

                const formatted = Object.entries(grouped).map(([month, total]) => ({ month, total }));
                setData(formatted);
            });
    }, []);

    return (
        <Card className="w-full bg-white/80 backdrop-blur border border-gray-300 shadow-lg rounded-2xl mb-10 hover:shadow-xl transition-transform hover:scale-[1.02]">
            <div className="p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold mb-4 text-center text-gray-800">
                    📊 Monthly Expenses
                </h2>
                <div className="w-full h-[300px] sm:h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                            <YAxis tick={{ fontSize: 10 }} />
                            <Tooltip />
                            <Bar dataKey="total" fill="#0a1f4e" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </Card>
    );
}
