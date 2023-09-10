import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  TooltipIconButton,
  Page,
  Table,
  AddIcon,
  ColumnsType
} from '../../components';
import { apiUrls } from '../../constants/apiUrls';
import { useModal, useNotification } from '../../hooks';
import { useFetchFundQuery } from '../../services/funds';
import { Expense } from '../../types';

import { generateColumns } from './columns';
import ExpenseModal from './components/ExpenseModal';
import FundPageTitle from './components/FundPageTitle';
import { useUpdateFund } from './hooks/useUpdateFund';

const FundDetail = (): JSX.Element => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: fund } = useFetchFundQuery(Number(id));
  const { isOpenModal, modalContent: selectedExpense, hideModal, openModal } = useModal<Expense>();
  const { notificationContext, openNotification } = useNotification();
  const { onUpdateOrCreateExpense, onRemoveExpense, onUpdateFundName } = useUpdateFund(fund, openNotification, hideModal);
  const columns: ColumnsType<Expense> = generateColumns(onRemoveExpense, openModal);
  const expenses: Expense[] = fund?.expenses ?? [];

  const navigateToFunds = (): void => {
    navigate(apiUrls.funds.root, { replace: true });
  };

  const handleOpenCreateModal = useCallback(() => {
    openModal();
  }, [ openModal ]);

  return (
    <Page
      title={
      <FundPageTitle
        name={fund?.name ?? ''}
        onChange={onUpdateFundName}
      />
    }
      isBack
      data-testid="fund-page-content"
      onBack={navigateToFunds}
      extra={
        <TooltipIconButton
          tooltip="Add expense"
          icon={<AddIcon />}
          data-testid="fund-open-create-modal"
          onClick={handleOpenCreateModal}
        />
      }
    >
      {notificationContext}
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
          onSave={onUpdateOrCreateExpense}
          onCancel={hideModal}
        />
      )}
    </Page>
  );
};

export default FundDetail;
