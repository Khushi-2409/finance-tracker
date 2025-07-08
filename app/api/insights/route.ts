import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Transaction from '@/models/transaction';
import Budget from '@/lib/models/Budget';

export async function GET() {
  await connectDB();

  const transactions = await Transaction.find({});
  const budgets = await Budget.find({});

  const thisMonth = new Date().getMonth();
  const monthlyTransactions = transactions.filter(
    (tx) => new Date(tx.date).getMonth() === thisMonth
  );

  const totalSpent = monthlyTransactions.reduce((sum, tx) => sum + tx.amount, 0);

  const categorySums: { [key: string]: number } = {};
  for (const tx of monthlyTransactions) {
    categorySums[tx.category] = (categorySums[tx.category] || 0) + tx.amount;
  }

  const topCategory = Object.entries(categorySums).reduce(
    (max, curr) => (curr[1] > max[1] ? curr : max),
    ['', 0]
  );

  const totalBudget = budgets.reduce((sum, b) => sum + b.amount, 0);

  return NextResponse.json({
    totalSpent,
    topCategory: topCategory[0],
    topCategoryAmount: topCategory[1],
    overBudget: totalSpent > totalBudget,
    budgetLeft: totalBudget - totalSpent,
  });
}
