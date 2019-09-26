import React, { Component } from 'react';
import { DrizzleContext } from 'drizzle-react';

import { ADDRESS_ZERO } from '../constants';
import IERC20 from '../contracts/IERC20.json';
import { filterTokensByFieldName, findTokenByFieldName } from '../utils';

import OrderBuilderBlock from '../components/OrderBuilderBlock';

class OrderBuilderContainer extends Component {
  state = {
    formErrors: {},
    newOrderInputs: {
      batches: '',
      frequency: '',
      quantity: '',
      sourceTokenAddress: '', // defaults to DAI
      targetTokenAddress: '', // defaults to ETH
    },
    newOrderStackId: null,
    orderParamLimitsKey: null,
    sourceCurrencyLimitsKeys: {},
  };

  componentDidMount() {
    const { drizzle } = this.context;

    this.setOrderDefaults();

    const networkId = drizzle.store.getState().web3.networkId;
    const sourceTokens = filterTokensByFieldName("isSource", true, networkId);
    const contract = drizzle.contracts.CostAverageOrderBook;
    const orderParamLimitsKey = contract.methods["getOrderParamLimits"].cacheCall();

    const sourceCurrencyLimitsKeys = {}
    for (const token of sourceTokens) {
      const cacheKey = contract.methods["getSourceCurrencyLimits"].cacheCall(token.address);
      sourceCurrencyLimitsKeys[token.address] = cacheKey;
    }

    this.setState({
      orderParamLimitsKey,
      sourceCurrencyLimitsKeys
    });
  }

  async createOrder() {
    const { drizzle, drizzleState } = this.context;
    const { batches, frequency, quantity, sourceTokenAddress, targetTokenAddress } = this.state.newOrderInputs;

    const contract = drizzle.contracts.CostAverageOrderBook;
    const amountExp = drizzle.web3.utils.toWei(String(quantity), 'ether');
    const txOptions = { from: drizzleState.accounts[0] };

    // Set order conditions for ETH
    if (sourceTokenAddress === ADDRESS_ZERO) {
      txOptions['value'] = amountExp;
    }
    // Set order conditions for ERC20 token
    else {
      // Approve token transfer
      const erc20Interface = new drizzle.web3.eth.Contract(
        IERC20.abi,
        sourceTokenAddress,
        { data: 'deployedBytecode' }
      );
      await erc20Interface.methods.approve(
        contract.address,
        amountExp
      ).send({ from: drizzleState.accounts[0] })
    }

    // Create order
    const newOrderStackId = contract.methods["createOrder"].cacheSend(
      amountExp,
      sourceTokenAddress,
      targetTokenAddress,
      Number(frequency),
      Number(batches),
      txOptions
    );
    this.setState({ newOrderStackId });
  }

  setOrderDefaults() {
    const { drizzle } = this.context;

    const networkId = drizzle.store.getState().web3.networkId;
    const sourceTokenAddress = findTokenByFieldName("symbol", "DAI", networkId).address;
    const targetTokenAddress = findTokenByFieldName("symbol", "ETH", networkId).address;

    this.setState({
      newOrderInputs: {
        batches: '',
        frequency: 3600,
        quantity: '',
        sourceTokenAddress,
        targetTokenAddress
      }
    });
  }

  validateOrderForm() {
    const { orderParamLimitsKey, sourceCurrencyLimitsKeys } = this.state;
    const { batches, quantity, sourceTokenAddress } = this.state.newOrderInputs;
    const { drizzle, drizzleState } = this.context;
    const contract = drizzleState.contracts.CostAverageOrderBook;

    const { minBatches_, maxBatches_ } = contract.getOrderParamLimits[orderParamLimitsKey].value;
    const { minAmount_, maxAmount_ } = contract.getSourceCurrencyLimits[sourceCurrencyLimitsKeys[sourceTokenAddress]].value;

    const formErrors = {};

    const minAmountFormatted = drizzle.web3.utils.fromWei(String(minAmount_), 'ether');
    const maxAmountFormatted = drizzle.web3.utils.fromWei(String(maxAmount_), 'ether');

    if (quantity < Number(minAmountFormatted)) {
      formErrors['quantity'] = { message: `Must be greater than ${minAmountFormatted}` };
    }
    if (quantity > Number(maxAmountFormatted)) {
      formErrors['quantity'] = { message: `Must be less than ${maxAmountFormatted}` };
    }
    if (batches < Number(minBatches_)) {
      formErrors['batches'] = { message: `Must be greater than ${minBatches_}` };
    }
    if (batches > Number(maxBatches_)) {
      formErrors['batches'] = { message: `Must be less than ${maxBatches_}` };
    }

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
