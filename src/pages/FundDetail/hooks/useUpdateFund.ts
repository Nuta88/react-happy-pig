import {
  useNotification
} from '../../../hooks';
import { useUpdateFundMutation } from '../../../services/funds';
import { Fund } from '../../../types';
import {
  IFundInfo
} from '../../../types/fund';
import { NotificationType } from '../../../types/notification';
import { MutationResult } from '../../../types/query';
import {
  convertToPennies
} from '../../../utils/fund';

interface IUpdateFund extends MutationResult {
  info: Omit<Fund, 'expenses'> | undefined;
  onUpdateFundName: (name: string | number) => void;
  onUpdatePlannedAmount: (amount: string | number) => void;
  onUpdateFundInfo: (info: IFundInfo) => void
}

export const useUpdateFund = (
  fund: Fund | undefined,
  hideModal: () => void
): IUpdateFund => {
  const info: Omit<Fund, 'expenses'> | undefined = fund ? (({ expenses, ...f }) => f)(fund) : fund;
  const [ updateFund, result ] = useUpdateFundMutation();
  const { openNotification } = useNotification();

  const onShowNotification = (
    updateFundFn: Promise<any>,
    message: string,
    errMessage: string,
    isHideModal: boolean = false
  ): void => {
    void updateFundFn
      .then(() => {
        openNotification(NotificationType.SUCCESS, message);

        if (isHideModal) hideModal();
      })
      .catch(() => {
        openNotification(NotificationType.ERROR, errMessage);
      });
  };

  const onUpdateFundName = (name: string | number): void => {
    onShowNotification(
      updateFund({ ...info, name: name as string }),
      'Fund name was updated successfully!',
      'Fund name was not updated!'
    );
  };
  const onUpdatePlannedAmount = (amount: string | number): void => {
    onShowNotification(
      updateFund({ ...info, plannedAmount: convertToPennies(amount as number) }),
      'Planned Amount was updated successfully!',
      'Planned Amount was not updated!'
    );
  };

  const onUpdateFundInfo = (value: IFundInfo): void => {
    onShowNotification(
      updateFund({ ...info, ...value }),
      'Fund info was updated successfully!',
      'Fund info was not updated!'
    );
  };

  return {
    info,
    onUpdateFundName,
    onUpdatePlannedAmount,
    onUpdateFundInfo,
    ...result
  };
};
