import { memo, FC } from 'react';

import {
  BasicModal,
  Form,
  Input
} from '../../../../../components';
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

const LoanModal: FC<LoanModalProps> = ({ isOpen, onCancel }): JSX.Element => {
  const initialValues = createInitFormValues();
  const [ createLoan, { isLoading } ] = useCreateLoanMutation();
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
      onSave={form.submit}
      onCancel={onCloseModal}
      buttonTitle="Add"
      loading={isLoading}
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
          label="Name"
          name="name"
          rules={[ { required: true, message: 'Please input loan name!' } ]}
        >
          <Input data-testid="loan-input-name" />
        </Form.Item>
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
          <Input type="currency" min={1} data-testid="modal-loan-amount" />
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
          <Input type="currency" min={1} data-testid="modal-loan-paymentAmount" />
        </Form.Item>
        <Form.Item
          label="Date"
          name="startDate"
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
          <Input type="textarea" rows={2} />
        </Form.Item>
      </Form>
    </BasicModal>
  );
};

export default memo(LoanModal);
