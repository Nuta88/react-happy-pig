import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

import { SecondaryText, SpaceCenter, Title } from '../index';

import PageNotFound from './PageNotFound';

const ErrorBoundary = () => {
  const error = useRouteError();
  
  if (isRouteErrorResponse(error)) {
    if ( error.status === 404 ) {
      return <PageNotFound />;
    }
  }
  
  return (
    <SpaceCenter>
      <Title>Something went wrong</Title>
      <SecondaryText>Reload page</SecondaryText>
    </SpaceCenter>
  );
};

export default ErrorBoundary;
