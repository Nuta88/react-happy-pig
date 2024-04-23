import styled from 'styled-components';

import { colors } from '../../../assets/colors';
import { Card } from '../../../components';
import { PriorityColor } from '../../../constants/fund';

export const CardStyled = styled(Card)`
  min-height: 12.75rem;
  background-color: ${colors.background};
  transition: 0.85s;

  &:hover {
    background-color: #536da14f;
    box-shadow: ${colors.background} 0 .5rem 1.5rem;
  }

  .ant-card-head-title {
    &:first-letter {
      text-transform: uppercase;
    }
  }
`;

export const cardHeadStyle = {
  padding: '0 1rem',
  color: colors.primaryText
};

export const cardBodyStyle = {
  minHeight: 140,
  display: 'flex',
  flexDirection: 'column' as 'column',
  justifyContent: 'flex-end',
  padding: '.63rem 1rem'
};

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
