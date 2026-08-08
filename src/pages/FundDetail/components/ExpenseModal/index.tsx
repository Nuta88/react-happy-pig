import { Form } from 'antd';
import {
  FC,
  memo,
  useEffect
} from 'react';

import {
  BasicModal,
  Input
} from '../../../../components';
import { layout } from '../../../../constants/form';
import {
  useCreateExpenseMutation,
  useUpdateExpenseMutation
} from '../../../../services/funds';
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
  IFormValues,
  isAmountAvailable,
  prepareExpenseForCached
} from './helpers';

interface IExpenseModalProps {
  fundId: number;
  isOpen: boolean;
  availableAmount: number;
  expense: Expense | null;
  onClose: (expense?: Expense) => void
}

const ExpenseModal: FC<IExpenseModalProps> = ({ isOpen, expense, fundId, availableAmount, onClose }) => {
  const [ createExpense ] = useCreateExpenseMutation();
  const [ updateExpense ] = useUpdateExpenseMutation();
  const isEdit: boolean = !!expense && !(expense.id == null);
  const title: string = isEdit ? 'Edit expense' : 'Add expense';
  const initialValues = createInitFormValues(fundId, expense);
  const [ form ] = Form.useForm();
  // TODO: remove
  const isHideAssigningTag: boolean = true;
  const availableExpense = availableAmount + (expense?.paymentAmount ?? 0);

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [ initialValues ]);

  const onCloseModal = (): void => {
    form.resetFields();
    onClose(expense ? prepareExpenseForCached(expense) : undefined);
  };

  const onCloseModalAfterSaving = (newExpense: Expense): void => {
    form.resetFields();
    onClose(prepareExpenseForCached(newExpense));
  };

  const setAmountFormError = (amount: number): void => {
    form.setFields([ generateError('paymentAmount', [ errorFundAmountMessage(amount) ]) ]);
  };

  const onCreateExpense = (values: IFormValues): void => {
    const newExpense = convertFormValuesToExpense(expense, fundId, values);
    void createExpense(newExpense);
    onCloseModalAfterSaving(newExpense);
  };

  const onCreate = (values: IFormValues): void => {
    const penniesAmount = convertToPennies(values.paymentAmount);

    if (isAmountAvailable(penniesAmount, availableAmount)) {
      onCreateExpense(values);
      return;
    }

    setAmountFormError(availableAmount);
  };

  const onEdit = (values: IFormValues): void => {
    const penniesAmount = convertToPennies(values.paymentAmount);

    if (isAmountAvailable(penniesAmount, availableExpense)) {
      const newExpense = convertFormValuesToExpense(expense, fundId, values);
      void updateExpense(newExpense);
      onCloseModalAfterSaving(newExpense);
      return;
    }
    setAmountFormError(availableExpense);
  };

  const onFinish = (values: IFormValues): void => {
    const handler = isEdit ? onEdit : onCreate;

    handler(values);
  };

  return (
    <BasicModal
      data-testid="expense-modal-content"
      title={title}
      isOpen={isOpen}
      onCancel={onCloseModal}
      onSave={form.submit}
      buttonTitle={isEdit ? 'Edit' : 'Add'}
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
            <Input autoFocus />
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
            <Input type="currency" min={1} />
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
        {((expense?.id) != null) && !isHideAssigningTag && (
          <AssigningTag
            associatedObjectId={expense?.id }
            asociatedObjectType={AssociatedObjectType.EXPENSE}
          />
        )}
      </>
    </BasicModal>
  );
};

export default memo(ExpenseModal);
