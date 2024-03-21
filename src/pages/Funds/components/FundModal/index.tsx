import { Form } from 'antd';
import {
  FC,
  memo
} from 'react';

import {
  BasicModal,
  Input
} from '../../../../components';
import { useFetchBankQuery } from '../../../../services/bank';
import { useCreateFundMutation } from '../../../../services/funds';
import { Fund } from '../../../../types';
import { NotificationType } from '../../../../types/notification';
import {
  errorBankAmountMessage,
  generateError
} from '../../../../utils/form';
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
  openNotification: (type: NotificationType, content: string) => void;
  onCancel: () => void
}

const FundModal: FC<IFundModalProps> = ({ isOpen = false, onCancel, openNotification }) => {
  const { data: { amount = 0 } = {} } = useFetchBankQuery({});
  const [ createFund ] = useCreateFundMutation();
  const [ form ] = Form.useForm();

  const onCloseModal = (): void => {
    form.resetFields();
    onCancel();
  };

  const setAmountFormError = (amount: number): void => {
    form.setFields([ generateError('paymentAmount', [ errorBankAmountMessage(amount) ]) ]);
  };

  const generateNewFund = (values: IFormValues): Fund | undefined => {
    const { name, paymentAmount } = values;
    const penniesAmount = convertToPennies(paymentAmount);

    if (penniesAmount > amount) {
      setAmountFormError(amount);
      return;
    }

    return new Fund(name, penniesAmount);
  };

  const onFinish = (values: IFormValues): void => {
    const fund = generateNewFund(values);

    if (fund) {
      void createFund(fund)
        .then(() => {
          openNotification(NotificationType.SUCCESS, `Fund "${fund.name}" was created successfully!`);
          onCloseModal();
        });
    }
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
