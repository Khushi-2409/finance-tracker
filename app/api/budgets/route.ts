import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Budget from '@/lib/models/Budget';

export async function POST(req: Request) {
  try {
    await connectDB();
    const { category, amount, month } = await req.json();

    if (!category || !amount || !month) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const budget = await Budget.create({ category, amount, month });
    return NextResponse.json(budget, { status: 201 });
  } catch (error) {
    console.error('Error creating budget:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
