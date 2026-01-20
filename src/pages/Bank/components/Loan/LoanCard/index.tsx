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
import { apiUrls } from '../../../../../constants/apiUrls';
import { useCloseLoanMutation } from '../../../../../services/bank';
import {
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
  const loanDetailLocation: string = apiUrls.bank.loanWithId(loan.id ?? 0);
  const title: string = `${loan.name ?? 'Loan'} ${getAmount(loan.amount)}`;

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
      <Link to={loanDetailLocation}>
        <CardStyled
          background={colors.greenBackground}
          title={title}
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
