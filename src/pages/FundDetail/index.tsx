import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  CircleButton,
  Tooltip,
  Page,
  Table,
  AddIcon,
  ColumnsType
} from '../../components';
import { apiUrls } from '../../constants/apiUrls';
import { useModal, useUpdateFund } from '../../hooks';
import { useFetchFundQuery } from '../../services/funds';
import { Expense } from '../../types';

import { generateColumns } from './columns';
import ExpenseModal from './components/ExpenseModal';
import FundPageTitle from './components/FundPageTitle';

const FundDetail = (): JSX.Element => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: fund } = useFetchFundQuery(Number(id));
  const {
    isOpenModal,
    modalContent: selectedExpense,
    hideModal,
    showModal
  } = useModal<Expense>();
  const { onUpdateOrCreateExpense, onRemoveExpense, onUpdateFundName } = useUpdateFund(fund);
  const columns: ColumnsType<Expense> = generateColumns(onRemoveExpense, showModal);
  const expenses: Expense[] = fund?.expenses ?? [];

  const navigateToFunds = (): void => {
    navigate(apiUrls.root, { replace: true });
  };

  const handleOpenCreateModal = useCallback(() => {
    showModal();
  }, [ showModal ]);

  const handleHideCreateModal = useCallback(() => {
    hideModal();
  }, [ hideModal ]);

  const handleUpdateFund = useCallback((expense: Expense) => {
    onUpdateOrCreateExpense(expense);
    hideModal();
  }, [ hideModal, onUpdateOrCreateExpense ]);

  const handleUpdateFundName = useCallback((name: string) => {
    onUpdateFundName(name);
  }, [ onUpdateFundName ]);

  return (
    <Page
      title={
      <FundPageTitle
        name={fund?.name as string}
        onChange={handleUpdateFundName}
      />
    }
      isBack
      data-testid="fund-page-content"
      onBack={navigateToFunds}
      extra={
        <Tooltip title="Add expense">
          <CircleButton
            size="large"
            type="primary"
            icon={<AddIcon />}
            data-testid="fund-open-create-modal"
            onClick={handleOpenCreateModal}
          />
        </Tooltip>
      }
    >
      <Table
        rowKey="id"
        size="small"
        columns={columns}
        dataSource={expenses}
        title={() => 'Expenses'}
        scroll={{ y: 350 }}
      />
      {isOpenModal && (
        <ExpenseModal
          isOpen={isOpenModal}
          expense={selectedExpense}
          onSave={handleUpdateFund}
          onCancel={handleHideCreateModal}
        />
      )}
    </Page>
  );
};

export default FundDetail;
