import {
  useCallback,
  useEffect
} from 'react';
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
import { useNotification } from '../../hooks/useNotification';
import { useFetchFundQuery } from '../../services/funds';
import { Expense } from '../../types';
import { NotificationType } from '../../types/notification';

import { generateColumns } from './columns';
import ExpenseModal from './components/ExpenseModal';
import FundPageTitle from './components/FundPageTitle';

const FundDetail = (): JSX.Element => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: fund } = useFetchFundQuery(Number(id));
  const { notificationContext, openNotification } = useNotification();
  const { isOpenModal, modalContent: selectedExpense, hideModal, showModal } = useModal<Expense>();
  const {
    isLoading,
    isSuccess,
    reset,
    onUpdateOrCreateExpense,
    onRemoveExpense,
    onUpdateFundName
  } = useUpdateFund(fund);
  const columns: ColumnsType<Expense> = generateColumns(onRemoveExpense, showModal);
  const expenses: Expense[] = fund?.expenses ?? [];

  const showSuccessMessage = useCallback(() => {
    if (isOpenModal) hideModal();

    openNotification(NotificationType.SUCCESS, 'Fund was updated successfully!');
    reset();
  }, [ isOpenModal, openNotification, hideModal, reset ]);

  useEffect(() => {
    if (!isLoading && isSuccess) showSuccessMessage();
  }, [ isLoading && isSuccess, showSuccessMessage ]);

  const navigateToFunds = (): void => {
    navigate(apiUrls.root, { replace: true });
  };

  const handleOpenCreateModal = useCallback(() => {
    showModal();
  }, [ showModal ]);

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
        <Tooltip title="Add expense">
          <CircleButton
            size="large"
            icon={<AddIcon />}
            data-testid="fund-open-create-modal"
            onClick={handleOpenCreateModal}
          />
        </Tooltip>
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
