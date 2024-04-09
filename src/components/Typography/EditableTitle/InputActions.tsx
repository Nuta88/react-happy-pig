import { FC } from 'react';
import styled from 'styled-components';

import { IconButton } from '../../Buttons/IconButton';
import {
  CheckIcon,
  CloseIcon
} from '../../Icons';
import { Tooltip } from '../../Tooltip';

const IconStyled = styled(IconButton)`
  margin-right: .1rem;
`;

interface IInputActionsProps {
  title: string | number;
  currTitle: string | number;
  onSave: () => void;
  onCloseEditing: () => void
}

export const InputActions: FC<IInputActionsProps> = ({
  title,
  currTitle,
  onSave,
  onCloseEditing
}) => {
  const isDisabled = typeof currTitle === 'number'
    ? currTitle === title
    : currTitle?.length < 2 || (currTitle === title);

  return (
    <>
      <Tooltip title="Save title">
        <IconStyled
          icon={<CheckIcon />}
          size="small"
          onClick={onSave}
          disabled={isDisabled}
        />
      </Tooltip>
      <IconButton
        icon={<CloseIcon />}
        size="small"
        data-testid="title-input-close"
        onClick={onCloseEditing}
      />
    </>
  );
};
