import { Form } from 'antd';
import { memo, FC } from 'react';

import { BasicModal, Input } from '../../../../../components';
import { layout } from '../../../../../constants/form';
import { useCreateLoanMutation } from '../../../../../services/bank';
import { disablePreviousDate } from '../../../../../utils/date';

import {
  IFormValues,
  createInitFormValues,
  createNewLoan
} from './helpers';

interface LoanModalProps {
  isOpen: boolean;
  onCancel: () => void
}

const LoanModal: FC<LoanModalProps> = ({ isOpen, onCancel }) => {
  const initialValues = createInitFormValues();
  const [ createLoan ] = useCreateLoanMutation();
  const [ form ] = Form.useForm();

  const onCloseModal = (): void => {
    form.resetFields();
    onCancel();
  };

  const handleCreateLoan = (values: IFormValues): void => {
    void createLoan(createNewLoan(values))
      .unwrap()
      .then(() => { onCloseModal(); });
  };

  const onFinish = (values: IFormValues): void => {
    handleCreateLoan(values);
  };

  return (
    <BasicModal
      title="Add new loan"
      isOpen={isOpen}
      okText="Add"
      onOk={form.submit}
      onCancel={onCloseModal}
    >
      <Form
        form={form}
        {...layout}
        initialValues={initialValues}
        name="loan-modal"
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
              min: 1,
              message: 'Amount must be minimum 1 characters!'
            }
          ]}
        >
          <Input type="number" addonAfter="$" min={1} data-testid="modal-loan-amount" />
        </Form.Item>
        <Form.Item
          label="Payment amount"
          name="paymentAmount"
          rules={[
            { required: true, message: 'Please input Payment amount!' },
            {
              type: 'number',
              min: 1,
              message: 'Amount must be minimum 1 characters!'
            }
          ]}
        >
          <Input type="number" addonAfter="$" min={1} data-testid="modal-loan-paymentAmount" />
        </Form.Item>
        <Form.Item
          label="Date"
          name="startDate"
          data-testid="date"
          rules={[ { required: true, message: 'Please input date!' } ]}
        >
          <Input type="datepicker" disabledDate={disablePreviousDate} />
        </Form.Item>
      </Form>
    </BasicModal>
  );
};

export default memo(LoanModal);
