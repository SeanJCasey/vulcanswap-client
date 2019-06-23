import React, { Component } from 'react';
import { DrizzleContext } from "drizzle-react";

import StatsContainer from './StatsContainer';
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
        <div className="container">
          <StatsContainer />
          <OrderBuilderContainer />
          <OrderTableContainer />
        </div>
      </div>
    );
  }
}

CostAverageOrderBookPage.contextType = DrizzleContext.Context;

export default CostAverageOrderBookPage;
