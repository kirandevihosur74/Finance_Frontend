export type SafeToSpend = {
    amount: number;
    currency: string;
    horizonDays: number;
};
export type UpcomingBill = {
    id: string;
    name: string;
    dueDate: string;
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
    utilizationPercent: number;
    totalCreditLimit: number;
    totalBalance: number;
};
export type MonthlyDigest = {
    month: string;
    totalIncome: number;
    totalExpenses: number;
    savingsRatePercent: number;
};
export type Transaction = {
    id: string;
    date: string;
    description: string;
    amount: number;
    currency: string;
    merchant?: string;
    category?: string;
};
