import { FC } from 'react';

import { SecondaryText } from '../../../Typography/SecondaryText';
import { Text } from '../../../Typography/Text';

interface InfoItemProps {
  title: string;
  value: string | number | undefined | null
}

export const InfoItem: FC<InfoItemProps> = ({ title, value }): JSX.Element => {
  return (
    <p>
      <Text>{title}:</Text> <SecondaryText>{ value }</SecondaryText>
    </p>
  );
};
