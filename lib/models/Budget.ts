import mongoose, { Schema, models } from 'mongoose';

const BudgetSchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  month: {
    type: String, 
    required: true,
  },
});

const Budget = models.Budget || mongoose.model('Budget', BudgetSchema);
export default Budget;
