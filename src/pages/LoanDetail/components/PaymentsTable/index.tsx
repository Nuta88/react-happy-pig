import { FC } from 'react';

import {
  ColumnsType,
  Table,
  Text,
  SpaceBetween
} from '../../../../components';
import { useFetchBankQuery } from '../../../../services/bank';
import { LoanPayment } from '../../../../types/bank';
import { getAmount } from '../../../../utils/fund';

import { generateColumns } from './columns';

interface PaymentsTableProps {
  payments: LoanPayment[];
  balance: number;
  repaymentAmount: number;
  isLoading: boolean;
  onRemovePayment: (id: number) => void;
  onEditPayment: (payment: LoanPayment) => void
}

const PaymentsTable: FC<PaymentsTableProps> = ({
  payments,
  balance,
  repaymentAmount,
  isLoading,
  onRemovePayment,
  onEditPayment
}): JSX.Element => {
  const { data: { amount: bankAmount } = {} } = useFetchBankQuery(undefined, { refetchOnMountOrArgChange: true });
  const columns: ColumnsType<LoanPayment> = generateColumns(onRemovePayment, onEditPayment);

  return (
    <Table
      rowKey="id"
      size="small"
      title={() => (
        <SpaceBetween>
          <Text>Repayments: {getAmount(repaymentAmount)}</Text>
          <Text>Bank: {getAmount(bankAmount)}</Text>
          <Text>Balance: {getAmount(balance)}</Text>
        </SpaceBetween>
      )}
      columns={columns}
      dataSource={payments}
      loading={isLoading} />
  );
};

export default PaymentsTable;
