import {
  FC,
  MouseEvent
} from 'react';
import { Link } from 'react-router-dom';

import { colors } from '../../../../../assets/colors';
import {
  Col,
  Confirm,
  DeleteIcon,
  ProgressBar,
  SecondaryText,
  TooltipIconButton
} from '../../../../../components';
import { useCloseLoanMutation } from '../../../../../services/bank';
import {
  cardBodyStyle,
  cardHeadStyle,
  CardStyled,
  layout
} from '../../../../../styled';
import { ILoan } from '../../../../../types/bank';
import {
  getAmount
} from '../../../../../utils/fund';

interface LoanCardProps {
  loan: ILoan
}
const LoanCard: FC<LoanCardProps> = ({ loan }) => {
  const [ closeLoan ] = useCloseLoanMutation();

  const getPercentage = (): number => Math.round((loan.repaymentAmount / loan.amount) * 100);

  const handlePreventLoanOpening = (event: MouseEvent<HTMLElement> | undefined): void => {
    event?.stopPropagation();
    event?.preventDefault();
  };

  const onRemove = (event: MouseEvent<HTMLElement> | undefined): void => {
    handlePreventLoanOpening(event);
    void closeLoan({ id: loan.id });
  };

  return (
    <Col
      {...layout}
    >
      <Link to="/">
        <CardStyled
          headStyle={cardHeadStyle}
          bodyStyle={cardBodyStyle}
          background={colors.greenBackground}
          title={getAmount(loan.amount)}
          extra={
            <Confirm
              title="Are you sure you want to close this loan?"
              onConfirm={onRemove}
            >
              <TooltipIconButton
                tooltip="Close loan"
                size="small"
                icon={<DeleteIcon />}
              />
            </Confirm>
          }
        >
          <SecondaryText>{getAmount(loan.repaymentAmount)}</SecondaryText>
          <ProgressBar percent={getPercentage()} strokeColor={colors.greenSecondary} aria-label="Loan bar" />
        </CardStyled>
      </Link>
    </Col>
  );
};

export default LoanCard;
