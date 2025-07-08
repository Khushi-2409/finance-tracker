'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

interface Props {
    onAdd: () => void;
}

export default function TransactionForm({ onAdd }: Props) {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!amount || !description || !date || !category) {
            setError('All fields are required');
            return;
        }

        const res = await fetch('/api/transactions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: +amount, description, date, category }),
        });

        if (res.ok) {
            setAmount('');
            setDescription('');
            setDate('');
            setCategory('');
            setError('');
            onAdd();
        } else {
            const data = await res.json();
            setError(data.error || 'Something went wrong');
        }
    };

    return (
        <Card className="w-full max-w-2xl mx-auto shadow-2xl rounded-3xl backdrop-blur-xl bg-white/60 border border-gray-200 hover:shadow-xl transition-transform hover:scale-[1.02]">
            <CardContent className="px-4 sm:px-8 py-6 sm:py-10 space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">➕ Add Transaction</h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="relative">
                        <Input
                            id="amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder=" "
                            className="peer h-12 sm:h-14 w-full rounded-xl px-4 pt-6 text-base sm:text-lg bg-white/70 backdrop-blur-md border border-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                        <Label
                            htmlFor="amount"
                            className="absolute left-4 top-2 text-gray-600 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all"
                        >
                            Amount (₹)
                        </Label>
                    </div>

                    <div className="relative">
                        <Input
                            id="desc"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder=" "
                            className="peer h-12 sm:h-14 w-full rounded-xl px-4 pt-6 text-base sm:text-lg bg-white/70 backdrop-blur-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <Label
                            htmlFor="desc"
                            className="absolute left-4 top-2 text-gray-600 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all"
                        >
                            Description
                        </Label>
                    </div>

                    <div className="relative">
                        <Input
                            id="date"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            placeholder=" "
                            className="peer h-12 sm:h-14 w-full rounded-xl px-4 pt-6 text-base sm:text-lg bg-white/70 backdrop-blur-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <Label
                            htmlFor="date"
                            className="absolute left-4 top-2 text-gray-600 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all"
                        >
                            Date
                        </Label>
                    </div>

                    <div className="relative">
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="peer h-12 sm:h-14 w-full rounded-xl px-4 pt-5 text-base sm:text-lg bg-white/70 backdrop-blur-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="">Select Category</option>
                            <option value="Food"> Food</option>
                            <option value="Transport"> Transport</option>
                            <option value="Entertainment"> Entertainment</option>
                            <option value="Health"> Health</option>
                            <option value="Shopping"> Shopping</option>
                            <option value="Travel"> Travel</option>
                            <option value="Others"> Others</option>
                        </select>
                        <Label
                            htmlFor="category"
                            className="absolute left-4 top-2 text-gray-600 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all"
                        >
                            Category
                        </Label>
                    </div>

                    {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                    <Button
                        type="submit"
                        className="w-full h-12 sm:h-14 text-base sm:text-lg font-semibold bg-[#0a1f4e] hover:bg-[#E39FF6] text-white rounded-xl transition-all duration-200"
                    >
                        Add Transaction
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
