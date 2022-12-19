import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { Title } from '../../Typography/Title';
import { SpaceBetween } from '../../Space/SpaceBetween';

import { ArrowIconStyled, SectionStyled, CardStyled } from './styled';

type PageProps = {
  title: string,
  isBack?: boolean,
  extra: ReactNode,
  children: ReactNode,
  onBack?: () => void
}

export default function Page({ title='Page Title', isBack=false, extra, onBack, children, ...rest }: PageProps) {
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
        <Title>
          {isBack && <ArrowIconStyled onClick={handleBack} />}
          {title}
        </Title>
        {extra}
      </SpaceBetween>
      <CardStyled>
        {children}
      </CardStyled>
    </SectionStyled>
  );
}
