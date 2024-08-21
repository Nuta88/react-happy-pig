import {
  useFetchFundsQuery,
  useMovingExpenseMutation
} from '../../../services/funds';
import {
  Expense,
  Fund
} from '../../../types';

interface IFormValues {
  fundId: number
}

interface IMovingExpense {
  funds: Fund[];
  onCloseModal: () => void;
  initialValues: any;
  onMovingExpense: (values: IFormValues) => void
}

interface IMovingExpenseProps {
  fundId: number | null | undefined;
  expense: Expense | null;
  resetFields: () => void;
  onCancel: () => void
}

export const useMovingExpense = ({ fundId, expense, resetFields, onCancel }: IMovingExpenseProps): IMovingExpense => {
  const { data: funds = [] } = useFetchFundsQuery({});
  const [ movingExpense ] = useMovingExpenseMutation();

  const onCloseModal = (): void => {
    resetFields();
    onCancel();
  };

  const onMovingExpense = (values: IFormValues): void => {
    void movingExpense({ newFundId: values.fundId, expenseId: expense?.id as number });
    onCloseModal();
  };

  return {
    funds: funds.filter(f => f.id !== fundId),
    initialValues: {},
    onCloseModal,
    onMovingExpense
  };
};
