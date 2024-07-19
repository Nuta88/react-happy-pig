import React from 'react';
import styled from 'styled-components';

import { colors } from '../../assets/colors';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  Card,
  Col,
  Page,
  Row,
  Statistic
} from '../../components';

import { useFundsStatistic } from './hooks/useFundsStatistic';

const ColStyled = styled(Col)`
  margin-bottom: .5rem;
`;

const Statistics = (): JSX.Element => {
  const {
    bankAmount,
    fundsCurrentAmount,
    fundsReceivedAmount,
    fundsPlannedAmount,
    isLoading
  } = useFundsStatistic();

  return (
    <Page
      title="Fund statistics"
      isLoading={isLoading}
    >
      <Row gutter={16}>
        <ColStyled span={12}>
          <Card bordered={false}>
            <Statistic
              title="Bank Amount"
              value={bankAmount}
              precision={2}
              valueStyle={{ color: bankAmount > 0 ? colors.success : colors.error }}
              prefix={bankAmount > 0 ? <ArrowUpIcon /> : <ArrowDownIcon />}
              suffix="$"
            />
          </Card>
        </ColStyled>
        <ColStyled span={12}>
          <Card bordered={false}>
            <Statistic
              title="Funds Current Amount"
              value={fundsCurrentAmount}
              precision={2}
              valueStyle={{ color: colors.success }}
              prefix={<ArrowUpIcon />}
              suffix="$"
            />
          </Card>
        </ColStyled>
        <ColStyled span={12}>
          <Card bordered={false}>
            <Statistic
              title="Funds Received Amount"
              value={fundsReceivedAmount}
              precision={2}
              valueStyle={{ color: colors.success }}
              prefix={<ArrowUpIcon />}
              suffix="$"
            />
          </Card>
        </ColStyled>
        <ColStyled span={12}>
          <Card bordered={false}>
            <Statistic
              title="Funds Planned Amount"
              value={fundsPlannedAmount}
              precision={2}
              valueStyle={{ color: colors.success }}
              prefix={<ArrowUpIcon />}
              suffix="$"
            />
          </Card>
        </ColStyled>
      </Row>
    </Page>
  );
};

export default Statistics;
