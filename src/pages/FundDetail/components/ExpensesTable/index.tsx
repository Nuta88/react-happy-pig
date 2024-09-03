import styled from 'styled-components';

import { colors } from '../../../../assets/colors';
import {
  Col,
  ColumnsType,
  EditableTitle,
  SecondaryText,
  SpaceBetween,
  Table,
  Text,
  Popover,
  Row
} from '../../../../components';
import { useModal } from '../../../../hooks';
import { useFetchBillTrackerQuery } from '../../../../services/billTracker';
import { Expense } from '../../../../types';
import {
  convertToCurrency,
  getAmount
} from '../../../../utils/fund';
import MoveExpenseModal from '../MoveExpenseModal';

import { generateColumns } from './columns';

const RowStyled = styled(Row)`
  padding: .3rem 0;
  border-bottom: 1px solid ${colors.background};
`;
const BillTrackerStyled = styled(Text)`
  cursor: pointer;
`;

const ListStyled = styled.div`
  min-width: 65vw;
`;

interface ExpensesTableProps {
  expenses: Expense[];
  fundId: number | null | undefined;
  plannedAmount: number | undefined;
  totalAmountOfExpenses: number | undefined;
  isLoading: boolean;
  onRemoveExpense: (id: number) => void;
  openExpenseModal: (expense: Expense) => void;
  onUpdatePlannedAmount: (amount: string | number) => void
}

const ExpensesTable = ({
  fundId,
  expenses,
  isLoading,
  plannedAmount,
  totalAmountOfExpenses,
  openExpenseModal,
  onRemoveExpense,
  onUpdatePlannedAmount
}: ExpensesTableProps): JSX.Element => {
  const {
    isOpenModal: isOpenMovingModal,
    modalContent: movingExpense,
    hideModal: hideMovingModal,
    openModal: openMovingModal
  } = useModal<Expense>();
  const { data: billTracker } = useFetchBillTrackerQuery({});
  const columns: ColumnsType<Expense> = generateColumns(onRemoveExpense, openExpenseModal, openMovingModal);

  return (
    <>
      <Table
        rowKey="id"
        size="small"
        columns={columns}
        dataSource={expenses}
        loading={isLoading}
        title={() => (
          <SpaceBetween>
            <Text>Expenses: {getAmount(totalAmountOfExpenses)}</Text>
            {billTracker && (
              <Popover
                placement="bottom"
                content={(
                  <ListStyled>
                    {
                      billTracker.expenses.map(expense => (
                        <RowStyled key={expense.id}>
                          <Col span={6}>Recipient: <SecondaryText>{expense.recipient}</SecondaryText></Col>
                          <Col span={6}>Date: <SecondaryText>{expense.date}</SecondaryText></Col>
                          <Col span={6}>Amount: <SecondaryText>{getAmount(expense.paymentAmount)}</SecondaryText></Col>
                          <Col span={6}>Description: <SecondaryText>{expense.description ?? '-'}</SecondaryText></Col>
                        </RowStyled>
                      ))
                    }
                  </ListStyled>
                )}
                title="Total Bill Tracker Expenses"
                trigger="click"
              >
                <BillTrackerStyled>
                  Total Bill Amount: {getAmount(billTracker?.expensesCurrentSum ?? 0)}
                </BillTrackerStyled>
              </Popover>
            )}
            <EditableTitle
              data-testid="fund-planned-amount"
              type="number"
              title={convertToCurrency(plannedAmount)}
              tooltip="Click to edit planned amount"
              secondaryTextBefore="Planned Amount: $"
              onChange={onUpdatePlannedAmount}
            />
          </SpaceBetween>
        )}
        scroll={{ y: 350 }}
      />
      <MoveExpenseModal
        isOpen={isOpenMovingModal}
        expense={movingExpense}
        fundId={fundId}
        onCancel={hideMovingModal}
      />
    </>
  );
};

export default ExpensesTable;
