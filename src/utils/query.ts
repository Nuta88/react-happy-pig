import {
  TError,
  TNotification
} from '../types/columns';
import { NotificationType } from '../types/notification';

export const onWrapQuery = (
  query: any,
  message: string,
  openNotification: TNotification,
  onSuccessFn?: () => void
): void => {
  query
    .unwrap()
    .then(() => {
      openNotification(NotificationType.SUCCESS, message);
      if (onSuccessFn) {
        onSuccessFn();
      }
    })
    .catch(({ data }: TError) => {
      openNotification(NotificationType.ERROR, data.message);
    });
};
