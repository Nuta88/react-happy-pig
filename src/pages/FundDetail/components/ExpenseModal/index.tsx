import { Form } from 'antd';
import {
  FC,
  memo
} from 'react';

import {
  BasicModal,
  Input
} from '../../../../components';
import { layout } from '../../../../constants/form';
import { Expense } from '../../../../types';
import { AssociatedObjectType } from '../../../../types/tag';
import { disablePreviousDate } from '../../../../utils/date';
import {
  errorFundAmountMessage,
  generateError
} from '../../../../utils/form';
import { convertToPennies } from '../../../../utils/fund';
import { AssigningTag } from '../AssigningTag';

import {
  convertFormValuesToExpense,
  createInitFormValues,
  IFormValues
} from './helpers';

interface IExpenseModalProps {
  isOpen: boolean;
  availableAmount: number;
  expense: Expense | null;
  onSave: (expense: Expense) => void;
  onCancel: () => void
}

const ExpenseModal: FC<IExpenseModalProps> = ({ isOpen, expense, availableAmount, onSave, onCancel }) => {
  const title: string = expense ? 'Edit expense' : 'Add expense';
  const initialValues = createInitFormValues(expense);
  const [ form ] = Form.useForm();
  // TODO: remove
  const isHideAssigningTag: boolean = true;

  const onCloseModal = (): void => {
    form.resetFields();
    onCancel();
  };

  const setAmountFormError = (amount: number): void => {
    form.setFields([ generateError('paymentAmount', [ errorFundAmountMessage(amount) ]) ]);
  };

  const onFinish = (values: IFormValues): void => {
    const penniesAmount = convertToPennies(values.paymentAmount);

    if (!expense && penniesAmount > availableAmount) {
      setAmountFormError(availableAmount);
      return;
    }

    if (expense) {
      const availableExpense = availableAmount + expense?.paymentAmount;
      if (penniesAmount > availableExpense) {
        setAmountFormError(availableExpense);
        return;
      }
    }

    form.resetFields();
    onSave(convertFormValuesToExpense(expense, values));
  };

  return (
    <BasicModal
      title={title}
      isOpen={isOpen}
      okText={expense ? 'Edit' : 'Add'}
      onOk={form.submit}
      onCancel={onCloseModal}
    >
      <>
        <Form
          form={form}
          {...layout}
          initialValues={initialValues}
          name="expense-modal"
          autoComplete="off"
          onFinish={onFinish}
        >
          <Form.Item
            label="Recipient"
            name="recipient"
            data-testid="recipient"
            rules={[
              { required: true, message: 'Please input recipient!' },
              {
                type: 'string',
                min: 2,
                max: 50,
                message: 'Recipient must be from 2 characters to 50 characters!'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Amount"
            name="paymentAmount"
            rules={[
              { required: true, message: 'Please input Amount!' },
              {
                type: 'number',
                min: 1,
                message: 'Amount must be minimum 1 characters!'
              }
            ]}
          >
            <Input type="number" addonAfter="$" min={1} />
          </Form.Item>
          <Form.Item
            label="Date"
            name="date"
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
            <Input type="textarea" rows={4} />
          </Form.Item>
        </Form>
        {expense && !isHideAssigningTag && (
          <AssigningTag
            associatedObjectId={expense?.id as number}
            asociatedObjectType={AssociatedObjectType.EXPENSE}
          />
        )}
      </>
    </BasicModal>
  );
};

export default memo(ExpenseModal);
