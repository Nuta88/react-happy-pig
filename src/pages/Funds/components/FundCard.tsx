import {
  memo,
  FC,
  MouseEvent
} from 'react';
import { Link } from 'react-router-dom';

import {
  CircleButton,
  Col,
  Confirm,
  DeleteIcon,
  ProgressBar,
  SecondaryText
} from '../../../components';
import { apiUrls } from '../../../constants/apiUrls';
import { useCloseFundMutation } from '../../../services/funds';
import { Fund } from '../../../types';
import { NotificationType } from '../../../types/notification';
import {
  getAmount,
  getPercentage
} from '../../../utils/fund';

import { CardStyled, cardHeadStyle, cardBodyStyle } from './styled';

const layout = {
  xs: 24,
  md: 12,
  lg: 8
};

interface IFundCardProps {
  fund: Fund;
  openNotification: (type: NotificationType, content: string) => void
}

const FundCard: FC<IFundCardProps> = ({ fund, openNotification }) => {
  const [ closeFund ] = useCloseFundMutation();
  const title: string = `${fund.name} (${getAmount(fund.currentAmount)})`;
  const confirmRemoveTitle: string = `Are you sure you want to close "${fund.name}" fund?`;
  const currencyAmount: string = getAmount(fund.plannedAmount);
  const fundDetailLocation: string = apiUrls.funds.rootWithId(fund.id ?? 0);

  const handlePreventFundOpening = (event: MouseEvent<HTMLElement> | undefined): void => {
    event?.stopPropagation();
    event?.preventDefault();
  };

  const onRemoveFund = (event: MouseEvent<HTMLElement> | undefined): void => {
    handlePreventFundOpening(event);
    void closeFund(fund.id as number)
      .then(() => {
        openNotification(NotificationType.SUCCESS, `Fund "${fund.name}" was closed successfully!`);
      });
  };

  return (
    <Col
      {...layout}
      data-testid={`fund-${fund.name}`}
    >
      <Link to={fundDetailLocation}>
        <CardStyled
          headStyle={cardHeadStyle}
          bodyStyle={cardBodyStyle}
          title={title}
          extra={
            <Confirm
              title={confirmRemoveTitle}
              onConfirm={onRemoveFund}
              onCancel={handlePreventFundOpening}
            >
              <CircleButton
                icon={<DeleteIcon />}
                data-fund={fund.id}
                data-testid={`fund-${fund.name}-remove-fund`}
              />
            </Confirm>
          }
        >
          <SecondaryText>{currencyAmount}</SecondaryText>
          <ProgressBar percent={getPercentage(fund)} aria-label="Fund bar" />
        </CardStyled>
      </Link>
    </Col>
  );
};

export default memo(FundCard);
