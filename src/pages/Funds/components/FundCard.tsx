import {
  memo,
  MouseEvent
} from 'react';
import { Link } from 'react-router-dom';

import {
  CircleButton,
  Col,
  Confirm,
  DeleteIcon,
  CloseIcon,
  ProgressBar,
  SecondaryText
} from '../../../components';
import { apiUrls } from '../../../constants/apiUrls';
import { Fund } from '../../../types';
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
  onDelete: (fund: Fund) => void
}

const FundCard = ({ fund, onDelete }: IFundCardProps): JSX.Element => {
  const title: string = `${fund.name} (${getAmount(fund.currentAmount as number)})`;
  const confirmRemoveActivity: string = fund.expenses.length ? 'close' : 'delete';
  const confirmRemoveTitle: string = `Are you sure you want to ${confirmRemoveActivity} "${fund.name}" fund?`;
  const currencyAmount: string = getAmount(fund.plannedAmount);
  const fundDetailLocation: string = apiUrls.funds.rootWithId(fund.id ?? 0);

  const handlePreventFundOpening = (event: MouseEvent<HTMLElement> | undefined): void => {
    event?.stopPropagation();
    event?.preventDefault();
  };

  const onRemoveFund = (event: MouseEvent<HTMLElement> | undefined): void => {
    handlePreventFundOpening(event);
    onDelete(fund);
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
                icon={fund.expenses.length ? <CloseIcon /> : <DeleteIcon />}
                data-fund={fund.id}
                data-testid={`fund-${fund.name}-remove-fund`}
              />
            </Confirm>
          }
        >
          <SecondaryText>{currencyAmount}</SecondaryText>
          <ProgressBar percent={getPercentage(fund)} />
        </CardStyled>
      </Link>
    </Col>
  );
};

export default memo(FundCard);
