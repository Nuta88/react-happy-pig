import React from 'react';
import styled from 'styled-components';

import { colors } from '../../assets/colors';
import { Card, Col, Title, Row, Statistic, ArrowUpIcon, ArrowDownIcon } from '../../components';

import { useFundsStatistic } from './hooks/useFundsStatistic';

const HomeStyled = styled.div`
  margin: 2rem auto;
`;

const Home = (): JSX.Element => {
  const { activeFunds, overrunFunds } = useFundsStatistic();

  return (
    <HomeStyled>
      <Title>Fund statistics</Title>
      <Row gutter={16}>
        <Col span={12}>
          <Card bordered={false}>
            <Statistic
              title="Active"
              value={activeFunds}
              precision={2}
              valueStyle={{ color: colors.success }}
              prefix={<ArrowUpIcon />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card bordered={false}>
            <Statistic
              title="Cost overrun"
              value={overrunFunds}
              precision={2}
              valueStyle={{ color: colors.error }}
              prefix={<ArrowDownIcon />}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>
    </HomeStyled>
  );
};

export default Home;
