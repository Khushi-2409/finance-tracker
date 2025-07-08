'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { format } from 'date-fns';

interface Transaction {
    _id: string;
    amount: number;
    description: string;
    date: string;
    category: string;
}

interface Props {
    reloadSignal: number;
}

export default function TransactionList({ reloadSignal }: Props) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        fetch('/api/transactions')
            .then(async (res) => {
                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(`Failed to fetch transactions: ${res.status} - ${text}`);
                }
                return res.json();
            })
            .then((data) => setTransactions(data))
            .catch((err) => {
                console.error('Error fetching transactions:', err);
            });
    }, [reloadSignal]);


    const handleDelete = async (id: string) => {
        try {
            const res = await fetch(`/api/transactions/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                setTransactions((prev) => prev.filter((t) => t._id !== id));
            }
        } catch (error) {
            console.error('Error deleting transaction:', error);
        }
    };

    return (
        <section className="w-full">
            <h2 className="text-2xl font-semibold text-[#0f0667] text-center mb-6">
                📋 Your Transactions
            </h2>

            {transactions.length === 0 ? (
                <p className="text-gray-500 text-center">No transactions yet.</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 w-full px-2 sm:px-4">
                    {transactions.map((tx) => (
                        <Card
                            key={tx._id}
                            className="w-full p-5 bg-white/80 backdrop-blur-lg border border-gray-300 rounded-2xl shadow-md hover:shadow-xl transition-transform hover:scale-[1.02] flex flex-col"
                        >
                            {/* Top content */}
                            <div className="flex justify-between items-start mb-4">
                                <div className="space-y-1">
                                    <p className="text-sm sm:text-base font-semibold text-gray-800 break-words">
                                        {tx.description}
                                    </p>
                                    <p className="text-sm sm:text-base text-gray-700 font-medium">₹{tx.amount}</p>
                                    <span className="inline-block bg-purple-100 text-purple-800 text-xs font-semibold px-2 py-1 rounded-full mt-1">
                                        🏷️ {tx.category}
                                    </span>
                                </div>


                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-red-500 hover:text-red-700"
                                    onClick={() => handleDelete(tx._id)}
                                >
                                    <Trash2 size={18} />
                                </Button>
                            </div>

                            {/* Pinned Date */}
                            <p className="text-sm text-gray-500 mt-auto pt-2 border-t border-gray-200">
                                {format(new Date(tx.date), 'dd MMM yyyy')}
                            </p>
                        </Card>
                    ))}
                </div>
            )}
        </section>
    );
}
