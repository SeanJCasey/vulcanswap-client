import React from 'react';

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { TIMETABLE } from '../constants';
import { dateObjDisplayFormatter, getTokenTableForNetwork } from '../utils';

const useStyles = makeStyles({
  ordersActiveWrapper: {},
  ordersArchivedWrapper: {},
  root: {},
  tableCell: {}
});

const OrderTable = props => {
  const classes = useStyles(props);
  const { drizzle, drizzleState, onCancelOrderClick, orderKeys } = props;

  const tokenTable = getTokenTableForNetwork(drizzle.store.getState().web3.networkId);

  const getOrdersColLabels = type => {
    switch (type) {
      case 'archived':
        return ["Order #", "Contributed", "Converted", "Batches", "Frequency", "Last Trade", "Status"];
      case 'active':
      default:
        return ["Order #", "Contributed", "Converted", "Batches", "Frequency", "Last Trade", "Next Trade"];
    }
  };

  const getOrderTableValues = (order, type) => {
    const batchesExecuted = `${order.batchesExecuted} / ${order.batches}`;
    const conversionLast = order.lastConversionTimestamp > 0 ? dateObjDisplayFormatter(new Date(order.lastConversionTimestamp * 1000)) : "n/a";
    const conversionNext = order.nextConversionTimestamp > 0 ? dateObjDisplayFormatter(new Date(order.nextConversionTimestamp * 1000)) : "overdue!";
    const id = order.id;
    const frequency = TIMETABLE[order.frequency] ? TIMETABLE[order.frequency] : `${order.frequency} seconds`;
    const sourceCurrencyInitial = `${order.amount} ${tokenTable[order.sourceCurrency].symbol}`;
    const status = order.batchesExecuted < order.batches ? "cancelled" : "completed";
    const targetCurrencyConverted = `${Number(order.targetCurrencyConverted).toFixed(4)} ${tokenTable[order.targetCurrency].symbol}`;

    switch (type) {
      case 'archived':
        return [id, sourceCurrencyInitial, targetCurrencyConverted, batchesExecuted, frequency, conversionLast, status];
      case 'active':
      default:
        return [id, sourceCurrencyInitial, targetCurrencyConverted, batchesExecuted, frequency, conversionLast, conversionNext];

    }
  };

  const getFormattedOrders = () => {
    let orders = [];
    for (const orderKey of orderKeys) {
      const orderState = drizzleState.contracts.CostAverageOrderBook.getOrderForAccountIndex[orderKey];
      if (orderState) {
        const order = {
          'id': orderState.value.id_,
          'amount': drizzle.web3.utils.fromWei(orderState.value.amount_, 'ether'),
          'sourceCurrency': orderState.value.sourceCurrency_,
          'targetCurrency': orderState.value.targetCurrency_,
          'frequency': Number(orderState.value.frequency_),
          'batches': Number(orderState.value.batches_),
          'batchesExecuted': Number(orderState.value.batchesExecuted_),
          'targetCurrencyConverted': drizzle.web3.utils.fromWei(orderState.value.targetCurrencyConverted_),
          'lastConversionTimestamp': Number(orderState.value.lastConversionTimestamp_),
          'sourceCurrencyBalance': drizzle.web3.utils.fromWei(orderState.value.sourceCurrencyBalance_)
        }
        order['nextConversionTimestamp'] = order['lastConversionTimestamp'] > 0 ? order['lastConversionTimestamp'] + order['frequency'] : 0;
        orders.push(order);
      }
    }
    return orders;
  }

  const renderOrdersActive = orders =>
    ordersActive.map((order, i) =>
      <TableRow key={order.id}>
        {getOrderTableValues(order, 'active').map((value, j) =>
          <TableCell
            key={j}
            align="center"
            padding="none"
            className={classes.tableCell}
          >
            {value}
          </TableCell>
        )}
        <TableCell>
          <Button
            onClick={() => onCancelOrderClick(order.id)}
            variant="outlined"
          >
            Cancel
          </Button>
        </TableCell>
      </TableRow>
    );

  const renderOrdersArchived = orders =>
    ordersArchived.map((order, i) =>
      <TableRow key={order.id}>
        {getOrderTableValues(order, 'archived').map((value, j) =>
          <TableCell
            key={j}
            align="center"
            padding="none"
            className={classes.tableCell}
          >
            {value}
          </TableCell>
        )}
      </TableRow>
    );

  const renderOrdersTableHead = type =>
    <TableRow>
      {getOrdersColLabels(type).map((label, i) =>
        <TableCell
          key={label}
          align="center"
          padding="none"
          className={classes.tableCell}
        >
          {label}
        </TableCell>
      )}
    </TableRow>

  const orders = getFormattedOrders();
  if (!(orders.length > 0)) return null;

  const ordersActive = orders.filter(order => order.sourceCurrencyBalance > 0);
  const ordersArchived = orders.filter(order => order.sourceCurrencyBalance <= 0);

  return (
    <div className={classes.root}>
      {orders.length > 0 &&
        <div className={classes.ordersActiveWrapper}>
          <h2>Active Orders</h2>
          <Table className={classes.table} size="small">
            <TableHead>
              {renderOrdersTableHead('active')}
            </TableHead>
            <TableBody>
              {renderOrdersActive(ordersActive)}
            </TableBody>
          </Table>
        </div>
      }
      {ordersArchived.length > 0 &&
        <div className={classes.ordersArchivedWrapper}>
          <h2>Archived Orders</h2>
          <Table className={classes.table} size="small">
            <TableHead>
              {renderOrdersTableHead('archived')}
            </TableHead>
            <TableBody>
              {renderOrdersArchived(ordersArchived)}
            </TableBody>
          </Table>
        </div>
      }
    </div>
  );
};

export default OrderTable;
