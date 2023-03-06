import { useUpdateFundMutation } from '../services/funds';
import { Fund, Expense } from '../types';
import { MutationResult } from '../types/query';
import { upsertExpense } from '../utils/fund';

interface IUpdateFund extends MutationResult {
  onUpdateOrCreateExpense: (expense: Expense) => void;
  onUpdateFundName: (name: string) => void;
  onRemoveExpense: (id: number) => void
}

export const useUpdateFund = (fund: Fund | undefined): IUpdateFund => {
  const [ updateFund, result ] = useUpdateFundMutation();

  const onUpdateOrCreateExpense = (expense: Expense): void => {
    if (fund) {
      const expenses = upsertExpense(fund.expenses, expense);

      void updateFund({ ...fund, expenses });
    }
  };

  const onUpdateFundName = (name: string): void => {
    void updateFund({ ...fund, name });
  };

  const onRemoveExpense = (id: number): void => {
    const expenses = fund?.expenses.filter(expense => expense.id !== id);

    void updateFund({ ...fund, expenses });
  };

  return {
    onUpdateOrCreateExpense,
    onRemoveExpense,
    onUpdateFundName,
    ...result
  };
};
