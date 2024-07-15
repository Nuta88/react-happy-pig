import React from 'react';

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

const Statistics = (): JSX.Element => {
  const { bankAmount, fundsSum, isLoading } = useFundsStatistic();

  return (
    <Page
      title="Fund statistics"
      isLoading={isLoading}
    >
      <Row gutter={16}>
        <Col span={12}>
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
        </Col>
        <Col span={12}>
          <Card bordered={false}>
            <Statistic
              title="Funds Amount"
              value={fundsSum}
              precision={2}
              valueStyle={{ color: colors.success }}
              prefix={<ArrowUpIcon />}
              suffix="$"
            />
          </Card>
        </Col>
      </Row>
    </Page>
  );
};

export default Statistics;
