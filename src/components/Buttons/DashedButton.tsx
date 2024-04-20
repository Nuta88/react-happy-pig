import { Button } from 'antd';
import styled from 'styled-components';

import { ButtonProps } from './types';

const ButtonStyled = styled(Button)`
  width: 100%;
`;

export const DashedButton = (
  props: ButtonProps
): JSX.Element => (
  <ButtonStyled type="dashed" {...props} />
);
