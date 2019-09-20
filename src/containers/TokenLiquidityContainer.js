import React, { Component } from 'react';
import { DrizzleContext } from 'drizzle-react';

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

  updateExchange() {
    const { drizzle } = this.context;
    const { targetTokenAddress } = this.props;
    const factory = drizzle.contracts.UniswapFactoryInterface;
    factory.methods.getExchange(targetTokenAddress).call()
      .then(exchangeAddress => {
        // this.setState({ exchangeAddress }));
        // Grab liquidity pool info from Uniswap
        return new drizzle.web3.eth.Contract(
          UniswapExchangeInterface.abi,
          exchangeAddress,
          { data: 'deployedBytecode' }
        );
      })
      .then(IExchangeContract => {
        const ratePerEth = drizzle.web3.eth.getBalance(IExchangeContract._address)
          .then(result => drizzle.web3.utils.fromWei(result, 'ether'));

        const totalEth = IExchangeContract.methods.getEthToTokenInputPrice(drizzle.web3.utils.toWei('1', 'ether')).call();

        return(Promise.all([ratePerEth, totalEth]));
      })
      .then(result =>
        this.setState({
          exchangeData: {
            tokenAddress: targetTokenAddress,
            ratePerEth: result[1],
            totalEth: result[0]
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
