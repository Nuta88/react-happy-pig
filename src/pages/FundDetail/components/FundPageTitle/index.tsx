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

const FundPageTitle = ({ name='', onChange }: IPageTitleProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [fundTitle, setFundTitle] = useState<string>(name);
  
  const onCloseEditing = () => {
    setIsEditing(false);
  };
  
  const onSaveTitle = () => {
    onChange(fundTitle);
    onCloseEditing();
  };
  
  const onChangeFundTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setFundTitle(event.target.value);
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
    )
  }
  
  return (
    <span onClick={() => setIsEditing(true)}>
      {`${name} Fund`}
    </span>
  )
};

export default FundPageTitle;
