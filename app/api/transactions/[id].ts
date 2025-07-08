import dbConnect from '@/lib/mongodb';
import Transaction from '@/models/transaction';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === 'PUT') {
    const updated = await Transaction.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json(updated);
  }

  if (req.method === 'DELETE') {
    await Transaction.findByIdAndDelete(id);
    return res.status(204).end();
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
