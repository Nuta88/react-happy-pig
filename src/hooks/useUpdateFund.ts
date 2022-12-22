import { useUpdateFundMutation } from '../services/funds';
import { upsertExpense } from '../utils/fund';
import { Fund, Expense } from '../types';

export const useUpdateFund = (fund: Fund) => {
  const [ updateFund ] = useUpdateFundMutation();

  const onUpdateOrCreateExpense = (expense: Expense) => {
    const expenses = upsertExpense(fund.expenses, expense);

    updateFund({...fund, expenses});
  };

  const onUpdateFundName = (name: string) => {
    updateFund({...fund, name});
  };

  const onRemoveExpense = (id: number) => {
    const expenses = fund?.expenses.filter(expense => expense.id !== id);

    updateFund({...fund, expenses});
  };

  return { onUpdateOrCreateExpense, onRemoveExpense, onUpdateFundName };
};
