import { Expense } from '../../types';
import { getAmount } from '../../utils/fund';
import {
  CircleButton,
  Confirm,
  DeleteIcon,
  EditIcon,
  SpaceBetween,
  ColumnsType
} from '../../components';

type TDeleteFund = (id: number) => void;
type TShowModal = (expense: Expense) => void;
export const generateColumns = (onDelete: TDeleteFund, showModal: TShowModal): ColumnsType<Expense> => [
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
