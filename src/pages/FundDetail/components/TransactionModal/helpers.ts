import { BankTransferType } from '../../../../constants/bank';
import { Transfer } from '../../../../types/fund';
import { convertToPennies } from '../../../../utils/fund';

export interface IFormValues {
  amount: number;
  transferType: keyof typeof BankTransferType
}

export const createInitFormValues = (): IFormValues => {
  return {
    amount: 1,
    transferType: BankTransferType.TO_FUND
  };
};

export const convertFormValuesToTransfer = (values: IFormValues, id: number): Transfer => ({
  fundId: id,
  amount: convertToPennies(values.amount),
  transferType: values.transferType
});
