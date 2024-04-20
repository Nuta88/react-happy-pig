import { useFetchFundsQuery } from '../../../services/funds';

interface IUpdateFund {
  overrunFunds: number;
  activeFunds: number
}

export const useFundsStatistic = (): IUpdateFund => {
  const { data: funds = [] } = useFetchFundsQuery(undefined, { refetchOnMountOrArgChange: true });
  const overrunFunds = funds.length ? (funds.filter(f => (f.receivedAmount ?? 0) < 0).length / funds.length) * 100 : 0;
  const activeFunds = funds.length ? (funds.filter(f => f.expenses.length).length / funds.length) * 100 : 0;

  return {
    overrunFunds,
    activeFunds
  };
};
