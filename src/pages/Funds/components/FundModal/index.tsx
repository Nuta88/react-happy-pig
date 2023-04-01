import { Form } from 'antd';
import { memo } from 'react';

import { BasicModal, Input } from '../../../../components';
import { Fund } from '../../../../types';
import { convertToPennies } from '../../../../utils/fund';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 32 }
};

interface IFormValues {
  name: string;
  paymentAmount: number
}

interface IFundModalProps {
  isOpen: boolean;
  onSave: (fund: Fund) => void;
  onCancel: () => void
}

const FundModal = ({ isOpen = false, onSave, onCancel }: IFundModalProps): JSX.Element => {
  const [ form ] = Form.useForm();

  const onCloseModal = (): void => {
    form.resetFields();
    onCancel();
  };

  const onFinish = (values: IFormValues): void => {
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
          rules={[ { required: true, message: 'Please input fund name!' } ]}
        >
          <Input data-testid="fund-input-name" />
        </Form.Item>
        <Form.Item
          label="Amount"
          name="paymentAmount"
          rules={[ { required: true, message: 'Please input Amount!' } ]}
        >
          <Input type="number" addonAfter="$" min={1} data-testid="fund-input-paymentAmount" />
        </Form.Item>
      </Form>
    </BasicModal>
  );
};

export default memo(FundModal);
