import {
  ChangeEvent,
  FC,
  useState
} from 'react';
import styled from 'styled-components';

import { useClickOutside } from '../../../hooks';
import { Tooltip } from '../../Tooltip';

import { Input } from './Input';

const TitleNameStyled = styled.span`
  &:first-letter {
    text-transform: uppercase;
  }
`;

interface ITitleProps {
  title: string | number;
  tooltip: string;
  secondaryText?: string;
  secondaryTextBefore?: string;
  type?: string;
  onChange: (title: string | number) => void
}

export const EditableTitle: FC<ITitleProps> = ({
  title,
  secondaryTextBefore,
  secondaryText,
  tooltip,
  type,
  onChange,
  ...rest
}) => {
  const [ isEditing, setIsEditing ] = useState<boolean>(false);
  const [ currTitle, setCurrTitle ] = useState<string | number>(title);

  const onCloseEditing = (): void => {
    setIsEditing(false);
    setCurrTitle(title);
  };

  const ref = useClickOutside(onCloseEditing);

  const onSaveTitle = (): void => {
    onChange(currTitle);
    onCloseEditing();
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>): void => {
    setCurrTitle(event.target.value);
  };

  const onChangeNumberTitle = (value: number | null): void => {
    (value != null) && setCurrTitle(value);
  };

  const onEdit = (): void => {
    setIsEditing(true);
    setCurrTitle(title);
  };

  if (isEditing) {
    return (
      <span ref={ref}>
        <Input
          title={title}
          type={type}
          currTitle={currTitle}
          onChangeTitle={onChangeTitle}
          onChangeNumberTitle={onChangeNumberTitle}
          onCloseEditing={onCloseEditing}
          onSave={onSaveTitle}
        />
      </span>
    );
  }

  return (
    <Tooltip title={tooltip}>
      <TitleNameStyled onClick={onEdit} {...rest}>
        {secondaryTextBefore ?? ''}
        {title}
        {secondaryText ?? ''}
      </TitleNameStyled>
    </Tooltip>
  );
};
