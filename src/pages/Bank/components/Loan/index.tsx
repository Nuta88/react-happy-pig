import { Row } from '../../../../components';
import { useFetchLoansQuery } from '../../../../services/bank';

import LoanCard from './LoanCard';

const Loan = (): JSX.Element => {
  const { data: loans = [] } = useFetchLoansQuery(undefined, { refetchOnMountOrArgChange: true });

  return (
    <Row gutter={[ 16, 16 ]}>
      {loans?.map((loan) => (
        <LoanCard key={loan.id} loan={loan} />
      ))}
    </Row>
  );
};

export default Loan;
