import {
  CircleButton,
  ColumnsType,
  Confirm,
  DeleteIcon,
  EditIcon,
  SpaceBetween
} from '../../components';
import { IncomeSource } from '../../constants/bank';
import { Income } from '../../types';
import { getAmount } from '../../utils/fund';

type TShowModal = (income: Income) => void;
type TDeleteIncome = (id: number) => void;

export const generateColumns = (showModal: TShowModal, onDelete: TDeleteIncome): ColumnsType<Income> => [
  {
    title: 'Source',
    dataIndex: 'source',
    key: 'source',
    render: (source: keyof typeof IncomeSource) => IncomeSource[source]
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    render: (paymentAmount: number) => getAmount(paymentAmount)
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date'
  },
  {
    title: 'Action',
    key: 'action',
    width: 100,
    render: (_, income: Income) => (
      <SpaceBetween size="middle">
        <CircleButton
          type="primary"
          icon={<EditIcon />}
          onClick={() => { showModal(income); }}
          data-testid="edit-income-btn"
        />
        <Confirm
          title={`Are you sure to delete "${IncomeSource[income.source]}" income?`}
          placement="leftTop"
          onConfirm={() => { onDelete(income.id as number); }}
        >
          <CircleButton type="primary" icon={<DeleteIcon />} data-testid="delete-income-btn" />
        </Confirm>
      </SpaceBetween>
    )
  }
];
