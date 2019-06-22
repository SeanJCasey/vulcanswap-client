import React, { Component } from 'react';
import { DrizzleContext } from "drizzle-react";

import AdminOptionsBlock from '../components/AdminOptionsBlock';
import ContractStatsBlock from "../components/ContractStatsBlock";

class AdminPage extends Component {
  render() {
    const { initialized } = this.context;

    if (!initialized) {
        return "Loading...";
    }

    return (
      <div className="adminPage">
        <div className="container">
          <h1>Administration</h1>
          <ContractStatsBlock />
          <AdminOptionsBlock />
        </div>
      </div>
    );
  }
}

AdminPage.contextType = DrizzleContext.Context;

export default AdminPage;
