import React, { Component } from 'react';
import { DrizzleContext } from 'drizzle-react';

import { ADDRESS_ZERO } from '../constants';

import UniswapExchangeInterface from '../contracts/UniswapExchangeInterface.json';

import TokenLiquidityBlock from '../components/TokenLiquidityBlock';

class TokenLiquidityContainer extends Component {
  state = {
    'exchangeData': {
      'tokenAddress': '',
      'ratePerEth': null,
      'totalEth': null
    }
  }

  componentDidMount() {
    this.updateExchange();
  }

  componentDidUpdate(prevProps) {
    if (this.props.targetTokenAddress !== prevProps.targetTokenAddress) {
      this.updateExchange();
    }
  }

  async updateExchange() {
    const { drizzle } = this.context;
    const { targetTokenAddress } = this.props;
    const factory = drizzle.contracts.UniswapFactoryInterface;
    if (targetTokenAddress === ADDRESS_ZERO) return;

    factory.methods.getExchange(targetTokenAddress).call()
      .then(exchangeAddress => {
        return new drizzle.web3.eth.Contract(
          UniswapExchangeInterface.abi,
          exchangeAddress
        );
      })
      .then(IExchangeContract => {
        const totalEth = drizzle.web3.eth.getBalance(IExchangeContract._address)
          .then(result => drizzle.web3.utils.fromWei(result, 'ether'));

        const ratePerEth = IExchangeContract.methods.getEthToTokenInputPrice(
          drizzle.web3.utils.toWei('1', 'ether')
        ).call()
          .then(result => drizzle.web3.utils.fromWei(result))

        return(Promise.all([ratePerEth, totalEth]));
      })
      .then(result =>
        this.setState({
          exchangeData: {
            tokenAddress: targetTokenAddress,
            ratePerEth: result[0],
            totalEth: result[1]
          }
        })
      )
      .catch(error => console.log(error));
  }

  render() {
    const { exchangeData } = this.state;
    const { drizzle } = this.context;
    const networkId = drizzle.store.getState().web3.networkId;

    return (
      <TokenLiquidityBlock exchangeData={exchangeData} networkId={networkId} />
    );
  }
}

TokenLiquidityContainer.contextType = DrizzleContext.Context;

export default TokenLiquidityContainer;
