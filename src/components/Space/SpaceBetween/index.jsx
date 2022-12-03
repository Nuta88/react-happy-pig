import { Space } from 'antd';

const spaceStyle = {
  display: 'flex',
  justifyContent: 'space-between'
};

export const SpaceBetween = props => <Space style={spaceStyle} {...props} />