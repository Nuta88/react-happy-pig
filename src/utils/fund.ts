import { Expense } from '../types';

interface IPercentage {
  currentAmount?: number | null;
  plannedAmount?: number
}

export const convertToCurrency = (amount: number = 0): number => (amount / 100);

export const convertToPennies = (amount: number): number => (amount * 100);

export const getPercentage = ({ currentAmount = 1, plannedAmount = 1 }: IPercentage): number => {
  return Math.floor(100 - (((currentAmount ?? 1) / plannedAmount) * 100));
};

export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0
});

export const toUSD = (number: number): string => formatter.format(number);

export const getAmount = (amount: number = 0): string => toUSD(convertToCurrency(amount));

export const upsertExpense = (expenses: Expense[], expense: Expense): Expense[] => {
  const fundExpenses = [ ...expenses ];

  const fundIndex = fundExpenses.findIndex(e => e.id === expense.id);

  if (fundIndex !== -1) {
    fundExpenses[fundIndex] = { ...expense };
  } else {
    fundExpenses.push(expense);
  }

  return fundExpenses;
};

export const countPaymentAmounts = (expenses: Expense[]): number => {
  return expenses.reduce((prevValue, curValue) => prevValue + curValue.paymentAmount, 0);
};
