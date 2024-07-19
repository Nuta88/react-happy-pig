import { Form } from 'antd';
import {
  FC,
  memo
} from 'react';

import {
  BasicModal,
  Select,
  SelectOption
} from '../../../../components';
import { layout } from '../../../../constants/form';
import {
  useFetchFundsQuery,
  useMovingExpenseMutation
} from '../../../../services/funds';
import {
  Expense,
  Fund
} from '../../../../types';

interface IExpenseModalProps {
  isOpen: boolean;
  expense: Expense | null;
  fundId: number | null | undefined;
  onCancel: () => void
}

interface IFormValues {
  fundId: number
}

const MoveExpenseModal: FC<IExpenseModalProps> = ({ isOpen, expense, fundId, onCancel }) => {
  const { data: funds = [] } = useFetchFundsQuery({});
  const [ movingExpense ] = useMovingExpenseMutation();
  const initialValues = {};
  const [ form ] = Form.useForm();

  const onCloseModal = (): void => {
    form.resetFields();
    onCancel();
  };

  const onFinish = (values: IFormValues): void => {
    void movingExpense({ newFundId: values.fundId, expenseId: expense?.id as number });
    onCloseModal();
  };

  return (
    <BasicModal
      title="Move expense"
      isOpen={isOpen}
      okText="Move"
      onOk={form.submit}
      onCancel={onCloseModal}
    >
      <>
        <Form
          form={form}
          {...layout}
          initialValues={initialValues}
          name="move-expense-modal"
          autoComplete="off"
          onFinish={onFinish}
        >
          <Form.Item
            label="Fund"
            name="fundId"
            data-testid="recipient"
            rules={[
              { required: true, message: 'Please input fund!' }
            ]}
          >
            <Select
              placeholder="Select new fund"
              allowClear
            >
              {funds.filter(f => f.id !== fundId).map((fund: Fund) => (
                <SelectOption key={fund.id} value={fund.id}>{fund.name}</SelectOption>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </>
    </BasicModal>
  );
};

export default memo(MoveExpenseModal);
