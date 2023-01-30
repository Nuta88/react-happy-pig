import { useCallback } from 'react';

import {
  AddIcon,
  CircleButton,
  Empty,
  Page,
  Row,
  Tooltip
} from '../../components';
import { useModal } from '../../hooks';
import {
  useCreateFundMutation,
  useDeleteFundMutation,
  useFetchFundsQuery
} from '../../services/funds';
import { Fund } from '../../types';

import FundCard from './components/FundCard';
import FundModal from './components/FundModal';

const Funds = (): JSX.Element => {
  const {
    isOpenModal,
    hideModal,
    showModal
  } = useModal();
  const {
    data: funds = [],
    isLoading = false
  } = useFetchFundsQuery({});
  const [ deleteFund ] = useDeleteFundMutation();
  const [ createFund ] = useCreateFundMutation();
  const isShowEmptyComponent: boolean = !(funds.length > 0 || isLoading);
  
  const handleOpenCreateModal = useCallback(() => {
    showModal();
  }, [ showModal ]);
  
  const handleHideCreateModal = useCallback(() => {
    hideModal();
  }, [ hideModal ]);

  const handleCreateNewFund = useCallback((fund: Fund) => {
    void createFund(fund);
    hideModal();
  }, [ createFund, hideModal ]);

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
      {isShowEmptyComponent && <Empty description="No funds" data-testid="empty-funds"/>}
      <Row gutter={[ 16, 16 ]}>
        {funds?.map((fund: Fund) => <FundCard key={fund.id} fund={fund} onDelete={deleteFund}/>)}
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
