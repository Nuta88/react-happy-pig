import { memo } from 'react';

import {
  ColumnsType,
  Table
} from '../../../../components';
import { useModal } from '../../../../hooks';
import {
  useDeleteIncomeMutation,
  useFetchIncomesQuery
} from '../../../../services/bank';
import { Income } from '../../../../types';

import { generateColumns } from './columns';
import IncomeModal from './IncomeModal';

const Incomes = (): JSX.Element => {
  const { data: incomes = [], isLoading, isFetching } = useFetchIncomesQuery(undefined, { refetchOnMountOrArgChange: true });
  const [ deleteIncome ] = useDeleteIncomeMutation();
  const {
    isOpenModal,
    modalContent: selectedIncome,
    hideModal,
    openModal
  } = useModal<Income>();
  const columns: ColumnsType<Income> = generateColumns(openModal, deleteIncome);

  return (
    <>
      <Table
        rowKey="id"
        size="small"
        scroll={{ y: 350 }}
        loading={isLoading || isFetching}
        columns={columns}
        dataSource={incomes}
      />
      <IncomeModal
        key={selectedIncome?.id ?? 'newIncome'}
        income={selectedIncome}
        isOpen={isOpenModal}
        onCancel={hideModal}
      />
    </>
  );
};

export default memo(Incomes);
