import { useNavigate } from 'react-router-dom';

import {
  ColumnsType,
  Page,
  Table
} from '../../components';
import { apiUrls } from '../../constants/apiUrls';
import { useColumn } from '../../hooks';
import { useQueryFilters } from '../../hooks/useQueryFilters';
import { useFetchExpensesQuery } from '../../services/funds';
import { Expense } from '../../types';
import {
  convertDateToString,
  today
} from '../../utils/date';

import { generateColumns } from './columns';

const Expenses = (): JSX.Element => {
  const navigate = useNavigate();
  const { query, setQuery } = useQueryFilters({ date: convertDateToString(today) });
  const { getDateFilterProps } = useColumn(setQuery);
  const columns: ColumnsType<Expense> = generateColumns(getDateFilterProps);
  const { data: expenses } = useFetchExpensesQuery(query);

  const navigateToFunds = (): void => {
    navigate(apiUrls.funds.root, { replace: true });
  };

  return (
    <Page
      title="Expenses"
      isBack
      data-testid="fund-page-content"
      onBack={navigateToFunds}
    >
      <Table
        rowKey="id"
        size="small"
        columns={columns}
        dataSource={expenses}
        scroll={{ y: 350 }}
      />
    </Page>
  );
};

export default Expenses;
