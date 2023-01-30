import { useCallback } from 'react';
import styled from 'styled-components';

import {
  AddIcon,
  CircleButton,
  ColumnsType,
  Page,
  SecondaryText,
  Table,
  Tooltip
} from '../../components';
import { useModal } from '../../hooks';
import { useFetchBankQuery, useCreateIncomeMutation } from '../../services/bank';
import { Income } from '../../types';
import { getAmount } from '../../utils/fund';

import { generateColumns } from './columns';
import IncomeModal from './components/IncomeModal';

const TableTitleStyled = styled(SecondaryText)`
  display: block;
  margin-bottom: .5rem;
  text-transform: uppercase;
`;

const Bank = (): JSX.Element => {
  const {
    isOpenModal,
    modalContent: selectedIncome,
    hideModal,
    showModal
  } = useModal<Income>();
  const { data: { amount, incomes = [] } = {}, isLoading } = useFetchBankQuery({});
  const [ createIncome ] = useCreateIncomeMutation();
  const columns: ColumnsType<Income> = generateColumns();
  const pageTitle = `Bank (${getAmount(amount)})`;

  const handleOpenCreateModal = useCallback(() => {
    showModal();
  }, [ showModal ]);

  const handleHideCreateModal = useCallback(() => {
    hideModal();
  }, [ hideModal ]);

  const handleSaveIncome = useCallback((income: Income) => {
    void createIncome(income);
    hideModal();
  }, [ hideModal ]);

  return (
    <Page
      title={pageTitle}
      data-testid="bank-page-content"
      extra={
        <Tooltip title="Add income">
          <CircleButton
            size="large"
            type="primary"
            data-testid="create-income-btn"
            icon={<AddIcon />}
            onClick={handleOpenCreateModal}
          />
        </Tooltip>
      }
    >
      <TableTitleStyled data-testid="bank-page-table-title">Incomes</TableTitleStyled>
      <Table
        loading={isLoading}
        rowKey="id"
        columns={columns}
        dataSource={incomes}
      />
      <IncomeModal
        income={selectedIncome}
        isOpen={isOpenModal}
        onCancel={handleHideCreateModal}
        onSave={handleSaveIncome}
      />
    </Page>
  );
};

export default Bank;
