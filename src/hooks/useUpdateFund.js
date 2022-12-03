import { useUpdateFundMutation } from '../services/funds';
import { upsertExpense } from '../utils/fund';

export const useUpdateFund = (fund) => {
  const [ updateFund ] = useUpdateFundMutation();

  const onUpdateOrCreateExpense = (expense) => {
    const expenses = upsertExpense(fund.expenses, expense);

    updateFund({...fund, expenses});
  };

  const onRemoveExpense = (id) => {
    const expenses = fund?.expenses.filter(expense => expense.id !== id);

    updateFund({...fund, expenses});
  };

  return { onUpdateOrCreateExpense, onRemoveExpense };
};
