import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import notFound from '../../assets/page-found.png';
import { apiUrls } from '../../constants/apiUrls';
import { Button, SpaceCenter, Title } from '../index';

const LinkStyled = styled.img`
  width: 25rem;
  padding-top: .63rem;
`;

const PageNotFound = (): JSX.Element => {
  const navigate = useNavigate();
  const navigateToHome = (): void => {
    navigate(apiUrls.root);
  };

  return (
    <SpaceCenter data-testid="page-not-found-content">
      <LinkStyled src={notFound} />
      <Title>Page not found</Title>
      <Button type="primary" onClick={navigateToHome}>Go home</Button>
    </SpaceCenter>
  );
};

export default PageNotFound;
