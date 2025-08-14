export type SafeToSpend = {
  amount: number;
  currency: string;
  horizonDays: number;
};

export type UpcomingBill = {
  id: string;
  name: string;
  dueDate: string; // ISO date
  amount: number;
  currency: string;
  status: 'due' | 'paid' | 'overdue';
};

export type CashflowMTD = {
  income: number;
  expenses: number;
  net: number;
  currency: string;
};

export type TopMerchant = {
  merchantId: string;
  name: string;
  totalSpend: number;
  count: number;
  currency: string;
};

export type CreditUtilization = {
  utilizationPercent: number; // 0-100
  totalCreditLimit: number;
  totalBalance: number;
};

export type MonthlyDigest = {
  month: string; // e.g. 2025-08
  totalIncome: number;
  totalExpenses: number;
  savingsRatePercent: number;
};

export type Transaction = {
  id: string;
  date: string; // ISO
  description: string;
  amount: number; // negative for debit, positive for credit
  currency: string;
  merchant?: string;
  category?: string;
};

