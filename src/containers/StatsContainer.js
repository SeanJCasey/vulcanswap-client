import React, { Component } from 'react';

import AccountStatsBlock from '../components/AccountStatsBlock';

class StatsContainer extends Component {
  render() {
    return (
      <div className="statsContainer">
        <AccountStatsBlock />
      </div>
    );
  }
}

export default StatsContainer;
