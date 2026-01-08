import {
  FC,
  memo
} from 'react';
import styled from 'styled-components';

import {
  AddIcon,
  BasicModal,
  DashedButton,
  Form,
  Input,
  MinusCircleIcon,
  Radio
} from '../../../../components';
import { FundPriority } from '../../../../constants/fund';
import { disablePreviousDate } from '../../../../utils/date';

import { useFundCreate } from './hooks/useFundCreate';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 30 }
};

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 30 }
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 8 }
  }
};

const MinusIconStyled = styled(MinusCircleIcon)`
  margin-left: .5rem;
`;

interface IFundModalProps {
  isOpen: boolean;
  onCancel: () => void
}

const FundModal: FC<IFundModalProps> = ({ isOpen = false, onCancel }) => {
  const [ form ] = Form.useForm();
  const priorityOptions = Object.entries(FundPriority);
  const { initialValues, onCreateFund, onCloseModal } = useFundCreate({
    onCancel,
    form
  });

  return (
    <BasicModal
      title="Create new fund"
      isOpen={isOpen}
      buttonTitle="Create"
      onOk={form.submit}
      onCancel={onCloseModal}
    >
      <Form
        form={form}
        {...layout}
        name="fund-modal"
        autoComplete="off"
        initialValues={initialValues}
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
          name="priority"
          label="Priority"
          rules={[
            { required: true, message: 'Please input priority!' }
          ]}
        >
          <Radio.Group>
            {priorityOptions.map(([ key, value ]) => (
              <Radio key={key} value={key}> {value.toLowerCase()} </Radio>
            ))}
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Requested Amount"
          name="requestedAmount"
        >
          <Input type="currency" min={0} data-testid="fund-input-equested" />
        </Form.Item>
        <Form.Item
          label="Planned Amount"
          name="plannedAmount"
        >
          <Input type="currency" suffix="$" min={0} data-testid="fund-input-plannedAmount" />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          data-testid="description"
        >
          <Input type="textarea" rows={2} />
        </Form.Item>
        <Form.Item
          label="Date"
          name="creationDate"
          data-testid="creationDate"
          rules={[ { required: true, message: 'Please input date!' } ]}
        >
          <Input type="datepicker" disabledDate={disablePreviousDate} />
        </Form.Item>
        <Form.List
          name="links"
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  label={index === 0 ? 'Links' : ''}
                  {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                  required={false}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={[ 'onChange', 'onBlur' ]}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "Please input link's name or delete this field."
                      }
                    ]}
                    noStyle
                  >
                    <Input placeholder="link name" style={{ width: '60%' }} />
                  </Form.Item>
                  {fields.length
                    ? (
                    <MinusIconStyled
                      onClick={() => { remove(field.name); }}
                    />
                      )
                    : null}
                </Form.Item>
              ))}
              <Form.Item>
                <DashedButton
                  onClick={() => { add(); }}
                  icon={<AddIcon />}
                >
                  Add link
                </DashedButton>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </BasicModal>
  );
};

export default memo(FundModal);
