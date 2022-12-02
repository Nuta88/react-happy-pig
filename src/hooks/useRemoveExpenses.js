import { useUpdateFundMutation } from '../services/funds';

export const useRemoveExpenses = (fund) => {
  const [ updateFund ] = useUpdateFundMutation();

  const onRemoveExpenses = (id) => {
    const expenses = fund?.expenses.filter(expense => expense.id !== id);

    updateFund({...fund, expenses});
  }

  return { onRemoveExpenses };
};
