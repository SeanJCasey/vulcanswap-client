import React, { Component } from 'react';
import { DrizzleContext } from 'drizzle-react';

import MainContentWrapper from '../components/MainContentWrapper';
import AccountStatsBlock from '../components/AccountStatsBlock';
import OrderBuilderContainer from './OrderBuilderContainer';
import OrderTableContainer from './OrderTableContainer';
import TitleWrapper from '../components/TitleWrapper';

class CostAverageOrderBookPage extends Component {
  render() {
    const { initialized } = this.context;

    if (!initialized) {
        return "Loading...";
    }

    return (
      <div className="costAverageOrderBook">
        <TitleWrapper>Cost Average Order Builder</TitleWrapper>
        <MainContentWrapper>
          <AccountStatsBlock />
          <OrderBuilderContainer />
          <OrderTableContainer />
        </MainContentWrapper>
      </div>
    );
  }
}

CostAverageOrderBookPage.contextType = DrizzleContext.Context;

export default CostAverageOrderBookPage;
