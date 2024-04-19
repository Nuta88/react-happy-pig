import { FormInstance } from 'antd/es/form/hooks/useForm';
import dayjs from 'dayjs';

import { FundPriority } from '../../../../../constants/fund';
import { useCreateFundMutation } from '../../../../../services/funds';
import { CreationFund } from '../../../../../types/fund';
import { NotificationType } from '../../../../../types/notification';
import {
  convertDateToString,
  today
} from '../../../../../utils/date';
import { generateError } from '../../../../../utils/form';
import { convertToPennies } from '../../../../../utils/fund';

interface IFormValues {
  name: string;
  plannedAmount: number;
  requestedAmount: number;
  links: string[];
  priority: string;
  description: string;
  creationDate: string
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
}: IUseCreateFund): { initialValues: { priority: FundPriority; creationDate: dayjs.Dayjs }; onCreateFund: (values: IFormValues) => void; onCloseModal: () => void } => {
  const [ createFund ] = useCreateFundMutation();
  const initialValues = { priority: FundPriority.LOW, creationDate: today };

  const onCloseModal = (): void => {
    form.resetFields();
    onCancel();
  };

  const setAmountFormError = (error: string): void => {
    form.setFields([ generateError('currentAmount', [ error ]) ]);
  };

  const successfulFoundCreation = (name: string): void => {
    openNotification(NotificationType.SUCCESS, `Fund "${name}" was created successfully!`);
    onCloseModal();
  };

  const generateNewFund = (values: IFormValues): CreationFund | undefined => {
    const {
      name,
      priority,
      creationDate,
      plannedAmount = 0,
      requestedAmount = 0,
      links = [],
      description
    } = values;

    const penniesPlannedAmount = convertToPennies(plannedAmount);
    const penniesCurrentAmount = convertToPennies(requestedAmount);
    const date = convertDateToString(creationDate);

    return new CreationFund(name, priority, date, penniesPlannedAmount, penniesCurrentAmount, links, description);
  };

  const onCreateFund = (values: IFormValues): void => {
    const fund = generateNewFund(values);

    if (fund) {
      void createFund(fund)
        .unwrap()
        .then(() => { successfulFoundCreation(fund.name); })
        .catch(({ data }) => { setAmountFormError(data.message); });
    }
  };

  return { initialValues, onCreateFund, onCloseModal };
};
