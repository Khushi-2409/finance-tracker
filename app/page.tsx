'use client';

import { useEffect, useState } from 'react';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import CategoryPieChart from '@/components/CategoryPieChart';
import SummaryCards from '@/components/SummaryCards';
import MonthlyChart from '@/components/MonthlyChart';
import BudgetForm from '@/components/BudgetForm';
import BudgetComparisonChart from '@/components/BudgetComparisonChart';
import SpendingInsights from '@/components/SpendingInsights';

export default function HomePage() {
    const [reload, setReload] = useState(0);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetch('/api/transactions')
            .then((res) => res.json())
            .then(setTransactions);
    }, [reload]);

    return (
        <main className="relative min-h-screen bg-gradient-to-br from-[#0f0667] via-white to-[#0f0667] px-2 sm:px-4 py-8 sm:py-10">
            <div className="w-full max-w-6xl mx-auto space-y-8 sm:space-y-10 px-2 sm:px-6 lg:px-8">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white tracking-tight break-words">
                    💰 Personal Finance Dashboard
                </h1>

                <TransactionForm onAdd={() => setReload(reload + 1)} />
                <SummaryCards data={transactions} />
                <BudgetForm />
                <CategoryPieChart data={transactions} />
                <TransactionList reloadSignal={reload} />
                <BudgetComparisonChart />
                <MonthlyChart />
                <SpendingInsights />
            </div>
        </main>
    );
}
