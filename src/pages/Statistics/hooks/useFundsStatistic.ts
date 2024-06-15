import { useFetchStatisticsQuery } from '../../../services/statistics';
import { convertToCurrency } from '../../../utils/fund';

interface IUpdateFund {
  fundsSum: number;
  bankAmount: number
}

export const useFundsStatistic = (): IUpdateFund => {
  const { data: { bankAmount, fundsCurrentAmountSum } = {} } = useFetchStatisticsQuery(undefined, { refetchOnMountOrArgChange: true });

  return {
    bankAmount: convertToCurrency(bankAmount),
    fundsSum: convertToCurrency(fundsCurrentAmountSum)
  };
};
