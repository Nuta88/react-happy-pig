import dayjs from 'dayjs';
import {
  FC,
  memo,
  useState,
  ChangeEvent
} from 'react';
import styled from 'styled-components';

import { colors } from '../../../../assets/colors';
import {
  CheckCircleIcon,
  CloseCircleIcon,
  Col,
  DatePicker,
  DollarIcon,
  FilterIcon,
  TextButton,
  IconButton,
  Input,
  Radio,
  Row,
  Space
} from '../../../../components';
import { dateFormat } from '../../../../constants/common';
import { FundPriority } from '../../../../constants/fund';
import { IFundFilter } from '../../../../types/fund';
import { isObjectEmpty } from '../../../../utils/object';

interface IFundFilterProps {
  filter: IFundFilter;
  onFilters: (value: any) => void
}

const FilterContentStyled = styled(Row)`
  margin-bottom: 1rem;
`;
const SpaceBetweenStyled = styled(Space)`
  justify-content: center;
  width: 100%;
  margin-right: 1rem;
`;
const InputStyled = styled(Input)`
  width: 15rem;
`;
const CheckIconStyled = styled(CheckCircleIcon)<{ isChecked: boolean }>`
  margin-right: .2rem;
  color: ${props => props.isChecked ? colors.primary : colors.secondaryText};
  &:hover {
      transition: color 0.7s ease;
      color: ${colors.link.hover};
    }
`;
const CloseIconStyled = styled(CloseCircleIcon)`
  color: ${colors.secondaryText};
  &:hover {
      transition: color 0.7s ease;
      color: ${colors.link.hover};
    }
`;
const ClearIconStyled = styled(TextButton)`
  color: ${colors.primaryText};
`;

const FundFilters: FC<IFundFilterProps> = ({ filter, onFilters }) => {
  const [ isFilter, setIsFilter ] = useState<boolean>(false);
  const [ name, setName ] = useState<string>('');
  const priorityOptions = Object.values(FundPriority);

  const onChangeName = (name: string): void => {
    setName(name);
  };

  const onFilterFund = (key: string, value: string | string[] | null): void => {
    if (key !== 'name') setName('');

    onFilters({ [key]: value });
  };

  const onSave = (): void => {
    onFilterFund('name', name);
  };
  const onClearName = (): void => {
    if (filter.name) onFilters({});

    setName('');
  };

  const onToggleFilter = (): void => {
    setIsFilter(prev => !prev);
  };

  const onClearFilter = (): void => {
    setName('');
    onFilters({});
  };

  return (
    <FilterContentStyled>
      <Col flex={1}>
        <SpaceBetweenStyled>
          {isFilter && (
            <>
              <InputStyled
                allowClear={false}
                placeholder="Fund name"
                prefix={<DollarIcon />}
                value={name}
                onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) => { onChangeName(value); }}
                onPressEnter={({ target: { value } }: ChangeEvent<HTMLInputElement>) => { onFilterFund('name', value); }}
                suffix={name && (
                  <section>
                    <CheckIconStyled
                      onClick={onSave}
                      isChecked={!!filter.name}
                    />
                    <CloseIconStyled
                      onClick={onClearName}
                    />
                  </section>
                )}
              />
              <Radio.Group
                options={priorityOptions}
                onChange={({ target: { value } }) => { onFilterFund('priority', value); } }
                optionType="button"
                buttonStyle="solid"
                value={filter.priority}
              />
              <DatePicker
                value={filter.date ? dayjs(filter.date, dateFormat) : null}
                onChange={(_, dateString) => { onFilterFund('date', dateString); }}
              />
              <ClearIconStyled onClick={onClearFilter} disabled={isObjectEmpty(filter)}>Clear filters</ClearIconStyled>
            </>
          )}
        </SpaceBetweenStyled>
      </Col>
      <Col>
        <IconButton
          ghost={isObjectEmpty(filter)}
          icon={<FilterIcon />}
          data-testid="filter-btn"
          onClick={onToggleFilter}
        />
      </Col>
    </FilterContentStyled>
  );
};

export default memo(FundFilters);
