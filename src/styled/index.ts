import styled from 'styled-components';

import { colors } from '../assets/colors';
import { Card } from '../components';
import { PriorityColor } from '../constants/fund';

export const layout = {
  xs: 24,
  md: 12,
  lg: 8
};

export const CardStyled = styled(Card)<{ background?: string }>`
  min-height: 12.75rem;
  background-color: ${({ background }) => (background ?? colors.background)};
  transition: background-color 0.87s ease;
  .ant-card-head{
    padding: 0 1rem;
  }
  .ant-card-head-title{
    color: ${colors.primaryText};
  }
  .ant-card-body {
     min-height: 140px;
     display: flex;
     flex-direction: column;
     justify-content: flex-end;
     padding: .63rem 1rem;
  }

  &:hover {
    background-color: ${({ background }) =>
     `color-mix(in srgb, ${background ?? colors.background} 93%, black)`
    };
    box-shadow: ${({ background }) => `(${background ?? colors.background})} 0 .5rem 1.5rem`};
  }

  .ant-card-head-title {
    &:first-letter {
      text-transform: uppercase;
    }
  }
`;

export const ButtonPriority = styled.div<{ priority: string }>`
  display: inline-flex;
  margin-right: .2rem;
  .ant-btn-primary {
    background-color: ${props => PriorityColor[props.priority as keyof typeof PriorityColor]};
    &:hover {
      background-color: ${props => PriorityColor[props.priority as keyof typeof PriorityColor]};
      opacity: .7;
    }
  }
`;

export const PriorityIcon = styled.span<{ isShowIcon: boolean }>`
  font-size: 14px;
  color: ${props => props.isShowIcon ? '#2e631c' : 'default'};
  font-weight: ${props => props.isShowIcon ? 'bold' : 'normal'};
  
  .anticon-check {
    visibility: ${props => props.isShowIcon ? 'visible' : 'hidden'};
  }
`;
