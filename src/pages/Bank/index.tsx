import { Tabs } from 'antd';

import { Page } from '../../components';
import { useTabs } from '../../hooks/useTabs';
import {
  useFetchBankQuery
} from '../../services/bank';
import { getAmount } from '../../utils/fund';

import BankPageActions from './components/BankPageActions';
import Incomes from './components/Incomes';
import Loan from './components/Loan';

const Bank = (): JSX.Element => {
  const { tabKey, setTabKey } = useTabs('incomes', [ 'incomes', 'loans' ]);
  const { data: { amount } = {}, isLoading, isFetching } = useFetchBankQuery(undefined, { refetchOnMountOrArgChange: true });
  const pageTitle = `Bank (${getAmount(amount)})`;

  return (
    <Page
      title={pageTitle}
      data-testid="bank-page-content"
      isLoading={isLoading || isFetching}
      extra={
        <BankPageActions tabKey={tabKey} key="bank-actions"/>
      }
    >
      <Tabs
        defaultActiveKey={tabKey}
        onChange={setTabKey}
        items={
          [
            {
              key: 'incomes',
              label: 'Incomes',
              children: <Incomes />
            },
            {
              key: 'loans',
              label: 'Loans',
              children: <Loan />
            }
          ]
        }
      />
    </Page>
  );
};

export default Bank;
