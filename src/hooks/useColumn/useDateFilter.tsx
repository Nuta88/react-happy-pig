import type { ColumnType } from 'antd/es/table';
import dayjs, { Dayjs } from 'dayjs';
import type { Key } from 'react';

import { colors } from '../../assets/colors';
import {
  CalendarIcon,
  DatePicker,
  Space
} from '../../components';
import { TQueryFilter } from '../../types/query';

const toKey = (value: string | string[] | null): Key => {
  return !value ? '' : Array.isArray(value) ? value.join('-') : value;
};

export const useDateFilter = (onFilter: (filter: Partial<TQueryFilter>) => void): any => {
  const getDateFilterProps = (dataIndex: string, defaultDate?: Dayjs): ColumnType<any> => ({
    filterDropdown: ({
      setSelectedKeys,
      confirm
    }) => {
      const disabledDate = (current: Dayjs): boolean => current >= dayjs().endOf('day');
      const onSelectDate = (date: string | string[] | null): void => {
        setSelectedKeys([ toKey(date) ]);
        onFilter({ [dataIndex]: date });
        confirm();
      };

      return (
        <div style={{ padding: 8 }} onKeyDown={(e) => { e.stopPropagation(); }}>
          <Space>
            <DatePicker
              allowClear={false}
              defaultValue={defaultDate}
              onChange={(_, dateString) => {
                onSelectDate(dateString);
              }}
              disabledDate={disabledDate}
            />
          </Space>
        </div>
      );
    },
    filterIcon: (filtered) => {
      return (
        <CalendarIcon style={{ color: filtered ? colors.primary : undefined }} />
      );
    }
  });

  return { getDateFilterProps };
};
