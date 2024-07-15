import {
  useDeferredValue,
  useState
} from 'react';

import {
  AddIcon,
  BookIcon,
  Empty,
  Page,
  Row,
  SpaceBetween,
  TooltipIconButton
} from '../../components';
import { apiUrls } from '../../constants/apiUrls';
import {
  useModal,
  useNotification
} from '../../hooks';
import { useFetchFundsQuery } from '../../services/funds';
import { Fund } from '../../types';
import { IFundFilter } from '../../types/fund';

import FundCard from './components/FundCard';
import FundFilters from './components/FundFilters';
import FundModal from './components/FundModal';

const Funds = (): JSX.Element => {
  const { isOpenModal, hideModal, openModal } = useModal();
  const [ filter, setFilter ] = useState<IFundFilter>({});
  const deferredQuery = useDeferredValue(filter);
  const { data: funds = [], isLoading, isFetching } = useFetchFundsQuery(deferredQuery, { refetchOnMountOrArgChange: true });
  const { notificationContext, openNotification } = useNotification();
  const isEmptyComponent: boolean = !funds.length && !isLoading;

  return (
    <Page
      title="Funds"
      data-testid="funds-page-content"
      isLoading={isLoading || isFetching}
      extra={[
        <SpaceBetween key="actions">
          <TooltipIconButton
            href={apiUrls.funds.expenses}
            tooltip="Expenditures of funds"
            data-testid="expenses-btn"
            icon={<BookIcon />}
            onClick={openModal}
          />
          <TooltipIconButton
            tooltip="Add fund"
            data-testid="create-fund-btn"
            icon={<AddIcon />}
            onClick={openModal}
          />
        </SpaceBetween>
      ]}
    >
      <FundFilters filter={filter} onFilters={setFilter} />
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
      {
        isOpenModal && (
          <FundModal
            isOpen={isOpenModal}
            onCancel={hideModal}
            openNotification={openNotification}
          />
        )
      }
    </Page>
  );
};

export default Funds;
