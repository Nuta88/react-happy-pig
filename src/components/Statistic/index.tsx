import { Statistic as AntdStatistic, StatisticProps } from 'antd';
import styled from 'styled-components';

const StatisticStyled = styled(AntdStatistic)<{ bodyColor: string | undefined }>`
    .ant-statistic-content {
        color: ${props => props.bodyColor ?? 'inherit'};
    }
`;

interface StyledStatisticProps extends StatisticProps {
  bodyColor?: string
}

export const Statistic = ({ bodyColor, ...props }: StyledStatisticProps): JSX.Element => (
  <StatisticStyled bodyColor={bodyColor} {...props} />
);
