import { SpaceCenter } from '../Space/SpaceCenter';
import { Title } from '../Typography/Title';
import { SecondaryText } from '../Typography/SecondaryText';

function ErrorBoundary() {
  return (
    <SpaceCenter>
      <Title>Something went wrong</Title>
      <SecondaryText>Reload page</SecondaryText>
    </SpaceCenter>
  );
}

export default ErrorBoundary;
