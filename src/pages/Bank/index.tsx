import styled from 'styled-components';

import {
  ColumnsType,
  Page,
  SecondaryText,
  Table
} from '../../components';
import { useFetchBankQuery } from '../../services/bank';
import { Income } from '../../types';
import { getAmount } from '../../utils/fund';

import { generateColumns } from './columns';

const TableTitleStyled = styled(SecondaryText)`
  display: block;
  margin-bottom: .5rem;
  text-transform: uppercase;
`;

const Bank = (): JSX.Element => {
  const { data: { amount, incomes = [] } = {}, isLoading } = useFetchBankQuery({});
  const columns: ColumnsType<Income> = generateColumns();
  const pageTitle = `Bank (${getAmount(amount)})`;

  return (
    <Page
      title={pageTitle}
      data-testid="bank-page-content"
    >
      <TableTitleStyled data-testid="bank-page-table-title">Incomes</TableTitleStyled>
      <Table
        loading={isLoading}
        rowKey="id"
        columns={columns}
        dataSource={incomes}
      />
    </Page>
  );
};

export default Bank;
