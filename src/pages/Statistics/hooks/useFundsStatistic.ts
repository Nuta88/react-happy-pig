import { useFetchStatisticsQuery } from '../../../services/statistics';
import { convertToCurrency } from '../../../utils/fund';

interface IFundsStatistics {
  bankAmount: number;
  fundsCurrentAmount: number;
  fundsReceivedAmount: number;
  fundsPlannedAmount: number;
  isLoading: boolean
}

export const useFundsStatistic = (): IFundsStatistics => {
  const {
    data: { bankAmount, fundsCurrentAmountSum, fundsReceivedAmountSum, fundsPlannedAmountSum } = {},
    isLoading,
    isFetching
  } = useFetchStatisticsQuery(undefined, { refetchOnMountOrArgChange: true });

  return {
    bankAmount: convertToCurrency(bankAmount),
    fundsCurrentAmount: convertToCurrency(fundsCurrentAmountSum),
    fundsReceivedAmount: convertToCurrency(fundsReceivedAmountSum),
    fundsPlannedAmount: convertToCurrency(fundsPlannedAmountSum),
    isLoading: isLoading || isFetching
  };
};
