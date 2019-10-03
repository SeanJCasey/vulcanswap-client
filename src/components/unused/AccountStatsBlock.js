import React, { Component } from 'react';
import { DrizzleContext } from 'drizzle-react';

import { ADDRESS_ZERO } from '../constants';
import { findTokenByFieldName, getTokenTableForNetwork } from '../utils';

class AccountStatsBlock extends Component {

  state = {
    tokenBalanceKeys: {}
  }

  componentDidMount() {
    const { drizzle, drizzleState } = this.context;

    const account = drizzleState.accounts[0];
    const networkId = drizzle.store.getState().web3.networkId;
    const tokenTable = getTokenTableForNetwork(networkId);

    const tokens = Object.values(tokenTable).filter(token => token.address !== ADDRESS_ZERO);
    let tokenBalanceKeys = {}
    for (const token of tokens) {
      tokenBalanceKeys[token.address] = drizzle.contracts[`I${token.symbol}`].methods["balanceOf"].cacheCall(account);
    }

    this.setState({ tokenBalanceKeys });
  }

  render() {
    const { tokenBalanceKeys } = this.state;
    const { drizzle, drizzleState } = this.context;

    const ethBalance = drizzleState.accountBalances[drizzleState.accounts[0]];

    const networkId = drizzle.store.getState().web3.networkId;
    const daiAddress = findTokenByFieldName("symbol", "DAI", networkId).address;
    const daiBalance = drizzleState.contracts.IDAI.balanceOf[tokenBalanceKeys[daiAddress]];

    return (
      <div className="accountStatsBlock">
        <strong>Your account</strong>
        <div className="ethBalance">
          ETH available: {drizzle.web3.utils.fromWei(ethBalance.toString(), 'ether')} ETH
        </div>
        <div className="daiBalance">
          DAI available: {daiBalance && daiBalance.value && drizzle.web3.utils.fromWei(daiBalance.value, 'ether')} DAI
        </div>
      </div>
    );
  }
}

AccountStatsBlock.contextType = DrizzleContext.Context;

export default AccountStatsBlock;
