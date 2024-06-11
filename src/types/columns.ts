import { NotificationType } from './notification';

export type TNotification = (type: NotificationType, content: string) => void;
export interface TError {
  data: {
    message: string
  }
}
