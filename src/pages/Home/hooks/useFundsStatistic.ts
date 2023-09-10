import { useFetchFundsQuery } from '../../../services/funds';

interface IUpdateFund {
  overrunFunds: number;
  activeFunds: number
}

export const useFundsStatistic = (): IUpdateFund => {
  const { data: funds = [] } = useFetchFundsQuery(undefined, { refetchOnMountOrArgChange: true });
  const overrunFunds = (funds.filter(f => (f.currentAmount ?? 0) < 0).length / funds.length) * 100;
  const activeFunds = (funds.filter(f => f.expenses.length).length / funds.length) * 100;

  return {
    overrunFunds,
    activeFunds
  };
};
