import { List as AntdList } from 'antd';
import type { ListProps } from 'antd';
import React, { PropsWithChildren } from 'react';

export type AppListProps<T> = PropsWithChildren<ListProps<T>>;

type AppListComponent = (<T>(
  props: AppListProps<T>
) => JSX.Element) & {
  Item: typeof AntdList.Item
};

export const List = ((props: any) => {
  return <AntdList {...props} />;
}) as AppListComponent;

List.Item = AntdList.Item;
