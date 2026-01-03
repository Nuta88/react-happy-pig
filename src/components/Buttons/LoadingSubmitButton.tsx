import { Button } from 'antd';
import type { ButtonProps } from 'antd';

interface ILoadingButton {
  isLoading?: boolean
}

export const LoadingSubmitButton = ({ isLoading = false, ...props }: ILoadingButton & ButtonProps): JSX.Element => (
  <Button type="primary" htmlType="submit" size="large" loading={isLoading} {...props} />
);
