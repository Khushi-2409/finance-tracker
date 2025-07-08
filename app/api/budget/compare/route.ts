import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Budget from '@/lib/models/Budget';
import Transaction from '@/models/transaction';
import { startOfMonth, endOfMonth } from 'date-fns';

export async function GET() {
  await connectDB();

  const currentMonth = new Date();
  const start = startOfMonth(currentMonth);
  const end = endOfMonth(currentMonth);

  const budgets = await Budget.find({});
  const transactions = await Transaction.find({
    date: { $gte: start, $lte: end }
  });

  const grouped: Record<string, number> = {};
  transactions.forEach(tx => {
    grouped[tx.category] = (grouped[tx.category] || 0) + tx.amount;
  });

  const result = budgets.map(b => ({
    category: b.category,
    budget: b.amount,
    actual: grouped[b.category] || 0,
  }));

  return NextResponse.json(result);
}
