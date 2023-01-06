import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { SpaceBetween } from '../../Space/SpaceBetween';

import { ArrowIconStyled, SectionStyled, CardStyled, TitleStyled } from './styled';

interface IPageProps {
  title: string | ReactNode;
  isBack?: boolean;
  extra?: ReactNode;
  children: ReactNode;
  onBack?: () => void
}

export default function Page({ title='Page Title', isBack=false, extra, onBack, children, ...rest }: IPageProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if ( onBack ) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <SectionStyled {...rest}>
      <SpaceBetween>
        <TitleStyled>
          {isBack && <ArrowIconStyled onClick={handleBack} />}
          {title}
        </TitleStyled>
        {extra}
      </SpaceBetween>
      <CardStyled>
        {children}
      </CardStyled>
    </SectionStyled>
  );
}
