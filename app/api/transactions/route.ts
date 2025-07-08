import connectDB from '@/lib/mongodb';
import Transaction from '@/models/transaction';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    await connectDB();
    const { amount, description, date, category } = await req.json();

    if (!amount || !description || !date || !category) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const transaction = await Transaction.create({
      amount,
      description,
      date,
      category,
    });

    return NextResponse.json(transaction);
  } catch (_error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const transactions = await Transaction.find().sort({ date: -1 });
    return NextResponse.json(transactions);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
