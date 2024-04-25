import {
  useCallback,
  useState
} from 'react';
import {
  useNavigate,
  useParams
} from 'react-router-dom';

import {
  ColumnsType,
  Page,
  SpaceBetween,
  Table,
  Text,
  EditableTitle
} from '../../components';
import { apiUrls } from '../../constants/apiUrls';
import {
  useModal,
  useNotification
} from '../../hooks';
import { useFetchFundQuery } from '../../services/funds';
import { Expense } from '../../types';
import {
  convertToCurrency,
  countPaymentAmounts,
  getAmount
} from '../../utils/fund';

import { generateColumns } from './columns';
import ExpenseModal from './components/ExpenseModal';
import { FundActions } from './components/FundActions';
import { FundInfo } from './components/FundInfo';
import TransactionModal from './components/TransactionModal';
import { useUpdateFund } from './hooks/useUpdateFund';

const FundDetail = (): JSX.Element => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: fund } = useFetchFundQuery(Number(id));
  const [ openInfo, setOpenInfo ] = useState(false);
  const { isOpenModal, modalContent: selectedExpense, hideModal, openModal } = useModal<Expense>();
  const { isOpenModal: isOpenTransactionModal, hideModal: hideTransactionModal, openModal: openTransactionModal } = useModal();
  const { notificationContext, openNotification } = useNotification();
  const {
    onUpdateOrCreateExpense,
    onRemoveExpense,
    onUpdateFundName,
    onUpdatePlannedAmount,
    onUpdateFundInfo
  } = useUpdateFund(fund, openNotification, hideModal);
  const columns: ColumnsType<Expense> = generateColumns(onRemoveExpense, openModal);
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
        />
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
            <EditableTitle
              data-testid="fund-planned-amount"
              type="number"
              title={convertToCurrency(fund?.plannedAmount)}
              tooltip="Click to edit planned amount"
              secondaryTextBefore="Planned Amount: $"
              onChange={onUpdatePlannedAmount}
            />
          </SpaceBetween>
        )}
        scroll={{ y: 350 }}
      />
      <FundInfo
        fund={fund}
        open={openInfo}
        onSave={onUpdateFundInfo}
        onClose={handleToggleInfo}
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
