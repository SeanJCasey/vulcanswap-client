import React, { Component } from 'react';
import { DrizzleContext } from 'drizzle-react';

import { ADDRESS_ZERO } from '../constants';
import IERC20 from '../contracts/IERC20.json';
import { findTokenByFieldName, getTokenTableForNetwork } from '../utils';

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
    tokenBalanceKeys: {}
  };

  componentDidMount() {
    const { drizzle, drizzleState } = this.context;

    this.setOrderDefaults();

    const account = drizzleState.accounts[0];
    const networkId = drizzle.store.getState().web3.networkId;
    const tokenTable = getTokenTableForNetwork(networkId);
    const contract = drizzle.contracts.CostAverageOrderBook;

    // Monitor order limits
    const orderParamLimitsKey = contract.methods["getOrderParamLimits"].cacheCall();

    // Monitor accepted currencies
    const sourceTokens = Object.values(tokenTable).filter(token => token.isSource === true);
    const sourceCurrencyLimitsKeys = {}
    for (const token of sourceTokens) {
      const cacheKey = contract.methods["acceptedCurrencyInfo"].cacheCall(token.address);
      sourceCurrencyLimitsKeys[token.address] = cacheKey;
    }

    // Monitor token balances
    const erc20Tokens = Object.values(tokenTable).filter(token => token.address !== ADDRESS_ZERO);
    let tokenBalanceKeys = {}
    for (const erc20Token of erc20Tokens) {
      tokenBalanceKeys[erc20Token.address] = drizzle.contracts[`I${erc20Token.symbol}`].methods["balanceOf"].cacheCall(account);
    }

    this.setState({
      orderParamLimitsKey,
      sourceCurrencyLimitsKeys,
      tokenBalanceKeys
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

  getTokenBalance(token) {
    if (!token) return null;

    const { drizzle, drizzleState } = this.context;
    const { tokenBalanceKeys } = this.state;

    if (token.address === ADDRESS_ZERO) {
      return drizzle.web3.utils.fromWei(drizzleState.accountBalances[drizzleState.accounts[0]]);
    }
    else {
      const tokenBalanceKey = tokenBalanceKeys[token.address];
      if (!tokenBalanceKey) return null;

      const tokenBalanceRes = drizzleState.contracts[`I${token.symbol}`].balanceOf[tokenBalanceKey];
      return tokenBalanceRes ? drizzle.web3.utils.fromWei(tokenBalanceRes.value, 'ether') : null;
    }
  }

  setOrderDefaults() {
    const { drizzle } = this.context;

    const networkId = drizzle.store.getState().web3.networkId;
    const sourceTokenAddress = findTokenByFieldName("symbol", "DAI", networkId).address;
    const targetTokenAddress = findTokenByFieldName("symbol", "ETH", networkId).address;

    this.setState({
      newOrderInputs: {
        batches: 5,
        frequency: 3600,
        quantity: 0,
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
    const { minAmount, maxAmount } = contract.acceptedCurrencyInfo[sourceCurrencyLimitsKeys[sourceTokenAddress]].value;

    const formErrors = {};

    const minAmountFormatted = drizzle.web3.utils.fromWei(String(minAmount), 'ether');
    const maxAmountFormatted = drizzle.web3.utils.fromWei(String(maxAmount), 'ether');

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
    const { drizzle } = this.context;
    const { formErrors, newOrderInputs } = this.state;

    const networkId = drizzle.store.getState().web3.networkId;
    const tokenTable = getTokenTableForNetwork(networkId)
    const sourceToken = tokenTable[newOrderInputs.sourceTokenAddress];

    let sourceTokenBalance;
    if (sourceToken) {
      sourceTokenBalance = this.getTokenBalance(sourceToken);
    }

    return (
      <OrderBuilderBlock
        formErrors={formErrors}
        networkId={networkId}
        newOrderInputs={newOrderInputs}
        onOrderInputChange={this.handleOrderInputChange}
        onOrderSubmitClick={this.handleOrderSubmitClick}
        sourceTokenBalance={sourceTokenBalance}
      />
    );
  }
}

OrderBuilderContainer.contextType = DrizzleContext.Context;

export default OrderBuilderContainer;
