import { useCallback } from 'react';

import {
  AddIcon,
  CircleButton,
  ColumnsType,
  Page,
  Table,
  Tooltip
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
    showModal
  } = useModal<Income>();
  const { data: { amount, incomes = [] } = {}, isLoading } = useFetchBankQuery({});
  const [ createIncome ] = useCreateIncomeMutation();
  const [ deleteIncome ] = useDeleteIncomeMutation();
  const columns: ColumnsType<Income> = generateColumns(showModal, deleteIncome);
  const pageTitle = `Bank (${getAmount(amount)})`;

  const handleOpenCreateModal = useCallback(() => {
    showModal();
  }, [ showModal ]);

  const handleHideCreateModal = useCallback(() => {
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
      <Table
        rowKey="id"
        size="small"
        title={() => 'Incomes'}
        scroll={{ y: 350 }}
        loading={isLoading}
        columns={columns}
        dataSource={incomes}
      />
      {
        isOpenModal && (
          <IncomeModal
            income={selectedIncome}
            isOpen={isOpenModal}
            onCancel={handleHideCreateModal}
            onCreate={createIncome}
          />
        )
      }
    </Page>
  );
};

export default Bank;
