import styled from 'styled-components';

import { Card } from '../../Card';
import { ArrowLeftIcon } from '../../Icons';
import { Title } from '../../Typography/Title';

export const TitleStyled = styled(Title)`
  display: flex;
  align-items: center;
  min-height: 3rem;
  color: #1c3463e0!important;
`;

export const ArrowIconStyled = styled(ArrowLeftIcon)`
  margin-right: .5rem;
  cursor: pointer;
  color: #1c3463e0;
  
  &:hover {
    color: rgba(55, 76, 115, 0.88);
  }
`;

export const CardStyled = styled(Card)`
  height: calc(100% - 5rem);
  overflow: auto;
  padding-bottom: 1rem;
  background-color: #dee3eb1c;
  
  .ant-card-body {
    height: 100%;
  }
`;

export const SectionStyled = styled.section`
  height: 100%;
`;
