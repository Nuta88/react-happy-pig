import { useState, ChangeEvent, FC } from 'react';

import {
  TextInput,
  IconButton,
  Tooltip,
  CloseIcon,
  CheckIcon
} from '../../../../components';

interface IPageTitleProps {
  name: string;
  onChange: (title: string) => void
}

const FundPageTitle: FC<IPageTitleProps> = ({ name, onChange }) => {
  const [ isEditing, setIsEditing ] = useState<boolean>(false);
  const [ fundTitle, setFundTitle ] = useState<string>(name);

  const onCloseEditing = (): void => {
    setIsEditing(false);
    setFundTitle(name);
  };

  const onSaveTitle = (): void => {
    onChange(fundTitle);
    onCloseEditing();
  };

  const onChangeFundTitle = (event: ChangeEvent<HTMLInputElement>): void => {
    setFundTitle(event.target.value);
  };

  const onEditFundName = (): void => {
    setIsEditing(true);
  };

  if (isEditing) {
    return (
      <TextInput
        defaultValue={name}
        data-testid="fund-page-title-input"
        onChange={onChangeFundTitle}
        maxLength={50}
        suffix={
          <>
            <Tooltip title="Save fund name">
              <IconButton
                icon={<CheckIcon />}
                size="small"
                onClick={onSaveTitle}
                disabled={fundTitle?.length < 2 || (fundTitle === name)}
              />
            </Tooltip>
            <IconButton
              icon={<CloseIcon />}
              size="small"
              data-testid="fund-page-title-input-close"
              onClick={onCloseEditing}
            />
          </>
        }
      />
    );
  }

  return (
    <Tooltip title="Click to edit fund name">
      <span onClick={onEditFundName} data-testid="fund-page-title">
        {`${name} Fund`}
      </span>
    </Tooltip>
  );
};

export default FundPageTitle;
