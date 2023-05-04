import { ReactNode, FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { SpaceBetween } from '../../Space/SpaceBetween';

import { ArrowIconStyled, SectionStyled, CardStyled, TitleStyled } from './styled';

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
          {isBack && (
            <ArrowIconStyled data-testid="page-back-icon" onClick={handleBack} />)}
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
