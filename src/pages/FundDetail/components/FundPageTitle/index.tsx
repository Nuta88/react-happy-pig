import { useState, ChangeEvent } from 'react';

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

const FundPageTitle = ({ name = '', onChange }: IPageTitleProps): JSX.Element => {
  const [ isEditing, setIsEditing ] = useState<boolean>(false);
  const [ fundTitle, setFundTitle ] = useState<string>(name);

  const onCloseEditing = (): void => {
    setIsEditing(false);
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
        onChange={onChangeFundTitle}
        suffix={
          <>
            <Tooltip title="Save fund name">
              <IconButton
                icon={<CheckIcon />}
                size="small"
                onClick={onSaveTitle}
                disabled={!fundTitle || (fundTitle === name)}
              />
            </Tooltip>
            <IconButton
              icon={<CloseIcon />}
              size="small"
              onClick={onCloseEditing}
            />
          </>
        }
      />
    );
  }

  return (
    <Tooltip title="Click to edit fund name">
      <span onClick={onEditFundName}>
        {`${name} Fund`}
      </span>
    </Tooltip>
  );
};

export default FundPageTitle;
