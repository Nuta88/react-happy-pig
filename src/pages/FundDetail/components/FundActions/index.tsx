import { FC } from 'react';

import {
  AddIcon,
  SpaceBetween,
  TooltipIconButton,
  TransactionIcon
} from '../../../../components';

interface IFundActionsProps {
  isDisabledExpense: boolean;
  openTransactionModal: () => void;
  openCreateModal: () => void
}

export const FundActions: FC<IFundActionsProps> = ({ isDisabledExpense, openTransactionModal, openCreateModal }) => {
  return (
    <SpaceBetween key="actions">
      <TooltipIconButton
        tooltip="Add transaction"
        icon={<TransactionIcon />}
        data-testid="fund-open-transaction-modal"
        onClick={openTransactionModal}
      />
      <TooltipIconButton
        tooltip="Add expense"
        icon={<AddIcon />}
        data-testid="fund-open-create-modal"
        onClick={openCreateModal}
        disabled={isDisabledExpense}
      />
    </SpaceBetween>
  );
};
