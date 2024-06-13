import { ColumnsType } from 'antd/es/table';

import { Expense } from '../../types';
import { today } from '../../utils/date';
import { getAmount } from '../../utils/fund';

export const generateColumns = (getDateFilterProps: any): ColumnsType<Expense> => [
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
    key: 'date',
    ...getDateFilterProps('date', today)
  }
];
