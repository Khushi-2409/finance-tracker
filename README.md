# 💰 Finance Tracker

A full-stack personal finance dashboard built with **Next.js**, **Tailwind CSS**, and **MongoDB**. A clean, responsive UI to track transactions, visualize spending, set budgets, and gain insights into your financial habits.

---

## 🚀 Features

### Stage 1: Core Functionality
- Add/Edit/Delete transactions with:  
  - Amount  
  - Description  
  - Date  
  - Category
- View transactions in a responsive, multi-column layout
- Hover effects, polished styling, and mobile-friendly design

### Stage 2: Analytics & Insights
- **Predefined categories** like Food, Travel, Utilities, Shopping, Entertainment, and Others  
- **Category-wise spending pie chart** with custom legends  
- **Summary cards** for:  
  - Total Expenses  
  - Category breakdown  
  - Most recent transactions  
- Intuitive layout with Tailwind’s responsive grid

### Stage 3: Budgeting & Comparisons
- Set and store **monthly category budgets**
- **Budget vs actual bar comparison chart**
- **Monthly expense bar chart**
- **Spending Insights** panel:
  - Total spent this month  
  - Top spending category  
  - Budget status (over/under)  

---

## 🛠️ Tech Stack

- **Next.js App Router** (latest v15)
- **React** with Server & Client Components
- **MongoDB + Mongoose** for backend data management
- **Tailwind CSS** for styling and layouts
- **Recharts** for interactive data visualizations
- **ESLint** & **TypeScript** for code quality and type safety

---

## 📝 Getting Started

1. **Clone the repo**

   git clone https://github.com/Khushi-2409/finance-tracker.git
   cd finance-tracker


2. **Install dependencies**


   npm install


3. **Configure environment**
   Create `.env.local`:

   MONGODB_URI=mongodb+srv://<USERNAME>:<PASSWORD>@<cluster>.mongodb.net/finance?retryWrites=true&w=majority

4. **Run the development server**

   npm run dev
   ```

   Visit [http://localhost:3000](http://localhost:3000)

5. **Use the app**

   * Add transactions
   * Set budgets
   * View analytics and insights

---

## 📂 Repository Structure
```
├── app/               # Next.js App Router pages & components
│   ├── api/           # Backend API routes
│   ├── page.tsx       # Main dashboard page
│   └── other pages…   
├── components/        # UI components (cards, forms, charts)
├── lib/               # Database connection & utilities
├── models/            # Mongoose models
├── styles/            # Global styles and Tailwind config
└── public/            # Static assets (icons, images)

---

## 💡 Usage Tips

* Add a new transaction via the form for expense/income tracking
* Click "Set Monthly Budget" to allocate spending limits by category
* Visualize spending breakdowns with pie and bar charts
* Insights tell you where you're over or under budget

---

## 👩‍💻 Contributing

Contributions are welcome! Please:

1. Fork the repo
2. Create a feature branch (`git checkout -b my-feature`)
3. Commit your changes (`git commit -m "feat: description"`)
4. Push (`git push origin my-feature`)
5. Create a Pull Request

---

## 📄 License

MIT © Khushi

---

## 📬 Questions?

Feel free to open an issue or pull request. I'm always happy to help!

---

Enjoy tracking your finances with clarity and style! 💎
