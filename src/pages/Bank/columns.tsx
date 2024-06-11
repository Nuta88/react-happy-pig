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
import { TNotification } from '../../types/columns';
import { getAmount } from '../../utils/fund';
import { onWrapQuery } from '../../utils/query';

type TShowModal = (income: Income) => void;
type TDeleteIncome = (id: number) => Promise<{ data: IBank } | { error: FetchBaseQueryError | SerializedError }>;

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
        onWrapQuery(
          onDelete(income.id as number),
          `Income "${income.source}" was deleted successfully!`,
          openNotification
        );
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
