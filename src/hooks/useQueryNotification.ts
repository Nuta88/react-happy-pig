import { NotificationType } from '../types/notification';

import { useNotification } from './useNotification';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useQueryNotification = (queryFulfilled: any) => {
  const { openNotification } = useNotification();

  const queryNotifications = async (success: string, error: string): Promise<void> => {
    try {
      await queryFulfilled;
      openNotification(NotificationType.SUCCESS, success);
    } catch (err) {
      openNotification(NotificationType.ERROR, error);
    }
  };

  return { queryNotifications };
};
