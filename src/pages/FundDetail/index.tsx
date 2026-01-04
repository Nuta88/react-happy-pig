import { useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import {
  Drawer,
  EditableTitle,
  Page
} from '../../components';
import { apiUrls } from '../../constants/apiUrls';
import { useModal } from '../../hooks';
import { useFetchFundQuery } from '../../services/funds';
import { Expense } from '../../types';
import { AssociatedObjectType } from '../../types/tag';
import {
  countPaymentAmounts,
  getAmount
} from '../../utils/fund';

import { AssigningTag } from './components/AssigningTag';
import ExpenseModal from './components/ExpenseModal';
import ExpensesTable from './components/ExpensesTable';
import { FundActions } from './components/FundActions';
import { FundInfo } from './components/FundInfo';
import TransactionModal from './components/TransactionModal';
import { useUpdateFund } from './hooks/useUpdateFund';

const DrawerStyled = styled(Drawer)`
  .ant-drawer-body {
    padding: 0 1.5rem 1.5rem;
  }
`;

const FundDetail = (): JSX.Element => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: fund, isLoading, isFetching } = useFetchFundQuery(Number(id));
  const [ openInfo, setOpenInfo ] = useState(false);
  const { isOpenModal, modalContent: selectedExpense, hideModal, openModal } = useModal<Expense>();
  const [ isOpenAssigning, setIsOpenAssigning ] = useState<boolean>(false);
  const { isOpenModal: isOpenTransactionModal, hideModal: hideTransactionModal, openModal: openTransactionModal } = useModal();
  const {
    onUpdateOrCreateExpense,
    onRemoveExpense,
    onUpdateFundName,
    onUpdatePlannedAmount,
    onUpdateFundInfo,
    prevCreatedExpense
  } = useUpdateFund(fund, hideModal);
  const expenses: Expense[] = fund?.expenses ?? [];
  const totalAmountOfExpenses = countPaymentAmounts(expenses);

  const navigateToFunds = (): void => {
    navigate(apiUrls.funds.root, { replace: true });
  };

  const handleOpenCreateModal = useCallback(() => {
    openModal();
  }, [ openModal ]);

  const handleToggleInfo = useCallback(() => {
    setOpenInfo(open => !open);
  }, [ setOpenInfo ]);

  const handleToggleAssigning = useCallback(() => {
    setIsOpenAssigning(open => !open);
  }, [ setIsOpenAssigning ]);

  const handleOpenTransactionModal = useCallback(() => {
    openTransactionModal();
  }, [ openTransactionModal ]);

  return (
    <Page
      title={
      <EditableTitle
        data-testid="fund-page-name"
        title={fund?.name ?? ''}
        tooltip="Click to edit fund name"
        secondaryText={`(${getAmount(fund?.currentAmount)})`}
        onChange={onUpdateFundName}
      />
    }
      isBack
      data-testid="fund-page-content"
      onBack={navigateToFunds}
      extra={[
        <FundActions
          key="actions"
          isDisabledExpense={fund?.currentAmount === 0}
          openTransactionModal={handleOpenTransactionModal}
          openCreateModal={handleOpenCreateModal}
          openInfo={handleToggleInfo}
          openAssigningFundTag={handleToggleAssigning}
        />
      ]}
    >
      <ExpensesTable
        expenses={expenses}
        isLoading={isLoading || isFetching}
        plannedAmount={fund?.plannedAmount}
        totalAmountOfExpenses={totalAmountOfExpenses}
        openExpenseModal={openModal}
        fundId={fund?.id}
        onUpdatePlannedAmount={onUpdatePlannedAmount}
        onRemoveExpense={onRemoveExpense}
      />
      <FundInfo
        fund={fund}
        open={openInfo}
        onSave={onUpdateFundInfo}
        onClose={handleToggleInfo}
      />
      <DrawerStyled
        title="Fund tags"
        placement="right"
        size={500}
        onClose={handleToggleAssigning}
        open={isOpenAssigning}
      >
        <AssigningTag
          associatedObjectId={fund?.id as number}
          asociatedObjectType={AssociatedObjectType.FUND}
        />
      </DrawerStyled>
      <ExpenseModal
        key={selectedExpense?.id ?? 'create'}
        isOpen={isOpenModal}
        expense={selectedExpense ?? prevCreatedExpense}
        onSave={onUpdateOrCreateExpense}
        onCancel={hideModal}
        availableAmount={(fund?.currentAmount ?? 0)}
      />
      <TransactionModal
        isOpen={isOpenTransactionModal}
        onCancel={hideTransactionModal}
      />
    </Page>
  );
};

export default FundDetail;
