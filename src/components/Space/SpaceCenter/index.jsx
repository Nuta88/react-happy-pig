import { Space } from 'antd';

const spaceStyle = {
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  height: '100%'
};

export const SpaceCenter = props => <Space style={spaceStyle} {...props} />