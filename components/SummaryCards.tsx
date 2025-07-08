'use client';

interface Transaction {
  amount: number;
  category: string;
  description: string;
  date: string;
}

export default function SummaryCards({ data }: { data: Transaction[] }) {
  const total = data.reduce((sum, tx) => sum + tx.amount, 0);
  const categoryTotals = data.reduce((acc: Record<string, number>, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
    return acc;
  }, {});

  const recent = [...data]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 w-full px-2 sm:px-0">
      {/* Total Expenses */}
      <div className="bg-white/70 p-5 sm:p-6 rounded-2xl shadow-md hover:shadow-xl transition-transform hover:scale-[1.02] flex flex-col justify-between">
        <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">💸 Total Expenses</h4>
        <p className="text-xl sm:text-2xl font-bold text-red-600">₹{total}</p>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white/70 p-5 sm:p-6 rounded-2xl shadow-md hover:shadow-xl transition-transform hover:scale-[1.02] flex flex-col justify-between">
        <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">📂 Category Breakdown</h4>
        <ul className="text-sm sm:text-base text-gray-700 mt-2 space-y-1">
          {Object.entries(categoryTotals).map(([cat, amt]) => (
            <li key={cat}>
              {cat}: <span className="font-semibold">₹{amt}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white/70 p-5 sm:p-6 rounded-2xl shadow-md hover:shadow-xl transition-transform hover:scale-[1.02] flex flex-col justify-between">
        <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">🕒 Recent Transactions</h4>
        <ul className="text-sm sm:text-base text-gray-700 mt-2 space-y-1">
          {recent.map((tx, idx) => (
            <li key={idx}>
              {tx.description} – ₹{tx.amount}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
