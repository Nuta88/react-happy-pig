import { FormInstance } from 'antd/es/form/hooks/useForm';
import dayjs from 'dayjs';

import { FundPriority } from '../../../../../constants/fund';
import { useCreateFundMutation } from '../../../../../services/funds';
import { CreationFund } from '../../../../../types/fund';
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
  form: FormInstance<any>;
  onCancel: () => void
}

export const useFundCreate = ({
  onCancel,
  form
}: IUseCreateFund): { initialValues: { priority: FundPriority; creationDate: dayjs.Dayjs }; onCreateFund: (values: IFormValues) => void; onCloseModal: () => void } => {
  const [ createFund ] = useCreateFundMutation();
  const initialValues = { priority: FundPriority.LOW, creationDate: today, requestedAmount: 0, plannedAmount: 0 };

  const onCloseModal = (): void => {
    form.resetFields();
    onCancel();
  };

  const setAmountFormError = (error: string): void => {
    form.setFields([ generateError('currentAmount', [ error ]) ]);
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
        .then(() => { onCloseModal(); })
        .catch(({ data }) => { setAmountFormError(data.message); });
    }
  };

  return { initialValues, onCreateFund, onCloseModal };
};
