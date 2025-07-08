import mongoose, { Schema, models, model } from 'mongoose';

const TransactionSchema = new Schema({
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ['Food', 'Transport', 'Entertainment', 'Health', 'Shopping', 'Travel', 'Others'],
  },
});

// 🛠 Fix: override the cached model safely
export default models.Transaction || model('Transaction', TransactionSchema);
