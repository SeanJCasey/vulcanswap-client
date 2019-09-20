import React, { Component } from 'react';
import { DrizzleContext } from 'drizzle-react';

import OrderBuilderBlock from '../components/OrderBuilderBlock';

class OrderBuilderContainer extends Component {
  state = {
    'newOrderInputs': {
      'tokenAddress': '',
      'quantity': '',
      'frequency': '',
      'batches': ''
    },
    'newOrderStackId': '',
    'orderParamLimitsKey': null,
    'formErrors': {}
  };

  componentDidMount() {
    const { drizzle } = this.context;
    const contract = drizzle.contracts.CostAverageOrderBook;
    const orderParamLimitsKey = contract.methods["getOrderParamLimits"].cacheCall();

    this.setState({ orderParamLimitsKey });
  }

  createOrder() {
    const { drizzle, drizzleState } = this.context;
    const contract = drizzle.contracts.CostAverageOrderBook;

    const amount = drizzle.web3.utils.toWei(String(this.state.newOrderInputs.quantity), 'ether');

    const newOrderStackId = contract.methods["createOrder"].cacheSend(
      amount,
      this.state.newOrderInputs.tokenAddress,
      Number(this.state.newOrderInputs.frequency),
      Number(this.state.newOrderInputs.batches),
      { from: drizzleState.accounts[0], value: amount }
    );

    this.setState({ newOrderStackId });
  }

  validateOrderForm() {
    const { orderParamLimitsKey } = this.state;
    const { drizzle, drizzleState } = this.context;
    const orderParamLimits = drizzleState.contracts.CostAverageOrderBook.getOrderParamLimits[orderParamLimitsKey];

    const formErrors = {};

    const minAmount = drizzle.web3.utils.fromWei(String(orderParamLimits.value.minAmount_), 'ether');
    const minBatches = orderParamLimits.value.minBatches_;

    if (this.state.newOrderInputs.quantity < minAmount) formErrors['quantity'] = { message: `Must be greater than ${minAmount} ETH` };
    if (this.state.newOrderInputs.batches < minBatches) formErrors['batches'] = { message: `Must be greater than ${minBatches}` };

    return formErrors;
  }

  /* EVENT HANDLERS */
  handleOrderInputChange = event => {
    this.setState({
      newOrderInputs: {
        ...this.state.newOrderInputs,
        [event.target.name]: event.target.value
      }
    });
  }

  handleOrderSubmitClick = event => {
    const formErrors = this.validateOrderForm();

    if (Object.keys(formErrors).length) {
      this.setState({ formErrors });
    }
    else {
      this.createOrder();
    }
  }

  render() {
    const { formErrors, newOrderInputs } = this.state;
    const { drizzle } = this.context;

    const networkId = drizzle.store.getState().web3.networkId;

    return (
      <OrderBuilderBlock
        formErrors={formErrors}
        networkId={networkId}
        newOrderInputs={newOrderInputs}
        onOrderInputChange={this.handleOrderInputChange}
        onOrderSubmitClick={this.handleOrderSubmitClick}
      />
    );
  }
}

OrderBuilderContainer.contextType = DrizzleContext.Context;

export default OrderBuilderContainer;
