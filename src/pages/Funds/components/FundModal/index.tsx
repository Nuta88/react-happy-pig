import { Form } from 'antd';
import {
  FC,
  memo
} from 'react';

import {
  BasicModal,
  Input
} from '../../../../components';
import { NotificationType } from '../../../../types/notification';

import { useFundCreate } from './hooks/useFundCreate';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 30 }
};

interface IFundModalProps {
  isOpen: boolean;
  openNotification: (type: NotificationType, content: string) => void;
  onCancel: () => void
}

const FundModal: FC<IFundModalProps> = ({ isOpen = false, onCancel, openNotification }) => {
  const [ form ] = Form.useForm();
  const { onCreateFund, onCloseModal } = useFundCreate({
    openNotification,
    onCancel,
    form
  });

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
        onFinish={onCreateFund}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[ { required: true, message: 'Please input fund name!' } ]}
        >
          <Input data-testid="fund-input-name" />
        </Form.Item>
        <Form.Item
          label="Current Amount"
          name="currentAmount"
          rules={[ { required: true, message: 'Please input Current Amount!' } ]}
        >
          <Input type="number" addonAfter="$" min={1} data-testid="fund-input-currentAmount" />
        </Form.Item>
        <Form.Item
          label="Planned Amount"
          name="plannedAmount"
        >
          <Input type="number" addonAfter="$" min={0} data-testid="fund-input-plannedAmount" />
        </Form.Item>
      </Form>
    </BasicModal>
  );
};

export default memo(FundModal);
