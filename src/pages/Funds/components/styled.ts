import styled from 'styled-components';

import { Card } from '../../../components';

export const CardStyled = styled(Card)`
  min-height: 12.75rem;
  background-color: #536da138;
  transition: 0.85s;

  &:hover {
    background-color: #536da14f;
    box-shadow: #536da138 0 .5rem 1.5rem;
  }
`;

export const cardHeadStyle = {
  padding: '0 1rem',
  color: '#1c3463e0'
};

export const cardBodyStyle = {
  minHeight: 140,
  display: 'flex',
  flexDirection: 'column' as 'column',
  justifyContent: 'flex-end',
  padding: '.63rem 1rem'
};
