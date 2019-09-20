import React, { Component } from 'react';
import { DrizzleContext } from "drizzle-react";

class ContractStatsBlock extends Component {

  constructor(props) {
    super(props);

    this.state = {
      feesCollectedKey: null,
      orderIdKey: null,
      statTotalsKey: null,
      contractBalance: 0,
    }
  }

  componentDidMount() {
    const { drizzle } = this.context;
    const contract = drizzle.contracts.CostAverageOrderBook;

    // const feesCollectedKey = contract.methods["getTotalFeesCollected"].cacheCall();
    // const orderIdKey = contract.methods["id"].cacheCall();
    const statTotalsKey = contract.methods["getStatTotals"].cacheCall();

    // drizzle.web3.eth.getBalance(contract.address)
    //   .then(contractBalance => {
    //     this.setState({ feesCollectedKey, orderIdKey, statTotalsKey, contractBalance });
    //   })
    this.setState({ statTotalsKey });
  }

  render() {
    const { statTotalsKey } = this.state;
    const { drizzle, drizzleState } = this.context;

    const statTotals = drizzleState.contracts.CostAverageOrderBook.getStatTotals[statTotalsKey];

    return (
      <div className="contractStatsBlock">
        <h2>Contract Stats</h2>
        <div className="orders">
          Orders created: {statTotals && statTotals.value.orders_}
        </div>
        <div className="conversions">
          Trades executed: {statTotals && statTotals.value.conversions_}
        </div>
        <div className="balance">
          ETH under management: {statTotals && parseFloat(drizzle.web3.utils.fromWei(statTotals.value.managedEth_, 'ether')).toFixed(4)} ETH
        </div>
        <div className="fees">
          Fees collected: {statTotals && parseFloat(drizzle.web3.utils.fromWei(statTotals.value.fees_, 'ether')).toFixed(4)} ETH
        </div>
      </div>
    );
  }
}

ContractStatsBlock.contextType = DrizzleContext.Context;

export default ContractStatsBlock;
