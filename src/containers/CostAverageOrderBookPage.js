import React, { Component } from 'react';
import { DrizzleContext } from 'drizzle-react';

import MainContentWrapper from '../components/MainContentWrapper';
import OrderBookPageMasthead from '../components/OrderBookPageMasthead';
import OrderBuilderContainer from './OrderBuilderContainer';
import OrderTableContainer from './OrderTableContainer';
import TempLoadingBlock from '../components/TempLoadingBlock';

class CostAverageOrderBookPage extends Component {
  render() {
    const { initialized } = this.context;
    const { contractsInitialized } = this.props;

    if (!initialized || !contractsInitialized) {
        return <TempLoadingBlock />
    }

    return (
      <div className="costAverageOrderBook">
        <OrderBookPageMasthead />
        <MainContentWrapper>
          <OrderBuilderContainer />
          <OrderTableContainer />
        </MainContentWrapper>
      </div>
    );
  }
}

CostAverageOrderBookPage.contextType = DrizzleContext.Context;

export default CostAverageOrderBookPage;
