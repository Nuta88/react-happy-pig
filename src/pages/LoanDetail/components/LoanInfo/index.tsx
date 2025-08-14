import {
  FC,
  memo,
  useEffect,
  useState
} from 'react';

import {
  Form,
  Info,
  InfoItem,
  Input
} from '../../../../components';
import { ILoan } from '../../../../types/bank';
import { disablePreviousDate } from '../../../../utils/date';
import { getAmount } from '../../../../utils/fund';
import { isObjectEmpty } from '../../../../utils/object';

import {
  createInitialValues,
  getLoanWithUpdatedValues,
  InitialValues
} from './helpers';

interface InfoProps {
  loan: ILoan | undefined;
  isOpen: boolean;
  onClose: () => void;
  onUpdateLoanIno: (loan: ILoan) => void
}

const layout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 31 }
};

const LoanInfo: FC<InfoProps> = ({ isOpen, loan = {}, onClose, onUpdateLoanIno }): JSX.Element => {
  const [ isEdit, setIsEdit ] = useState(false);
  const [ isChanged, setIsChanged ] = useState(false);
  const [ form ] = Form.useForm();
  const initialValues: InitialValues = createInitialValues(loan.description, loan.startDate, loan.paymentAmount);
  const watchedValues = Form.useWatch([], form);

  useEffect(() => {
    const currentValues = form.getFieldsValue(true);

    if (!isObjectEmpty(currentValues)) {
      setIsChanged(JSON.stringify(currentValues) !== JSON.stringify(initialValues));
    }
  }, [ watchedValues ]);

  const handleClose = (): void => {
    onClose();
  };

  const handleEdit = (): void => {
    form.setFieldsValue(initialValues);
    setIsEdit(true);
  };

  const handleHideEdit = (): void => {
    setIsEdit(false);
    form.resetFields();
  };

  const handleUpdate = (values: InitialValues): void => {
    onUpdateLoanIno(getLoanWithUpdatedValues(loan as ILoan, values));
    handleHideEdit();
  };

  return (
    <Info
      title="Loan info"
      isEdit={isEdit}
      isChanged={isChanged}
      onHideEdit={handleHideEdit}
      onEdit={handleEdit}
      onSubmit={form.submit}
      onClose={handleClose}
      open={isOpen}
    >
      <>
        <InfoItem title="Balance" value={getAmount(loan?.balance)} />
        <InfoItem title="Received Amount" value={getAmount(loan?.amount)} />
        <InfoItem title="Repayment Amount" value={getAmount(loan?.repaymentAmount)} />
        {isEdit
          ? (
            <Form
              form={form}
              {...layout}
              autoComplete="off"
              onFinish={handleUpdate}>
              <Form.Item
                label="Payment Amount"
                name="paymentAmount"
                rules={[
                  { required: true, message: 'Please input Amount!' },
                  {
                    type: 'number',
                    min: 1,
                    message: 'Amount should not be less than 1 (payment)!'
                  }
                ]}
              >
                <Input type="number" addonAfter="$" min={1} />
              </Form.Item>
              <Form.Item
                label="Date"
                name="startDate"
                data-testid="startDate"
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
            )
          : (
            <>
              <InfoItem title="Payment Amount" value={getAmount(loan?.paymentAmount)} />
              <InfoItem title="Date" value={loan?.startDate} />
              <InfoItem title="Description" value={loan?.description ?? ''} /></>
            )}
      </>
    </Info>
  );
};

export default memo(LoanInfo);
