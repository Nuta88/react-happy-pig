import { useState } from 'react';

import {
  useFocusElement,
  useNotification
} from '../../../hooks';
import { useUpdateFundMutation } from '../../../services/funds';
import { Fund, Expense } from '../../../types';
import {
  IFundInfo
} from '../../../types/fund';
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
  onUpdateFundInfo: (info: IFundInfo) => void;
  onRemoveExpense: (id: number) => void;
  prevCreatedExpense: Expense
}

export const useUpdateFund = (
  fund: Fund | undefined,
  hideModal: () => void
): IUpdateFund => {
  const focusOnExpenseButton = useFocusElement('fund-action-expense', 300);
  const [ updateFund, result ] = useUpdateFundMutation();
  const [ prevCreatedExpense, setPrevCreatedExpense ] = useState<Expense>(new Expense());
  const { openNotification } = useNotification();

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

  const onSetCreatedExpense = (expense: Expense): void => {
    if (expense.id == null) {
      setPrevCreatedExpense(prev => ({
        ...prev,
        paymentAmount: convertToPennies(1),
        recipient: expense.recipient,
        date: expense.date
      }));
    }
  };

  const onUpdateOrCreateExpense = (expense: Expense): void => {
    if (fund) {
      const expenses = upsertExpense(fund.expenses, expense);
      onSetCreatedExpense(expense);

      const message = `Expense was ${expense.id === null ? 'created' : 'updated'} successfully!`;
      const errMessage = `Expense was not ${expense.id === null ? 'created' : 'updated'}!`;

      onShowNotification(updateFund({ ...fund, expenses }), message, errMessage, true);
      focusOnExpenseButton();
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

  const onUpdateFundInfo = (info: any): void => {
    onShowNotification(
      updateFund({ ...fund, ...info }),
      'Fund info was updated successfully!',
      'Fund info was not updated!'
    );
  };

  return {
    onUpdateOrCreateExpense,
    onRemoveExpense,
    onUpdateFundName,
    onUpdatePlannedAmount,
    onUpdateFundInfo,
    prevCreatedExpense,
    ...result
  };
};
