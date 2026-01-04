import {
  Loading,
  Row
} from '../../../../components';
import { useFetchLoansQuery } from '../../../../services/bank';

import LoanCard from './LoanCard';

const Loan = (): JSX.Element => {
  const { data: loans = [], isLoading, isFetching } = useFetchLoansQuery(undefined, { refetchOnMountOrArgChange: true });
  const isLoadingLoans = isLoading || isFetching;

  return (
   <>
     {isLoadingLoans && <Loading />}
     <Row gutter={[ 16, 16 ]}>
       {loans?.map((loan) => (
         <LoanCard key={loan.id} loan={loan} />
       ))}
     </Row>
   </>
  );
};

export default Loan;
