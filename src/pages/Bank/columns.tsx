import { Income } from '../../types';
import { getAmount } from '../../utils/fund';
import {
  CircleButton,
  Confirm,
  DeleteIcon,
  EditIcon,
  SpaceBetween,
  ColumnsType
} from '../../components';

export const generateColumns = (): ColumnsType<Income> => [
  {
    title: 'Source',
    dataIndex: 'source',
    key: 'source'
  },
  {
    title: 'Amount',
    dataIndex: 'paymentAmount',
    key: 'paymentAmount',
    render: (paymentAmount: number) => `${getAmount(paymentAmount)}`
  },
  {
    title: 'Data',
    dataIndex: 'data',
    key: 'data'
  },
  {
    title: 'Action',
    key: 'action',
    width: 100,
    render: (_, income: Income) => (
      <SpaceBetween size="middle">
        <CircleButton type="primary" icon={<EditIcon />} />
        <Confirm
          title={`Are you sure to delete "${income.source}"?`}
          placement="leftTop"
          onConfirm={() => {}}
        >
          <CircleButton type="primary" icon={<DeleteIcon />} />
        </Confirm>
      </SpaceBetween>
    ),
  },
];
