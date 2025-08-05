import {
  Dispatch,
  FC,
  memo,
  SetStateAction,
  useEffect
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
import IncomeModal from '../IncomeModal';

import { generateColumns } from './columns';

interface IncomeProps {
  isLoading: boolean;
  isCreateIncome: boolean;
  incomes: Income[] | [];
  onHideCreateModal: Dispatch<SetStateAction<boolean>>
}

const Incomes: FC<IncomeProps> = ({
  incomes,
  isLoading,
  isCreateIncome,
  onHideCreateModal
}): JSX.Element => {
  const [ deleteIncome ] = useDeleteIncomeMutation();
  const {
    isOpenModal,
    modalContent: selectedIncome,
    hideModal,
    openModal
  } = useModal<Income>();
  const columns: ColumnsType<Income> = generateColumns(openModal, deleteIncome);

  const onHideModal = (): void => {
    if (isCreateIncome) onHideCreateModal(false);

    hideModal();
  };

  useEffect(() => {
    if (isCreateIncome) openModal();
  }, [ isCreateIncome ]);

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
          onCancel={onHideModal}
        />
      )}
    </>
  );
};

export default memo(Incomes);
