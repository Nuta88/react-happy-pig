import { Form } from 'antd';
import { memo, FC } from 'react';

import { BasicModal, Input } from '../../../../components';
import { layout } from '../../../../constants/form';
import { Expense } from '../../../../types';
import { disablePreviousDate } from '../../../../utils/date';

import {
  convertFormValuesToExpense,
  createInitFormValues,
  IFormValues
} from './helpers';

interface IExpenseModalProps {
  isOpen: boolean;
  expense: Expense | null;
  onSave: (expense: Expense) => void;
  onCancel: () => void
}

const ExpenseModal: FC<IExpenseModalProps> = ({ isOpen, expense, onSave, onCancel }) => {
  const title: string = expense ? 'Edit expense' : 'Add expense';
  const initialValues = createInitFormValues(expense);
  const [ form ] = Form.useForm();

  const onCloseModal = (): void => {
    form.resetFields();
    onCancel();
  };

  const onFinish = (values: IFormValues): void => {
    form.resetFields();
    onSave(convertFormValuesToExpense(expense, values));
  };

  return (
    <BasicModal
      title={title}
      isOpen={isOpen}
      okText={expense ? 'Edit' : 'Add'}
      onOk={form.submit}
      onCancel={onCloseModal}
    >
      <Form
        form={form}
        {...layout}
        initialValues={initialValues}
        name="expense-modal"
        autoComplete="off"
        onFinish={onFinish}
      >
        <Form.Item
          label="Recipient"
          name="recipient"
          data-testid="recipient"
          rules={[
            { required: true, message: 'Please input recipient!' },
            {
              type: 'string',
              min: 2,
              max: 50,
              message: 'Recipient must be from 2 characters to 50 characters!'
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Amount"
          name="paymentAmount"
          rules={[
            { required: true, message: 'Please input Amount!' },
            {
              type: 'number',
              min: 1,
              message: 'Amount must be minimum 1 characters!'
            }
          ]}
        >
          <Input type="number" addonAfter="$" min={1} />
        </Form.Item>
        <Form.Item
          label="Date"
          name="date"
          data-testid="date"
          rules={[ { required: true, message: 'Please input date!' } ]}
        >
          <Input type="datepicker" disabledDate={disablePreviousDate} />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          data-testid="description"
        >
          <Input type="textarea" rows={4} />
        </Form.Item>
      </Form>
    </BasicModal>
  );
};

export default memo(ExpenseModal);
