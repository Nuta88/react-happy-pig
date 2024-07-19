import {
  CircleButton,
  Confirm,
  DeleteIcon,
  EditIcon,
  SpaceBetween,
  ColumnsType,
  SendIcon,
  TooltipIconButton
} from '../../components';
import { Expense } from '../../types';
import { getAmount } from '../../utils/fund';

type TDeleteFund = (id: number) => void;
type TShowModal = (expense: Expense) => void;
export const generateColumns = (onDelete: TDeleteFund, showModal: TShowModal, openMovingModal: TShowModal): ColumnsType<Expense> => [
  {
    title: 'Recipient',
    dataIndex: 'recipient',
    key: 'recipient'
  },
  {
    title: 'Amount',
    dataIndex: 'paymentAmount',
    key: 'paymentAmount',
    render: (paymentAmount: number) => `${getAmount(paymentAmount)}`
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description'
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date'
  },
  {
    title: 'Action',
    key: 'action',
    width: 150,
    render: (_, expense: Expense) => (
      <SpaceBetween size="middle">
        <TooltipIconButton
          tooltip="Move expense to other Fund"
          data-testid="move-expense-btn"
          size = "middle"
          icon={<SendIcon />}
          onClick={() => { openMovingModal(expense); }}
        />
        <CircleButton
          data-testid="edit-expense-btn"
          icon={<EditIcon />}
          onClick={() => { showModal(expense); }}
        />
        <Confirm
          title={`Are you sure to delete "${expense.recipient}"?`}
          placement="leftTop"
          onConfirm={() => { onDelete(expense.id as number); }}
        >
          <CircleButton type="primary" icon={<DeleteIcon />} />
        </Confirm>
      </SpaceBetween>
    )
  }
];
