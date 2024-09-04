import { Form } from 'antd';
import { memo, FC } from 'react';

import { BasicModal, Input, Select, SelectOption } from '../../../../components';
import { IncomeSource } from '../../../../constants/bank';
import { layout } from '../../../../constants/form';
import {
  useCreateIncomeMutation,
  useUpdateIncomeMutation
} from '../../../../services/bank';
import { Income } from '../../../../types';
import { disablePreviousDate } from '../../../../utils/date';
import { generateError } from '../../../../utils/form';

import {
  IFormValues,
  createInitFormValues,
  createNewIncome,
  updateSelectedIncome
} from './helpers';

interface IIncomeModalProps {
  isOpen: boolean;
  income: Income | null;
  onCancel: () => void
}

const IncomeModal: FC<IIncomeModalProps> = ({ isOpen, income, onCancel }) => {
  const title: string = income ? 'Edit income' : 'Add new income';
  const sourceOptions = Object.entries(IncomeSource);
  const initialValues = createInitFormValues(income);
  const [ createIncome ] = useCreateIncomeMutation();
  const [ updateIncome ] = useUpdateIncomeMutation();
  const [ form ] = Form.useForm();

  const onCloseModal = (): void => {
    form.resetFields();
    onCancel();
  };

  const setAmountFormError = (error: string): void => {
    form.setFields([ generateError('amount', [ error ]) ]);
  };

  const handleEditIncome = (values: IFormValues): void => {
    void updateIncome(updateSelectedIncome(values, income as Income))
      .unwrap()
      .then(() => { onCloseModal(); })
      .catch(({ data }) => { setAmountFormError(data.message); });
  };

  const handleCreateIncome = (values: IFormValues): void => {
    void createIncome(createNewIncome(values))
      .unwrap()
      .then(() => { onCloseModal(); });
  };

  const onFinish = (values: IFormValues): void => {
    if (income) {
      handleEditIncome(values);
      return;
    }
    handleCreateIncome(values);
  };

  return (
    <BasicModal
      title={title}
      isOpen={isOpen}
      okText={income ? 'Edit' : 'Add'}
      onOk={form.submit}
      onCancel={onCloseModal}
    >
      <Form
        form={form}
        {...layout}
        initialValues={initialValues}
        name="income-modal"
        autoComplete="off"
        onFinish={onFinish}
      >
        <Form.Item
          name="source"
          label="Source"
          rules={[
            { required: true, message: 'Please input source!' },
            {
              type: 'string',
              min: 2,
              max: 50,
              message: 'Source must be from 2 characters to 50 characters!'
            }
          ]}
        >
          <Select
            placeholder="Select source of income"
            allowClear
          >
            {sourceOptions.map(([ key, value ]) => (
              <SelectOption key={key} value={key}>{value}</SelectOption>
            ))}
          </Select>
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
          <Input type="number" addonAfter="$" min={1} data-testid="modal-income-amount" />
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

export default memo(IncomeModal);
