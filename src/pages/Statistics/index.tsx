import React from 'react';
import styled from 'styled-components';

import { colors } from '../../assets/colors';
import { Card, Col, Title, Row, Statistic, ArrowUpIcon, ArrowDownIcon } from '../../components';

import { useFundsStatistic } from './hooks/useFundsStatistic';

const HomeStyled = styled.div`
  margin: 2rem auto;
`;

const Statistics = (): JSX.Element => {
  const { bankAmount, fundsSum } = useFundsStatistic();

  return (
    <HomeStyled>
      <Title>Fund statistics</Title>
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
              valueStyle={{ color: bankAmount > fundsSum ? colors.success : colors.error }}
              prefix={bankAmount > fundsSum ? <ArrowUpIcon /> : <ArrowDownIcon />}
              suffix="$"
            />
          </Card>
        </Col>
      </Row>
    </HomeStyled>
  );
};

export default Statistics;
