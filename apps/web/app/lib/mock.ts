export function getSafeToSpend(): { amount: number; currency: string; horizonDays: number } {
  return { amount: 1243.56, currency: "USD", horizonDays: 7 };
}

export function getUpcomingBills(): Array<{ id: string; name: string; dueDate: string; amount: number; currency: string; status: 'due' | 'paid' | 'overdue' }> {
  return [
    { id: "1", name: "Rent", dueDate: new Date().toISOString(), amount: 1800, currency: "USD", status: "due" },
    { id: "2", name: "Internet", dueDate: new Date(Date.now() + 3*864e5).toISOString(), amount: 60, currency: "USD", status: "due" },
    { id: "3", name: "Electric", dueDate: new Date(Date.now() + 5*864e5).toISOString(), amount: 95.12, currency: "USD", status: "due" },
  ];
}

export function getCashflowMTD(): { income: number; expenses: number; net: number; currency: string } {
  return { income: 5200, expenses: 3185.33, net: 2014.67, currency: "USD" };
}

export function getTopMerchants(): Array<{ merchantId: string; name: string; totalSpend: number; count: number; currency: string }> {
  return [
    { merchantId: "m1", name: "Amazon", totalSpend: 425.22, count: 7, currency: "USD" },
    { merchantId: "m2", name: "Whole Foods", totalSpend: 233.77, count: 5, currency: "USD" },
    { merchantId: "m3", name: "Uber", totalSpend: 129.5, count: 9, currency: "USD" },
  ];
}

export function getCreditUtilization(): { utilizationPercent: number; totalCreditLimit: number; totalBalance: number } {
  return { utilizationPercent: 27.4, totalCreditLimit: 20000, totalBalance: 5480 };
}

export function getMonthlyDigest(): { month: string; totalIncome: number; totalExpenses: number; savingsRatePercent: number } {
  const month = new Date().toISOString().slice(0, 7);
  return { month, totalIncome: 8200, totalExpenses: 6120.45, savingsRatePercent: 25.4 };
}

export function getTransactions(): Array<{ id: string; date: string; description: string; amount: number; currency: string; merchant?: string; category?: string }> {
  return [
    { id: "t1", date: new Date().toISOString(), description: "Coffee", amount: -4.5, currency: "USD", merchant: "Cafe", category: "Dining" },
    { id: "t2", date: new Date().toISOString(), description: "Salary", amount: 3500, currency: "USD", merchant: "Employer", category: "Income" },
    { id: "t3", date: new Date().toISOString(), description: "Groceries", amount: -82.13, currency: "USD", merchant: "Whole Foods", category: "Groceries" },
  ];
}


