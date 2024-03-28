import { FormInstance } from 'antd/es/form/hooks/useForm';

import { useCreateFundMutation } from '../../../../../services/funds';
import { Fund } from '../../../../../types';
import { NotificationType } from '../../../../../types/notification';
import { generateError } from '../../../../../utils/form';
import { convertToPennies } from '../../../../../utils/fund';

interface IFormValues {
  name: string;
  plannedAmount: number;
  currentAmount: number
}

interface IUseCreateFund {
  openNotification: (type: NotificationType, content: string) => void;
  form: FormInstance<any>;
  onCancel: () => void
}

export const useFundCreate = ({
  openNotification,
  onCancel,
  form
}: IUseCreateFund): { onCreateFund: (values: IFormValues) => void; onCloseModal: () => void } => {
  const [ createFund ] = useCreateFundMutation();

  const onCloseModal = (): void => {
    form.resetFields();
    onCancel();
  };

  const setAmountFormError = (error: string): void => {
    form.setFields([ generateError('currentAmount', [ error ]) ]);
  };

  const successfulFoundCreation = (fund: Fund): void => {
    openNotification(NotificationType.SUCCESS, `Fund "${fund.name}" was created successfully!`);
    onCloseModal();
  };

  const generateNewFund = (values: IFormValues): Fund | undefined => {
    const { name, plannedAmount = 0, currentAmount } = values;

    const penniesPlannedAmount = convertToPennies(plannedAmount);
    const penniesCurrentAmount = convertToPennies(currentAmount);

    return new Fund(name, penniesPlannedAmount, penniesCurrentAmount);
  };

  const onCreateFund = (values: IFormValues): void => {
    const fund = generateNewFund(values);

    if (fund) {
      void createFund(fund)
        .unwrap()
        .then(() => { successfulFoundCreation(fund); })
        .catch(({ data }) => { setAmountFormError(data.message); });
    }
  };

  return { onCreateFund, onCloseModal };
};
