import { FC } from 'react';

import {
  AddIcon,
  InfoIcon,
  SpaceBetween,
  TagIcon,
  TooltipIconButton,
  TransactionIcon
} from '../../../../components';

interface IFundActionsProps {
  isDisabledExpense: boolean;
  openTransactionModal: () => void;
  openCreateModal: () => void;
  openInfo: () => void;
  openAssigningFundTag: () => void
}

export const FundActions: FC<IFundActionsProps> = ({
  isDisabledExpense,
  openTransactionModal,
  openCreateModal,
  openInfo,
  openAssigningFundTag
}) => {
  return (
    <SpaceBetween key="actions">
      <TooltipIconButton
        tooltip="Assigning Tag to Fund"
        icon={<TagIcon />}
        data-testid="fund-open-tag"
        onClick={openAssigningFundTag}
        disabled
      />
      <TooltipIconButton
        tooltip="Open fund info"
        icon={<InfoIcon />}
        data-testid="fund-open-transaction-modal"
        onClick={openInfo}
      />
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
