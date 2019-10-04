import React, { Component } from 'react';
import { DrizzleContext } from 'drizzle-react';

import NewUserCTA from '../components/NewUserCTA';
import OrderTable from '../components/OrderTable';

class OrderTableContainer extends Component {
  state = {
    'orderCountKey': null,
    'orderKeys': [],
  }

  componentDidMount() {
    const { drizzle, drizzleState } = this.context;
    const contract = drizzle.contracts.CostAverageOrderBook;

    const orderCountKey = contract.methods["getOrderCountForAccount"].cacheCall(drizzleState.accounts[0]);

    this.setState({ orderCountKey });
  }

  componentDidUpdate() {
    this.getNewOrdersForUser();
  }

  getNewOrdersForUser() {
    const { drizzle, drizzleState } = this.context;
    const orderCount = drizzleState.contracts.CostAverageOrderBook.getOrderCountForAccount[this.state.orderCountKey];
    const { orderKeys } = this.state;

    if (orderCount && orderCount.value > orderKeys.length) {
      const newOrderKeys = []
      for (let i = orderKeys.length; i < orderCount.value; i++) {
        newOrderKeys.push(drizzle.contracts.CostAverageOrderBook.methods["getOrderForAccountIndex"].cacheCall(drizzleState.accounts[0], i));
      }
      this.setState({ orderKeys: [...this.state.orderKeys, ...newOrderKeys] })
    }
  }

  /* EVENT HANDLERS */
  handleCancelOrderClick = orderId => {
    const { drizzle } = this.context;
    const contract = drizzle.contracts.CostAverageOrderBook;

    contract.methods.cancelOrder(orderId).send()
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  render() {
    const { drizzle, drizzleState } = this.context;
    const { orderKeys } = this.state;
    const networkId = drizzle.store.getState().web3.networkId;

    if (orderKeys.length === 0) return <NewUserCTA />

    return (
      <OrderTable
        drizzle={drizzle}
        drizzleState={drizzleState}
        networkId={networkId}
        onCancelOrderClick={this.handleCancelOrderClick}
        orderKeys={orderKeys}
      />
    );
  }
}

OrderTableContainer.contextType = DrizzleContext.Context;

export default OrderTableContainer;
