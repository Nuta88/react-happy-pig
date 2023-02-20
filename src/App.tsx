import { ConfigProvider } from 'antd';

import { theme } from './assets/theme';
import AppRouters from './routes';

const App = (): JSX.Element => (
  <ConfigProvider theme={theme}>
    <AppRouters />
  </ConfigProvider>
);

export default App;
