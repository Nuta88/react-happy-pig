import { FC } from 'react';

import {
  Button,
  PrimaryButton,
  Space
} from '../../../../../../components';

interface InfoActionsProps {
  isEdit: boolean;
  isChanged: boolean;
  onEdit: () => void;
  onHideEdit: () => void;
  onSubmit: () => void
}

export const FundInfoActions: FC<InfoActionsProps> = ({
  isEdit, onHideEdit, isChanged, onEdit, onSubmit
}): JSX.Element => (
  <Space>
    {isEdit
      ? (
        <>
          <Button onClick={onHideEdit}>Cancel</Button>
          <PrimaryButton
            onClick={onSubmit}
            disabled={!isChanged}
          >
            Save
          </PrimaryButton>
        </>
        )
      : (
        <PrimaryButton onClick={onEdit}>
          Edit
        </PrimaryButton>
        )
    }
  </Space>
);
