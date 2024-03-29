import { useCallback } from 'react';

import {
  AddIcon,
  ColumnsType,
  Page,
  Table,
  TooltipIconButton
} from '../../components';
import { useModal } from '../../hooks';
import { useFetchBankQuery, useCreateIncomeMutation, useDeleteIncomeMutation } from '../../services/bank';
import { Income } from '../../types';
import { getAmount } from '../../utils/fund';

import { generateColumns } from './columns';
import IncomeModal from './components/IncomeModal';

const Bank = (): JSX.Element => {
  const {
    isOpenModal,
    modalContent: selectedIncome,
    hideModal,
    openModal
  } = useModal<Income>();
  const { data: { amount, incomes = [] } = {}, isLoading } = useFetchBankQuery(undefined, { refetchOnMountOrArgChange: true });
  const [ createIncome ] = useCreateIncomeMutation();
  const [ deleteIncome ] = useDeleteIncomeMutation();
  const columns: ColumnsType<Income> = generateColumns(openModal, deleteIncome);
  const pageTitle = `Bank (${getAmount(amount)})`;

  const handleOpenCreateModal = useCallback(() => {
    openModal();
  }, [ openModal ]);

  return (
    <Page
      title={pageTitle}
      data-testid="bank-page-content"
      extra={
        <TooltipIconButton
          tooltip="Add income"
          size="large"
          icon={<AddIcon />}
          data-testid="create-income-btn"
          onClick={handleOpenCreateModal}
        />
      }
    >
      <Table
        rowKey="id"
        size="small"
        title={() => 'Incomes'}
        scroll={{ y: 350 }}
        loading={isLoading}
        columns={columns}
        dataSource={incomes}
      />
      {isOpenModal && (
        <IncomeModal
          income={selectedIncome}
          isOpen={isOpenModal}
          onCancel={hideModal}
          onCreate={createIncome}
        />
      )}
    </Page>
  );
};

export default Bank;
