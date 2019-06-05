import React, { Component } from 'react';
import { DrizzleContext } from "drizzle-react";

import { TOKENTABLE } from '../constants';
import UniswapExchangeInterface from "../contracts/UniswapExchangeInterface.json";

class TokenLiquidityBlock extends Component {

  constructor(props) {
    super(props);

    this.state = {
      'exchangeData': {
        'tokenAddress': '',
        'ratePerEth': null,
        'totalEth': null
      }
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

    const token = exchangeData.tokenAddress ? TOKENTABLE[exchangeData.tokenAddress] : '';

    return (
      <div className="tokenLiquidityBlock">
        <div className="tokenLiquidityBlockInner">
          <h3>Liquidity Pool</h3>
          {token &&
            <div className="tokenLiquidityDetails">
              <div className="detail tokenName">
                <label>Token:</label>
                  {token.name} ({token.symbol})
              </div>
              <div className="detail tokenRate">
                <label>Current Rate:</label>
                {exchangeData.ratePerEth} {token.symbol} / ETH
              </div>
              <div className="detail tokenLiquidity">
                <label>Current Liquidity:</label>
                {exchangeData.totalEth} ETH
              </div>
            </div>
          }
          <div className="block-footer">
            <div className="liquidity-provider">
              Liquidity by Uniswap
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TokenLiquidityBlock.contextType = DrizzleContext.Context;

export default TokenLiquidityBlock;
