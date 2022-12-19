import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';

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
import { Expense } from '../../types';

type TDeleteFund = (id: number) => void;
type TShowModal = (expense: Expense) => void;

const generateColumns = (onDelete: TDeleteFund, showModal: TShowModal): ColumnsType<Expense> => [
  {
    title: 'Recipient',
    dataIndex: 'recipient',
    key: 'recipient'
  },
  {
    title: 'Amount',
    dataIndex: 'paymentAmount',
    key: 'paymentAmount',
    render: (paymentAmount: number) => `${getFundAmount(paymentAmount)}`
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
    render: (_, expense: Expense) => (
      <SpaceBetween size="middle">
        <CircleButton type="primary" icon={<EditIcon />} onClick={() => showModal(expense)} />
        <Confirm
          title={`Are you sure to delete "${expense.recipient}"?`}
          placement="leftTop"
          onConfirm={() => onDelete(expense.id as number)}
        >
          <CircleButton type="primary" icon={<DeleteIcon />} />
        </Confirm>
      </SpaceBetween>
    ),
  },
];

const FundDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data: fund } = useFetchFundQuery(params.id);
  const {
    isOpenModal,
    modalContent: selectedExpense,
    hideModal,
    showModal
  } = useModal<Expense>();
  const { onUpdateOrCreateExpense, onRemoveExpense } = useUpdateFund(fund);
  const columns: ColumnsType<Expense> = generateColumns(onRemoveExpense, showModal);
  const pageTitle: string = fund ? `${fund.name} Fund` : 'Fund';
  const expenses: Expense[] = fund?.expenses || [];
  
  const  navigateToFunds = () => {
    navigate(apiUrls.root, { replace: true });
  };

  const handleOpenCreateModal = useCallback(() => {
    showModal();
  }, [showModal]);

  const handleHideCreateModal = useCallback(() => {
    hideModal();
  }, [hideModal]);

  const handleUpdateFund = useCallback((expense: Expense) => {
    onUpdateOrCreateExpense(expense);
    hideModal();
  }, [hideModal, onUpdateOrCreateExpense]);

  return (
    <Page
      title={pageTitle}
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
}

export default FundDetail;
