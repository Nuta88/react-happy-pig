import { ReactNode, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { colors } from '../../../assets/colors';
import { Card } from '../../Card';
import { ArrowLeftIcon } from '../../Icons';
import { SpaceBetween } from '../../Space/SpaceBetween';
import { Title } from '../../Typography/Title';

const TitleStyled = styled(Title)`
  display: flex;
  align-items: center;
  min-height: 3rem;
  color: ${colors.primaryText}!important;
`;

const ArrowIconStyled = styled(ArrowLeftIcon)`
  margin-right: .5rem;
  cursor: pointer;
  color: ${colors.primaryText};
  
  &:hover {
    color: rgba(55, 76, 115, 0.88);
  }
`;

const CardStyled = styled(Card)`
  height: calc(100% - 5rem);
  overflow: auto;
  padding-bottom: 1rem;
  background-color: ${colors.cardBackground};
  
  .ant-card-body {
    height: 100%;
    padding: 1rem 1.2rem;
  }
`;

const SectionStyled = styled.section`
  height: 100%;
`;

interface IPageProps {
  title?: string | ReactNode;
  isBack?: boolean;
  extra?: ReactNode;
  children: ReactNode;
  onBack?: () => void
}

const Page: FC<IPageProps> = ({
  title = 'Page Title',
  isBack = false,
  extra,
  onBack,
  children,
  ...rest
}) => {
  const navigate = useNavigate();

  const handleBack = (): void => {
    if (onBack) {
      onBack();
      return;
    }
    navigate(-1);
  };

  return (
    <SectionStyled {...rest}>
      <SpaceBetween>
        <TitleStyled>
          {isBack && <ArrowIconStyled data-testid="page-back-icon" onClick={handleBack} />}
          {title}
        </TitleStyled>
        {extra}
      </SpaceBetween>
      <CardStyled>
        {children}
      </CardStyled>
    </SectionStyled>
  );
};

export default Page;
