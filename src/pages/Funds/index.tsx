import { useCallback } from 'react';

import {
  Page,
  Empty,
  Row,
  CircleButton,
  Tooltip,
  AddIcon
} from '../../components';
import {
  useFetchFundsQuery,
  useDeleteFundMutation,
  useCreateFundMutation
} from '../../services/funds';
import { useModal } from '../../hooks';
import { Fund } from '../../types';

import FundModal from './components/FundModal';
import FundCard from './components/FundCard';

const Funds = () => {
  const { isOpenModal, hideModal, showModal } = useModal();
  const { data, isLoading } = useFetchFundsQuery({});
  const [ deleteFund ] = useDeleteFundMutation();
  const [ createFund ] = useCreateFundMutation();

  const handleOpenCreateModal = useCallback(() => {
    showModal();
  }, [showModal]);

  const handleHideCreateModal = useCallback(() => {
    hideModal();
  }, [hideModal]);

  const handleCreateNewFund = useCallback((fund: Fund) => {
    createFund(fund);
    hideModal();
  }, [createFund, hideModal]);

  return (
    <Page
      title="Funds"
      data-testid="funds-page-content"
      extra={
        <Tooltip title="Add fund">
          <CircleButton
            size="large"
            type="primary"
            data-testid="create-fund-btn"
            icon={<AddIcon />}
            onClick={handleOpenCreateModal}
          />
        </Tooltip>
      }
    >
      {!data && !isLoading && <Empty description="No funds" data-testid="empty-funds" />}
      <Row gutter={[16, 16]}>
        {data?.map((fund: Fund) => <FundCard key={fund.id} fund={fund} onDelete={deleteFund} />)}
      </Row>
      <FundModal
        isOpen={isOpenModal}
        onCancel={handleHideCreateModal}
        onSave={handleCreateNewFund}
      />
    </Page>
  );
};

export default Funds;
