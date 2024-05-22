import { message } from 'antd';
import { ReactNode } from 'react';

import { NotificationType } from '../types/notification';

export const useNotification = (): {
  notificationContext: ReactNode;
  openNotification: (type: NotificationType, content: string, duration?: number) => void
} => {
  const [ messageApi, contextHolder ] = message.useMessage();

  const openNotification = (type: NotificationType, content: string, duration: number = 1): void => {
    void messageApi.open({
      type,
      content,
      duration
    });
  };

  return {
    notificationContext: contextHolder,
    openNotification
  };
};
