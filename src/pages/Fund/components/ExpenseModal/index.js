import { memo } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import { BasicModal, Input } from '../../../../components';

import { convertExpenseToFormValues, convertFormValuesToExpense } from './helpers';
import { disablePreviousDate } from '../../../../utils/date';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 32 },
};

function ExpenseModal({ isOpen, expense, onSave, onCancel }) {
  const [form] = Form.useForm();
  const title = expense ? 'Edit expense' : 'Add expense';
  const initialValues = expense ? convertExpenseToFormValues(expense) : {};

  const onCloseModal = () => {
    form.resetFields();
    onCancel();
  };

  const onFinish = values => {
    form.resetFields();
    onSave(convertFormValuesToExpense(expense, values));
  };

  return (
    <BasicModal
      title={title}
      isOpen={isOpen}
      onSave={()=>{}}
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
          rules={[{ required: true, message: 'Please input recipient!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Amount"
          name="paymentAmount"
          rules={[{ required: true, message: 'Please input Amount!' }]}
        >
          <Input type="number" addonAfter="$" min={1} />
        </Form.Item>
        <Form.Item
          label="Date"
          name="date"
          data-testid="date"
          rules={[{ required: true, message: 'Please input date!' }]}
        >
          <Input type="datepicker" disabledDate={disablePreviousDate}  />
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

ExpenseModal.propTypes = {
  isOpen: PropTypes.bool,
  expense: PropTypes.shape({
    recipient: PropTypes.string,
    date: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number,
    paymentAmount: PropTypes.number
  }),
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

ExpenseModal.defaultProps = {
  isOpen: false,
};

export default memo(ExpenseModal);
