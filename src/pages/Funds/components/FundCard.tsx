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

interface IFundCardProps {
  fund: Fund;
  onDelete: (fundId: number) => void
}

const FundCard = ({ fund, onDelete }: IFundCardProps): JSX.Element => {
  const title: string = `${fund.name} (${getAmount(fund.currentAmount as number)})`;
  const confirmRemoveActivity = fund.expenses.length ? 'close' : 'delete';
  const confirmRemoveTitle: string = `Are you sure you want to ${confirmRemoveActivity} "${fund.name}" fund?`;
  const currencyAmount: string = getAmount(fund.plannedAmount);

  const handlePreventFundOpening = (event: MouseEvent<HTMLElement> | undefined): void => {
    event?.stopPropagation();
    event?.preventDefault();
  };

  const onRemoveFund = (event: MouseEvent<HTMLElement> | undefined): void => {
    handlePreventFundOpening(event);
    onDelete(fund.id as number);
  };

  return (
    <Col
      xs={24}
      md={12}
      lg={8}
      data-testid={`fund-${fund.name}`}
    >
      <Link to={apiUrls.funds.rootWithId(fund.id as number)}>
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
                type="primary"
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
