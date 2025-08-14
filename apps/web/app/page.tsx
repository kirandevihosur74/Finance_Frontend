import { Suspense } from "react";
import CategoryInlineEdit from "./_components/CategoryInlineEdit";
import ChatPanel from "./_components/ChatPanel";
// Using mock data for now; real types will be used when connecting to backend
import { getSafeToSpend, getUpcomingBills, getCashflowMTD, getTopMerchants, getCreditUtilization, getMonthlyDigest, getTransactions } from "./lib/mock";

export default function Home() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      <div className="lg:col-span-4 order-first lg:order-none">
        <ChatPanel />
      </div>
      <div className="lg:col-span-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
      <Card title="Safe to Spend">
        <SafeToSpendCard />
      </Card>
      <Card title="Upcoming Bills">
        <UpcomingBillsList />
      </Card>
      <Card title="Cashflow (MTD)">
        <CashflowCard />
      </Card>
      <Card title="Top Merchants (90d)">
        <TopMerchantsList />
      </Card>
      <Card title="Credit Utilization">
        <CreditUtilizationCard />
      </Card>
      <Card title="Monthly Digest">
        <MonthlyDigestCard />
      </Card>
        <div className="md:col-span-2 lg:col-span-2">
          <Card title="Transactions">
            <TransactionsTable />
          </Card>
        </div>
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="group rounded-2xl border border-gray-200/70 bg-white/80 p-5 shadow-sm ring-1 ring-black/[0.02] transition hover:shadow-md dark:border-gray-800/60 dark:bg-gray-900/70">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-semibold tracking-tight text-gray-900 dark:text-gray-100">{title}</h2>
      </div>
      <Suspense fallback={<div className="skeleton h-20 w-full" />}>{children}</Suspense>
    </div>
  );
}

function SafeToSpendCard() {
  return (
    <section>
      <div className="text-3xl font-bold">{Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(getSafeToSpend().amount)}</div>
    </section>
  );
}

function UpcomingBillsList() {
  const bills = getUpcomingBills();
  return (
    <ul className="space-y-2">
      {bills.slice(0,5).map((b) => (
        <li key={b.id} className="flex items-center justify-between text-sm">
          <span className="truncate">{b.name}</span>
          <span className="text-gray-500">{new Date(b.dueDate).toLocaleDateString()}</span>
          <span>{Intl.NumberFormat(undefined, { style: 'currency', currency: b.currency || 'USD' }).format(b.amount)}</span>
        </li>
      ))}
    </ul>
  );
}

function CashflowCard() {
  const d = getCashflowMTD();
  return (
    <div className="text-sm">
      <div className="mb-1 text-gray-600 dark:text-gray-300">Income: {Intl.NumberFormat(undefined, { style: 'currency', currency: d.currency || 'USD' }).format(d.income)}</div>
      <div className="mb-1 text-gray-600 dark:text-gray-300">Expenses: {Intl.NumberFormat(undefined, { style: 'currency', currency: d.currency || 'USD' }).format(d.expenses)}</div>
      <div className="font-medium">Net: {Intl.NumberFormat(undefined, { style: 'currency', currency: d.currency || 'USD' }).format(d.net)}</div>
    </div>
  );
}

function TopMerchantsList() {
  const rows = getTopMerchants();
  return (
    <ul className="space-y-2">
      {rows.slice(0,5).map((m) => (
        <li key={m.merchantId} className="flex items-center justify-between text-sm">
          <span className="truncate">{m.name}</span>
          <span className="text-gray-500">{m.count} tx</span>
          <span>{Intl.NumberFormat(undefined, { style: 'currency', currency: m.currency || 'USD' }).format(m.totalSpend)}</span>
        </li>
      ))}
    </ul>
  );
}

function CreditUtilizationCard() {
  const d = getCreditUtilization();
  return (
    <div className="text-sm">
      <div className="mb-1">Utilization: <span className="font-medium">{Math.round(d.utilizationPercent)}%</span></div>
      <div className="mb-1">Limit: {Intl.NumberFormat().format(d.totalCreditLimit)}</div>
      <div>Balance: {Intl.NumberFormat().format(d.totalBalance)}</div>
    </div>
  );
}

function MonthlyDigestCard() {
  const d = getMonthlyDigest();
  return (
    <div className="text-sm">
      <div className="mb-1">Month: {d.month}</div>
      <div className="mb-1">Income: {Intl.NumberFormat().format(d.totalIncome)}</div>
      <div className="mb-1">Expenses: {Intl.NumberFormat().format(d.totalExpenses)}</div>
      <div>Savings Rate: {Math.round(d.savingsRatePercent)}%</div>
    </div>
  );
}

function TransactionsTable() {
  const rows = getTransactions();
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200/70 bg-white/80 shadow-sm dark:border-gray-800/60 dark:bg-gray-900/70">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500">
            <th className="px-3 py-2">Date</th>
            <th className="px-3 py-2">Description</th>
            <th className="px-3 py-2">Amount</th>
            <th className="px-3 py-2">Category</th>
          </tr>
        </thead>
        <tbody>
          {rows.slice(0,20).map((t) => (
            <tr key={t.id} className="border-t border-gray-200/70 dark:border-gray-800/60">
              <td className="px-3 py-2 whitespace-nowrap">{new Date(t.date).toLocaleDateString()}</td>
              <td className="px-3 py-2">{t.description}</td>
              <td className={`px-3 py-2 whitespace-nowrap font-medium ${t.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                {Intl.NumberFormat(undefined, { style: 'currency', currency: t.currency || 'USD' }).format(t.amount)}
              </td>
              <td className="px-3 py-2"><CategoryInlineEdit id={t.id} category={t.category} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// CategoryInlineEdit moved to client component in ./_components/CategoryInlineEdit

// Removed network fetch; using mock data above
