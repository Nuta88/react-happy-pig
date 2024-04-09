import { InputNumber } from 'antd';
import {
  ChangeEvent,
  FC
} from 'react';

import TextInput from '../../Form/Input/TextInput';

import { InputActions } from './InputActions';

interface IInputProps {
  type?: string;
  title: string | number;
  currTitle: string | number;
  onSave: () => void;
  onChangeNumberTitle: (value: number | null) => void;
  onChangeTitle: (event: ChangeEvent<HTMLInputElement>) => void;
  onCloseEditing: () => void
}

export const Input: FC<IInputProps> = ({
  type,
  title,
  currTitle,
  onChangeNumberTitle,
  onChangeTitle,
  onSave,
  onCloseEditing
}) => {
  if (type && type === 'number') {
    return (
      <InputNumber
        value={currTitle as number}
        data-testid="title-number-input"
        onChange={onChangeNumberTitle}
        onPressEnter={onSave}
        autoFocus
        addonAfter={
          <InputActions
            currTitle={currTitle}
            title={title}
            onSave={onSave}
            onCloseEditing={onCloseEditing}
          />
        }
      />
    );
  }

  return (
    <TextInput
      type={type}
      defaultValue={title}
      data-testid="title-input"
      onChange={onChangeTitle}
      onPressEnter={onSave}
      autoFocus
      maxLength={50}
      suffix={
        <InputActions
          currTitle={currTitle}
          title={title}
          onSave={onSave}
          onCloseEditing={onCloseEditing}
        />
      }
    />
  );
};
