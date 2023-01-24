import { Form } from 'antd';
import { memo } from 'react';

import { BasicModal, Input } from '../../../../components';
import { Expense } from '../../../../types';
import { disablePreviousDate } from '../../../../utils/date';

import { convertExpenseToFormValues, convertFormValuesToExpense, IFormValues } from './helpers';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 32 }
};

interface IExpenseModalProps {
  isOpen: boolean;
  expense: Expense | null;
  onSave: (expense: Expense) => void;
  onCancel: () => void
}

function ExpenseModal ({ isOpen, expense, onSave, onCancel }: IExpenseModalProps): JSX.Element {
  const [ form ] = Form.useForm();
  const title: string = expense ? 'Edit expense' : 'Add expense';
  const initialValues = expense ? convertExpenseToFormValues(expense) : {};

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
          rules={[ { required: true, message: 'Please input recipient!' } ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Amount"
          name="paymentAmount"
          rules={[ { required: true, message: 'Please input Amount!' } ]}
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
}

ExpenseModal.defaultProps = {
  isOpen: false
};

export default memo(ExpenseModal);
