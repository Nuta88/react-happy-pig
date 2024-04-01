import { useCallback } from 'react';
import {
  useNavigate,
  useParams
} from 'react-router-dom';

import {
  AddIcon,
  ColumnsType,
  Page,
  SpaceBetween,
  Table,
  Text,
  TooltipIconButton,
  TransactionIcon
} from '../../components';
import { apiUrls } from '../../constants/apiUrls';
import {
  useModal,
  useNotification
} from '../../hooks';
import { useFetchFundQuery } from '../../services/funds';
import { Expense } from '../../types';
import {
  countPaymentAmounts,
  getAmount
} from '../../utils/fund';

import { generateColumns } from './columns';
import ExpenseModal from './components/ExpenseModal';
import FundPageTitle from './components/FundPageTitle';
import TransactionModal from './components/TransactionModal';
import { useUpdateFund } from './hooks/useUpdateFund';

const FundDetail = (): JSX.Element => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: fund } = useFetchFundQuery(Number(id));
  const { isOpenModal, modalContent: selectedExpense, hideModal, openModal } = useModal<Expense>();
  const { isOpenModal: isOpenTransactionModal, hideModal: hideTransactionModal, openModal: openTransactionModal } = useModal();
  const { notificationContext, openNotification } = useNotification();
  const { onUpdateOrCreateExpense, onRemoveExpense, onUpdateFundName } = useUpdateFund(fund, openNotification, hideModal);
  const columns: ColumnsType<Expense> = generateColumns(onRemoveExpense, openModal);
  const expenses: Expense[] = fund?.expenses ?? [];
  const totalAmountOfExpenses = countPaymentAmounts(expenses);

  const navigateToFunds = (): void => {
    navigate(apiUrls.funds.root, { replace: true });
  };

  const handleOpenCreateModal = useCallback(() => {
    openModal();
  }, [ openModal ]);

  const handleOpenTransactionModal = useCallback(() => {
    openTransactionModal();
  }, [ openTransactionModal ]);

  return (
    <Page
      title={
      <FundPageTitle
        name={fund?.name ?? ''}
        secondaryText={`(${getAmount(fund?.currentAmount)})`}
        onChange={onUpdateFundName}
      />
    }
      isBack
      data-testid="fund-page-content"
      onBack={navigateToFunds}
      extra={[
      <SpaceBetween key="actions">
        <TooltipIconButton
          tooltip="Add transaction"
          icon={<TransactionIcon />}
          data-testid="fund-open-transaction-modal"
          onClick={handleOpenTransactionModal}
        />
        <TooltipIconButton
          tooltip="Add expense"
          icon={<AddIcon />}
          data-testid="fund-open-create-modal"
          onClick={handleOpenCreateModal}
          disabled={fund?.currentAmount === 0}
        />
      </SpaceBetween>
      ]}
    >
      {notificationContext}
      <Table
        rowKey="id"
        size="small"
        columns={columns}
        dataSource={expenses}
        title={() => (
          <SpaceBetween>
            <Text>Expenses: {getAmount(totalAmountOfExpenses)}</Text>
            <Text>Planned Amount: {getAmount(fund?.plannedAmount)}</Text>
          </SpaceBetween>
        )}
        scroll={{ y: 350 }}
      />
      {isOpenModal && (
        <ExpenseModal
          isOpen={isOpenModal}
          expense={selectedExpense}
          onSave={onUpdateOrCreateExpense}
          onCancel={hideModal}
          availableAmount={(fund?.currentAmount ?? 0)}
        />
      )}
      {isOpenTransactionModal && (
        <TransactionModal
          isOpen={isOpenTransactionModal}
          onCancel={hideTransactionModal}
          openNotification={openNotification}
        />
      )}
    </Page>
  );
};

export default FundDetail;
