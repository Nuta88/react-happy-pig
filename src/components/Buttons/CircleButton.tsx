import { Button } from 'antd';
import styled from 'styled-components';

import { colors } from '../../assets/colors';

import { ButtonProps } from './types';

export const ButtonStyled = styled(Button)`
  &:focus {
      &:after {
          content: '';
          position: absolute;
          top: -.25rem;
          left: -.25rem;
          right: -.25rem;
          bottom: -.25rem;
          border: ${colors.disabled} .12rem solid;
          border-radius: 50%
      }
  }
`;

export const CircleButton = (
  props: ButtonProps
): JSX.Element => (
  <ButtonStyled shape="circle" type="primary" {...props} />
);
