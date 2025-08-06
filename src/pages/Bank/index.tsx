import { Tabs } from 'antd';
import { useState } from 'react';

import { Page } from '../../components';
import {
  useFetchBankQuery
} from '../../services/bank';
import { getAmount } from '../../utils/fund';

import BankPageActions from './components/BankPageActions';
import Incomes from './components/Incomes';
import Loan from './components/Loan';

const Bank = (): JSX.Element => {
  const [ tabKey, setTabKey ] = useState('incomes');
  const { data: { amount, incomes = [] } = {}, isLoading, isFetching } = useFetchBankQuery(undefined, { refetchOnMountOrArgChange: true });
  const pageTitle = `Bank (${getAmount(amount)})`;

  return (
    <Page
      title={pageTitle}
      data-testid="bank-page-content"
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
              children: (
                <Incomes
                  incomes={incomes}
                  isLoading={isLoading || isFetching}
                />
              )
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
