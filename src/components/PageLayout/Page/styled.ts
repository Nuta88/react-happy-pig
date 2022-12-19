import styled from 'styled-components';

import { ArrowLeftIcon } from '../../Icons';
import { Card } from '../../Card';

export const ArrowIconStyled = styled(ArrowLeftIcon)`
  margin-right: .5rem;
  cursor: pointer;
`;

export const CardStyled = styled(Card)`
  height: calc(100% - 3rem);
  overflow: auto;
  padding-bottom: 1rem;
`;

export const SectionStyled = styled.section`
  height: 100%;
`;
