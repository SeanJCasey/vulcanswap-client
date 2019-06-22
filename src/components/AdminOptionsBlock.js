import React, { Component } from 'react';
import { DrizzleContext } from "drizzle-react";
import { newContextComponents } from "drizzle-react-components";

class AdminOptionsBlock extends Component {
  render() {
    const { ContractData, ContractForm } = newContextComponents;
    const { drizzle, drizzleState } = this.context;

    return (
      <div className="adminOptionsBlock">
        <h2>Admin Options</h2>
        <div className="section">
          <h3>Fees and Balance</h3>
          <div className="option withdrawFees">
            <h4>Withdraw Fees</h4>
            <strong>Fee Balance: </strong>
            <ContractData
              contract="CostAverageOrderBook"
              method="getFeeBalance"
              render={value => `${parseFloat(drizzle.web3.utils.fromWei(value, 'ether')).toFixed(4)} ETH`}
              drizzle={drizzle}
              drizzleState={drizzleState}
            />
            <ContractForm
              contract="CostAverageOrderBook"
              method="withdrawFees"
              drizzle={drizzle}
              drizzleState={drizzleState}
            />
          </div>
        </div>

        <div className="section">
          <h3>Access and Ownership</h3>
          <div className="option owner">
            <h4>Transfer Ownership</h4>
            <ContractForm
              contract="CostAverageOrderBook"
              method="transferOwnership"
              drizzle={drizzle}
              drizzleState={drizzleState}
            />
          </div>
          <div className="option emote-caller">
            <h4>Change Remote Caller</h4>
            <ContractForm
              contract="CostAverageOrderBook"
              method="setRemoteCaller"
              drizzle={drizzle}
              drizzleState={drizzleState}
            />
          </div>
        </div>

        <div className="section">
          <h3>Order Min/Max Values</h3>
          <div className="option amount">
            <h4>Amount</h4>
            <strong>Min: </strong>
            <ContractData
              contract="CostAverageOrderBook"
              method="minAmount"
              render={value => `${value} wei (${parseFloat(drizzle.web3.utils.fromWei(value, 'ether')).toFixed(4)} ETH)`}
              drizzle={drizzle}
              drizzleState={drizzleState}
            />
            <ContractForm
              contract="CostAverageOrderBook"
              method="setMinAmount"
              labels={['in wei']}
              drizzle={drizzle}
              drizzleState={drizzleState}
            />
          </div>
          <div className="option batches">
            <h4>Batches</h4>
            <strong>Min: </strong>
            <ContractData
              contract="CostAverageOrderBook"
              method="minBatches"
              drizzle={drizzle}
              drizzleState={drizzleState}
            />
            <ContractForm
              contract="CostAverageOrderBook"
              method="setMinBatches"
              drizzle={drizzle}
              drizzleState={drizzleState}
            />
            <strong>Max: </strong>
            <ContractData
              contract="CostAverageOrderBook"
              method="maxBatches"
              drizzle={drizzle}
              drizzleState={drizzleState}
            />
            <ContractForm
              contract="CostAverageOrderBook"
              method="setMaxBatches"
              drizzle={drizzle}
              drizzleState={drizzleState}
            />
          </div>
          <div className="option frequency">
            <h4>Frequency</h4>
            <strong>Min: </strong>
            <ContractData
              contract="CostAverageOrderBook"
              method="minFrequency"
              render={value => `${value} secs`}
              drizzle={drizzle}
              drizzleState={drizzleState}
            />
            <ContractForm
              contract="CostAverageOrderBook"
              method="setMinFrequency"
              labels={['in secs']}
              drizzle={drizzle}
              drizzleState={drizzleState}
            />
          </div>

        </div>

      </div>
    );
  }
}

AdminOptionsBlock.contextType = DrizzleContext.Context;

export default AdminOptionsBlock;
