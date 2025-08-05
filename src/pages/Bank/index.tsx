import { Tabs } from 'antd';
import {
  useCallback,
  useState
} from 'react';

import {
  AddIcon,
  Page,
  TooltipIconButton
} from '../../components';
import {
  useFetchBankQuery
} from '../../services/bank';
import { getAmount } from '../../utils/fund';

import Incomes from './components/Incomes';

const Bank = (): JSX.Element => {
  const [ isCreateIncome, setIsCreateIncome ] = useState(false);
  const { data: { amount, incomes = [] } = {}, isLoading, isFetching } = useFetchBankQuery(undefined, { refetchOnMountOrArgChange: true });
  const pageTitle = `Bank (${getAmount(amount)})`;

  const handleCreateIncome = useCallback(() => {
    setIsCreateIncome(true);
  }, [ ]);

  return (
    <Page
      title={pageTitle}
      data-testid="bank-page-content"
      extra={
        <TooltipIconButton
          tooltip="Add income"
          size="large"
          icon={<AddIcon />}
          data-testid="create-income-btn"
          onClick={handleCreateIncome}
        />
      }
    >
      <Tabs
        defaultActiveKey="1"
        items={
          [
            {
              key: '1',
              label: 'Incomes',
              children: (
                <Incomes
                  incomes={incomes}
                  isLoading={isLoading || isFetching}
                  isCreateIncome={isCreateIncome}
                  onHideCreateModal={setIsCreateIncome}
                />
              )
            },
            {
              key: '2',
              label: 'Loans',
              children: 'Content of Loan'
            }
          ]
        }
      />
    </Page>
  );
};

export default Bank;
