import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { apiUrls } from '../../constants/apiUrls';
import { Button, SpaceCenter, Title } from '../index';

// @ts-ignore
import notFound from '../../assets/page-found.png';

const LinkStyled = styled.img`
  width: 25rem;
  padding-top: .63rem;
`;

const PageNotFound = () => {
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate(apiUrls.root);
  };
  
  return (
    <SpaceCenter>
      <LinkStyled src={notFound} />
      <Title>Page not found</Title>
      <Button type="primary" onClick={navigateToHome}>Go home</Button>
    </SpaceCenter>
  );
};

export default PageNotFound;
