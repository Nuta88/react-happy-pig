import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import {
  CircleButton,
  ColumnsType,
  Confirm,
  DeleteIcon,
  EditIcon,
  SpaceBetween
} from '../../components';
import { IncomeSource } from '../../constants/bank';
import {
  IBank,
  Income
} from '../../types';
import { NotificationType } from '../../types/notification';
import { getAmount } from '../../utils/fund';

type TShowModal = (income: Income) => void;
type TDeleteIncome = (id: number) => Promise<{ data: IBank } | { error: FetchBaseQueryError | SerializedError }>;
type TNotification = (type: NotificationType, content: string) => void;
interface TError {
  data: {
    message: string
  }
}

export const generateColumns = (showModal: TShowModal, onDelete: TDeleteIncome, openNotification: TNotification): ColumnsType<Income> => [
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
    render: (_, income: Income) => {
      const handleEdit = (): void => {
        showModal(income);
      };

      const handleDelete = (): void => {
        void onDelete(income.id as number)
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          .unwrap()
          .then(() => {
            openNotification(NotificationType.SUCCESS, `Income "${income.source}" was deleted successfully!`);
          })
          .catch(({ data }: TError) => {
            openNotification(NotificationType.ERROR, data.message);
          });
      };
      return (
        <SpaceBetween size="middle">
          <CircleButton
            type="primary"
            icon={<EditIcon />}
            onClick={handleEdit}
            data-testid="edit-income-btn"
          />
          <Confirm
            title={`Are you sure to delete "${IncomeSource[income.source]}" income?`}
            placement="leftTop"
            onConfirm={handleDelete}
          >
            <CircleButton type="primary" icon={<DeleteIcon />} data-testid="delete-income-btn" />
          </Confirm>
        </SpaceBetween>
      );
    }
  }
];
