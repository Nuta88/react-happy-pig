import { FC } from 'react';

import {
  AddIcon,
  TooltipIconButton
} from '../../../../components';
import { useModal } from '../../../../hooks';
import { Income } from '../../../../types';
import { TLoanCreate } from '../../../../types/bank';
import IncomeModal from '../Incomes/IncomeModal';
import LoanModal from '../Loan/LoanModal';

interface BankPageActionsProps {
  tabKey: string
}

const BankPageActions: FC<BankPageActionsProps> = ({ tabKey }): JSX.Element => {
  const title = tabKey === 'incomes' ? 'Add income' : 'Add loan';
  const {
    isOpenModal: isIncomeOpenModal,
    openModal: openIncomeModal,
    hideModal: hideIncomeModal
  } = useModal<Income>();
  const {
    isOpenModal: isLoanOpenModal,
    openModal: openLoanModal,
    hideModal: hideLoanModal
  } = useModal<TLoanCreate>();

  const handleOpenModal = (): void => {
    if (tabKey === 'incomes') {
      openIncomeModal();
    } else {
      openLoanModal();
    }
  };

  return (
    <>
      <TooltipIconButton
        tooltip={title}
        size="large"
        icon={<AddIcon />}
        data-testid="create-bank-actions-btn"
        onClick={handleOpenModal}
      />
      <IncomeModal
        isOpen={isIncomeOpenModal}
        onCancel={hideIncomeModal}
      />
      <LoanModal
        isOpen={isLoanOpenModal}
        onCancel={hideLoanModal}
      />
    </>
  );
};

export default BankPageActions;
