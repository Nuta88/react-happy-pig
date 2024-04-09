import { useUpdateFundMutation } from '../../../services/funds';
import { Fund, Expense } from '../../../types';
import { NotificationType } from '../../../types/notification';
import { MutationResult } from '../../../types/query';
import {
  convertToPennies,
  upsertExpense
} from '../../../utils/fund';

interface IUpdateFund extends MutationResult {
  onUpdateOrCreateExpense: (expense: Expense) => void;
  onUpdateFundName: (name: string | number) => void;
  onUpdatePlannedAmount: (amount: string | number) => void;
  onRemoveExpense: (id: number) => void
}

export const useUpdateFund = (
  fund: Fund | undefined,
  openNotification: (type: NotificationType, content: string) => void,
  hideModal: () => void
): IUpdateFund => {
  const [ updateFund, result ] = useUpdateFundMutation();

  const onShowNotification = (
    updateFundFn: Promise<any>,
    message: string,
    errMessage: string,
    isHideModal: boolean = false
  ): void => {
    void updateFundFn
      .then(() => {
        openNotification(NotificationType.SUCCESS, message);

        if (isHideModal) hideModal();
      })
      .catch(() => {
        openNotification(NotificationType.ERROR, errMessage);
      });
  };

  const onUpdateOrCreateExpense = (expense: Expense): void => {
    if (fund) {
      const expenses = upsertExpense(fund.expenses, expense);
      const message = `Expense was ${expense.id === null ? 'created' : 'updated'} successfully!`;
      const errMessage = `Expense was not ${expense.id === null ? 'created' : 'updated'}!`;

      onShowNotification(updateFund({ ...fund, expenses }), message, errMessage, true);
    }
  };

  const onUpdateFundName = (name: string | number): void => {
    onShowNotification(
      updateFund({ ...fund, name: name as string }),
      'Fund name was updated successfully!',
      'Fund name was not updated!'
    );
  };
  const onUpdatePlannedAmount = (amount: string | number): void => {
    console.log(amount, 'kgj777777nbj');
    onShowNotification(
      updateFund({ ...fund, plannedAmount: convertToPennies(amount as number) }),
      'Planned Amount was updated successfully!',
      'Planned Amount was not updated!'
    );
  };

  const onRemoveExpense = (id: number): void => {
    const expenses = fund?.expenses.filter(expense => expense.id !== id);

    onShowNotification(
      updateFund({ ...fund, expenses }),
      'Expense was deleted successfully!',
      'Expense was not deleted!'
    );
  };

  return {
    onUpdateOrCreateExpense,
    onRemoveExpense,
    onUpdateFundName,
    onUpdatePlannedAmount,
    ...result
  };
};
