import { message } from 'antd';

import { NotificationType } from '../types/notification';

export const useNotification = (): {
  openNotification: (type: NotificationType, content: string, duration?: number) => void
} => {
  const openNotification = (type: NotificationType, content: string, duration: number = 1): void => {
    void message[type](content, duration);
  };

  return {
    openNotification
  };
};
