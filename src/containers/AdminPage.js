import React, { Component } from 'react';
import { DrizzleContext } from "drizzle-react";

import AdminOptionsBlock from '../components/AdminOptionsBlock';
import ContractStatsBlock from "../components/ContractStatsBlock";
import TitleWrapper from '../components/TitleWrapper';

class AdminPage extends Component {
  render() {
    const { initialized } = this.context;

    if (!initialized) {
        return "Loading...";
    }

    return (
      <div className="adminPage">
        <TitleWrapper>Administration</TitleWrapper>
        <div className="container">
          <ContractStatsBlock />
          <AdminOptionsBlock />
        </div>
      </div>
    );
  }
}

AdminPage.contextType = DrizzleContext.Context;

export default AdminPage;
