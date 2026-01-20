import { Button } from 'antd';
import type { ButtonProps } from 'antd';
import styled from 'styled-components';

const ButtonStyled = styled(Button)`
  width: 100%;
`;

export const DashedButton = (
  props: ButtonProps
): JSX.Element => (
  <ButtonStyled type="dashed" {...props} />
);
