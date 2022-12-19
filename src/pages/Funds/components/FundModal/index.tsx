import { memo } from 'react';
import { Form } from 'antd';

import { BasicModal, Input } from '../../../../components';
import { convertToPennies } from '../../../../utils/fund';

import { Fund } from '../../../../types';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 32 },
};

type TFormValues = {
  name: string,
  paymentAmount: number
}

interface IFundModalProps {
  isOpen: boolean;
  onSave: (fund: Fund) => void;
  onCancel: () => void;
}

const FundModal = ({ isOpen, onSave, onCancel }: IFundModalProps) => {
  const [form] = Form.useForm();

  const onCloseModal = () => {
    form.resetFields();
    onCancel();
  };

  const onFinish = (values: TFormValues) => {
    const { name, paymentAmount } = values;

    onSave(new Fund(name, convertToPennies(paymentAmount)));
    form.resetFields();
  };

  return (
    <BasicModal
      title="Create new fund"
      isOpen={isOpen}
      okText="Create"
      onOk={form.submit}
      onCancel={onCloseModal}
    >
      <Form
        form={form}
        {...layout}
        name="fund-modal"
        autoComplete="off"
        onFinish={onFinish}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input fund name!' }]}
        >
          <Input data-testid="fund-input-name" />
        </Form.Item>
        <Form.Item
          label="Amount"
          name="paymentAmount"
          rules={[{ required: true, message: 'Please input Amount!' }]}
        >
          <Input type="number" addonAfter="$" min={1} data-testid="fund-input-paymentAmount" />
        </Form.Item>
      </Form>
    </BasicModal>
  );
}

FundModal.defaultProps = {
  isOpen: false
};

export default memo(FundModal);
