import { useCallback } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import {
  CircleButton,
  Confirm,
  SpaceBetween,
  DeleteIcon,
  EditIcon,
  Table,
  Tooltip,
  Page,
  AddIcon
} from '../../components';

import { useFetchFundQuery } from '../../services/funds';
import { useModal, useUpdateFund } from '../../hooks';
import { getFundAmount } from '../../utils/fund';
import { apiUrls } from '../../constants/apiUrls';

import ExpenseModal from './components/ExpenseModal';

const generateColumns = (onDelete, showModal) => [
  {
    title: 'Recipient',
    dataIndex: 'recipient',
    key: 'recipient'
  },
  {
    title: 'Amount',
    dataIndex: 'paymentAmount',
    key: 'paymentAmount',
    render: paymentAmount => `${getFundAmount(paymentAmount)}`
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Action',
    key: 'action',
    width: 100,
    render: (_, record) => (
      <SpaceBetween size="middle">
        <CircleButton type="primary" icon={<EditIcon />} onClick={() => showModal(record)} />
        <Confirm
          title={`Are you sure to delete "${record.recipient}"?`}
          placement="leftTop"
          onConfirm={() => onDelete(record.id)}
        >
          <CircleButton type="primary" icon={<DeleteIcon />} />
        </Confirm>
      </SpaceBetween>
    ),
  },
];

function Fund() {
  const params = useParams();
  const navigate = useNavigate();
  const { data } = useFetchFundQuery(params.id);
  const { isOpenModal, modalContent: expense, hideModal, showModal } = useModal();
  const { onUpdateOrCreateExpense, onRemoveExpense } = useUpdateFund(data);
  const columns = generateColumns(onRemoveExpense, showModal);
  const title = data ? `${data.name} Fund` : 'Fund';
  const expenses = data?.expenses || [];

  const navigateToFunds = () => {
    navigate(apiUrls.funds.root, { replace: true });
  };

  const handleOpenCreateModal = useCallback(() => {
    showModal();
  }, [showModal]);

  const handleHideCreateModal = useCallback(() => {
    hideModal();
  }, [hideModal]);

  const handleUpdateFund = useCallback(expense => {
    onUpdateOrCreateExpense(expense);
    hideModal();
  }, [hideModal, onUpdateOrCreateExpense]);

  return (
    <Page
      title={title}
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
        columns={columns}
        dataSource={expenses}
      />
      <ExpenseModal
        isOpen={isOpenModal}
        expense={expense}
        onSave={handleUpdateFund}
        onCancel={handleHideCreateModal}
      />
    </Page>
  );
}

export default Fund;
