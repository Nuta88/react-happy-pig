import type { TagProps } from 'antd';
import { Tag as TagAntd } from 'antd';
import { FC } from 'react';

export const Tag: FC<TagProps> = (props) => {
  return (
    <TagAntd {...props}/>
  );
};
