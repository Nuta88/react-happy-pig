import {
  AddIcon,
  Empty,
  Page,
  Row,
  TooltipIconButton
} from '../../components';
import {
  useModal,
  useNotification
} from '../../hooks';
import { useFetchFundsQuery } from '../../services/funds';
import { Fund } from '../../types';

import FundCard from './components/FundCard';
import FundModal from './components/FundModal';

const Funds = (): JSX.Element => {
  const { isOpenModal, hideModal, openModal } = useModal();
  const { data: funds = [], isLoading } = useFetchFundsQuery(undefined, { refetchOnMountOrArgChange: true });
  const { notificationContext, openNotification } = useNotification();
  const isEmptyComponent: boolean = !funds.length && !isLoading;

  return (
    <Page
      title="Funds"
      data-testid="funds-page-content"
      extra={
        <TooltipIconButton
          tooltip="Add fund"
          data-testid="create-fund-btn"
          icon={<AddIcon />}
          onClick={openModal}
        />
      }
    >
      {notificationContext}
      {isEmptyComponent && <Empty description="No funds" data-testid="empty-funds"/>}
      <Row gutter={[ 16, 16 ]}>
        {funds?.map((fund: Fund) => (
          <FundCard
            key={fund.id}
            fund={fund}
            openNotification={openNotification}
          />
        ))}
      </Row>
      <FundModal
        isOpen={isOpenModal}
        onCancel={hideModal}
        openNotification={openNotification}
      />
    </Page>
  );
};

export default Funds;
