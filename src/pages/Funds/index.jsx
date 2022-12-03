import { useCallback } from 'react';
import { Link } from 'react-router-dom';

import {
  Page,
  Empty,
  Card,
  Row,
  Col,
  ProgressBar,
  CircleButton,
  SecondaryText,
  Confirm,
  DeleteIcon, Tooltip, AddIcon
} from '../../components';
import {
  useFetchFundsQuery,
  useDeleteFundMutation,
  useCreateFundMutation
} from '../../services/funds';
import { useModal } from '../../hooks';
import { getPercentage, getFundAmount } from '../../utils/fund';
import { apiUrls } from '../../constants/apiUrls';

import FundModal from './components/FundModal';

const cardStyle = {
  minHeight: 204,
  backgroundColor: "rgba(181,200,238,0.34)"
};

const cardBodyStyle = {
  minHeight: 140,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  padding: '.63rem 1.5rem'
};

function Funds() {
  const { isOpenModal, hideModal, showModal } = useModal();
  const { data, isLoading } = useFetchFundsQuery({}, { refetchOnMountOrArgChange: true });
  const [ deleteFund ] = useDeleteFundMutation();
  const [ createFund ] = useCreateFundMutation();

  const handlePreventFundOpening = event => {
    event.stopPropagation();
    event.preventDefault();
  };

  const handleRemoveFund = (event, fundId) => {
    handlePreventFundOpening(event);
    deleteFund(fundId);
  };

  const handleOpenCreateModal = useCallback(() => {
    showModal();
  }, [showModal]);

  const handleHideCreateModal = useCallback(() => {
    hideModal();
  }, [hideModal]);

  const handleCreateNewFund = useCallback((fund) => {
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
        {data?.map(fund => (
          <Col key={fund.id} xs={24} md={12} lg={8} data-testid={`fund-${fund.name}`}>
            <Link to={apiUrls.funds.details(fund.id)}>
              <Card
                style={cardStyle}
                bodyStyle={cardBodyStyle}
                title={`${fund.name} (${getFundAmount(fund.currentAmount)})`}
                extra={
                  <Confirm
                    title={`Are you sure to delete "${fund.name}" fund?`}
                    onConfirm={event => handleRemoveFund(event, fund.id)}
                    onCancel={handlePreventFundOpening}
                  >
                    <CircleButton
                      type="primary"
                      icon={<DeleteIcon />}
                      data-fund={fund.id}
                      data-testid={`fund-${fund.name}-remove-fund`}
                    />
                  </Confirm>
                }
              >
                <SecondaryText>{getFundAmount(fund.plannedAmount)}</SecondaryText>
                <ProgressBar percent={getPercentage(fund)} />
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
      <FundModal
        isOpen={isOpenModal}
        onCancel={handleHideCreateModal}
        onSave={handleCreateNewFund}
      />
    </Page>
  );
}

export default Funds;