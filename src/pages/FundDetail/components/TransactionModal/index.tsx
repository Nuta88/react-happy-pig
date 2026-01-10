import {
  Form,
  Radio
} from 'antd';
import {
  FC,
  memo
} from 'react';
import { useParams } from 'react-router-dom';

import {
  BasicModal,
  Input
} from '../../../../components';
import { BankTransferType } from '../../../../constants/bank';
import { useTransactionMutation } from '../../../../services/funds';
import { generateError } from '../../../../utils/form';

import {
  convertFormValuesToTransfer,
  createInitFormValues
} from './helpers';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 30 }
};

interface IExpenseModalProps {
  isOpen: boolean;
  onCancel: () => void
}

const TransactionModal: FC<IExpenseModalProps> = ({ isOpen, onCancel }) => {
  const { id } = useParams();
  const initialValues = createInitFormValues();
  const [ form ] = Form.useForm();
  const [ transaction ] = useTransactionMutation({});

  const onCloseModal = (): void => {
    form.resetFields();
    onCancel();
  };

  const onFinish = (values: any): void => {
    void transaction(convertFormValuesToTransfer(values, Number(id)))
      .unwrap()
      .then(() => {
        onCloseModal();
      })
      .catch(({ data }) => {
        form.setFields([ generateError('amount', [ data.message ]) ]);
      });
  };

  return (
    <BasicModal
      title="Bank Money Transaction"
      isOpen={isOpen}
      buttonTitle="Request"
      onSave={form.submit}
      onCancel={onCloseModal}
    >
      <Form
        form={form}
        {...layout}
        initialValues={initialValues}
        name="transaction-modal"
        autoComplete="off"
        onFinish={onFinish}
      >
        <Form.Item
          label="Transfer Type"
          name="transferType"
        >
          <Radio.Group>
            <Radio value={BankTransferType.TO_FUND}> request the money </Radio>
            <Radio value={BankTransferType.FROM_FUND}> return the money </Radio>
          </Radio.Group>
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
          <Input type="currency" min={1} />
        </Form.Item>
      </Form>
    </BasicModal>
  );
};

export default memo(TransactionModal);
