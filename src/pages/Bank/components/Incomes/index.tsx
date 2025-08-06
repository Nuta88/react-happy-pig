import {
  FC,
  memo
} from 'react';

import {
  ColumnsType,
  Table
} from '../../../../components';
import { useModal } from '../../../../hooks';
import {
  useDeleteIncomeMutation
} from '../../../../services/bank';
import { Income } from '../../../../types';

import { generateColumns } from './columns';
import IncomeModal from './IncomeModal';

interface IncomeProps {
  isLoading: boolean;
  incomes: Income[] | []
}

const Incomes: FC<IncomeProps> = ({
  incomes,
  isLoading
}): JSX.Element => {
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
        loading={isLoading}
        columns={columns}
        dataSource={incomes}
      />
      {isOpenModal && (
        <IncomeModal
          income={selectedIncome}
          isOpen={isOpenModal}
          onCancel={hideModal}
        />
      )}
    </>
  );
};

export default memo(Incomes);
