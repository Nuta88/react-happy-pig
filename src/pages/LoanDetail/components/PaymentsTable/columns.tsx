import {
  CircleButton,
  Confirm,
  DeleteIcon,
  EditIcon,
  SpaceBetween,
  ColumnsType
} from '../../../../components';
import { LoanPayment } from '../../../../types/bank';
import { getAmount } from '../../../../utils/fund';

type TDeleteFund = (id: number) => void;
type TEditPayment = (payment: LoanPayment) => void;
export const generateColumns = (onDelete: TDeleteFund, onEditPayment: TEditPayment): ColumnsType<LoanPayment> => [
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    render: (amount: number) => `${getAmount(amount)}`
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
    render: (_, payment: LoanPayment) => (
      <SpaceBetween size="middle">
        <CircleButton
          data-testid="edit-expense-btn"
          icon={<EditIcon />}
          onClick={() => { onEditPayment(payment); }}
        />
        <Confirm
          title={'Are you sure to delete payment with amount?'}
          placement="leftTop"
          onConfirm={() => { onDelete(payment.id ?? 0); }}
        >
          <CircleButton type="primary" icon={<DeleteIcon />} />
        </Confirm>
      </SpaceBetween>
    )
  }
];
