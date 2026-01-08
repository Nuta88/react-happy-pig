import { Form } from 'antd';
import {
  FC,
  memo
} from 'react';

import { BasicModal, Input } from '../../../../components';
import { layout } from '../../../../constants/form';
import { LoanPayment } from '../../../../types/bank';
import { disablePreviousDate } from '../../../../utils/date';
import { convertToCurrency } from '../../../../utils/fund';

import {
  createInitFormValues,
  createNewPayment,
  IFormValues,
  updatePayment
} from './helpers';

interface PaymentModalProps {
  loanId: number;
  payment?: LoanPayment | null | undefined;
  minAmount: number;
  isOpen: boolean;
  onCancel: () => void;
  onCreatePayment: (payment: LoanPayment) => void
}

const PaymentModal: FC<PaymentModalProps> = ({ loanId, payment, minAmount, isOpen, onCancel, onCreatePayment }): JSX.Element => {
  const [ form ] = Form.useForm();
  const minCurrencyPayment = convertToCurrency(minAmount);
  const initialValues = createInitFormValues(payment ? convertToCurrency(payment.amount) : minCurrencyPayment);

  const onCloseModal = (): void => {
    form.resetFields();
    onCancel();
  };

  const handleCreate = (values: IFormValues): void => {
    onCreatePayment(payment ? updatePayment(values, payment) : createNewPayment(values, loanId));
  };

  const onFinish = (values: IFormValues): void => {
    handleCreate(values);
  };

  return (
    <BasicModal
      title="Add new payment"
      isOpen={isOpen}
      buttonTitle="Add"
      onOk={form.submit}
      onCancel={onCloseModal}
    >
      <Form
        form={form}
        {...layout}
        initialValues={initialValues}
        name="payment-modal"
        autoComplete="off"
        onFinish={onFinish}
      >
        <Form.Item
          label="Amount"
          name="amount"
          rules={[
            { required: true, message: 'Please input Amount!' },
            {
              type: 'number',
              min: minCurrencyPayment,
              message: `Amount shouldn't be less than ${minCurrencyPayment} (payment)!`
            }
          ]}
        >
          <Input type="currency" min={1} />
        </Form.Item>
          <Form.Item
            label="Date"
            name="date"
            data-testid="date"
            rules={[ { required: true, message: 'Please input date!' } ]}
          >
            <Input type="datepicker" disabledDate={disablePreviousDate} />
        </Form.Item>
      </Form>
    </BasicModal>
  );
};

export default memo(PaymentModal);
