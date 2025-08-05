import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import {
  CircleButton,
  ColumnsType,
  Confirm,
  DeleteIcon,
  EditIcon,
  SpaceBetween
} from '../../../../components';
import { IncomeSource } from '../../../../constants/bank';
import {
  IBank,
  Income
} from '../../../../types';
import { getAmount } from '../../../../utils/fund';

type TShowModal = (income: Income) => void;
type TDeleteIncome = (body: { id: number; source: string }) => Promise<{ data: IBank } | { error: FetchBaseQueryError | SerializedError }>;

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
    render: (_, income: Income) => {
      const handleEdit = (): void => {
        showModal(income);
      };

      const handleDelete = (): void => {
        void onDelete({ id: income.id as number, source: income.source });
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
