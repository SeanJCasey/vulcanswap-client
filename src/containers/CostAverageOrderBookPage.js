import React, { Component } from 'react';
import { DrizzleContext } from 'drizzle-react';

import MainContentWrapper from '../components/MainContentWrapper';
import AccountStatsBlock from '../components/AccountStatsBlock';
import OrderBuilderContainer from './OrderBuilderContainer';
import OrderTableContainer from './OrderTableContainer';
import TitleWrapper from '../components/TitleWrapper';

import OrderConversionActions from '../components/unused/OrderConversionActions';

class CostAverageOrderBookPage extends Component {
  render() {
    const { initialized } = this.context;
    const { contractsInitialized } = this.props;

    if (!initialized || !contractsInitialized) {
        return "Loading...";
    }

    return (
      <div className="costAverageOrderBook">
        <TitleWrapper>Cost Average Order Builder</TitleWrapper>
        <MainContentWrapper>
          <AccountStatsBlock />
          <OrderBuilderContainer />
          <OrderTableContainer />
          <OrderConversionActions />
        </MainContentWrapper>
      </div>
    );
  }
}

CostAverageOrderBookPage.contextType = DrizzleContext.Context;

export default CostAverageOrderBookPage;
