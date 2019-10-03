import React from 'react';

import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';
import {
  ArrowRightAlt as ArrowIcon
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';

import { TIMETABLE } from '../constants';
import {
  dateObjDisplayFormatter,
  getTokenTableForNetwork,
  truncateAmountToMaxDecimals
} from '../utils';

import { COLOR_PRIMARY, GRAY, GRAY_LIGHT4, RED } from '../theme/colors';

const ORDER_STATES = {
  FAILED: 0,
  ACTIVE: 1,
  COMPLETED: 2,
  CANCELLED: 3
}

const useStyles = makeStyles({
  arrowIconWrapper: {
    height: '100%',
    margin: '0 10px',
    '& svg': {
      fill: COLOR_PRIMARY,
      height: '100%',
      verticalAlign: 'middle',
      width: 36
    }
  },
  batchesWrapper: {
    fontSize: 24,
    padding: "6px 0"
  },
  cancelButton: {
    color: RED
  },
  lastSwapWrapper: {
    padding: "6px 0"
  },
  ordersActiveWrapper: {},
  ordersArchivedWrapper: {},
  root: {},
  secondaryText: {
    color: GRAY
  },
  tableCell: {},
  tableRow: {
    '&.inactive': {
      backgroundColor: GRAY_LIGHT4,
      opacity: 0.7
    },
  },
  tokenIcon: {
    verticalAlign: 'middle'
  },
  tokenIconWrapper: {
    marginRight: 5
  }
});

const OrderTable = props => {
  const classes = useStyles(props);
  const { drizzle, drizzleState, onCancelOrderClick, orderKeys } = props;

  const tokenTable = getTokenTableForNetwork(drizzle.store.getState().web3.networkId);

  const orderStateLabels = {
    [ORDER_STATES.FAILED]: "Failed",
    [ORDER_STATES.ACTIVE]: "Active",
    [ORDER_STATES.COMPLETED]: "Completed",
    [ORDER_STATES.CANCELLED]: "Cancelled"
  }

  const getOrdersColLabels = type => {
    switch (type) {
      case 'archived':
        return ["Swapped", "Total Swaps", "Last Swap", "Status"];
      case 'active':
      default:
        return ["Swapped", "Total Swaps", "Last Swap", ""];
    }
  };

  const displayAmount = (amount, symbol) => `${amount} ${symbol}`;

  const renderToken = (amount, token) =>
    <Box className="tokenWrapper" display="flex" alignItems="center">
      <Box className={classes.tokenIconWrapper}>
        <img
          alt={token.name}
          className={classes.tokenIcon}
          height={24}
          src={token.icon}
          width={24}
        />
      </Box>
      <Box>
        <Typography variant="body1">{displayAmount(amount, token.symbol)}</Typography>
      </Box>
    </Box>

  const getOrderTableValues = order => {
    const sourceToken = tokenTable[order.sourceCurrency];
    const sourceConverted = truncateAmountToMaxDecimals(order.sourceCurrencyConverted, 2);
    const sourceRemaining = truncateAmountToMaxDecimals(order.amount - sourceConverted, 2);

    const targetToken = tokenTable[order.targetCurrency];
    const targetConverted = truncateAmountToMaxDecimals(order.targetCurrencyConverted, 2);

    const frequency = TIMETABLE[order.frequency] ? TIMETABLE[order.frequency] : `${order.frequency} seconds`;

    const conversionLast = order.lastConversionTimestamp > 0 ? dateObjDisplayFormatter(new Date(order.lastConversionTimestamp * 1000)) : "n/a";
    const conversionNext = order.nextConversionTimestamp > 0 ? dateObjDisplayFormatter(new Date(order.nextConversionTimestamp * 1000)) : "overdue!";

    const renderLastSwap = () =>
      <React.Fragment>
        <div className={classes.lastSwapWrapper}>
          <Typography
            component="p"
            variant="h6"
          >
            {conversionLast}
          </Typography>
        </div>
        <Typography
          className={classes.secondaryText}
          variant="subtitle1"
        >
          Next: {conversionNext}
        </Typography>
      </React.Fragment>

    const renderSwapped = () =>
      <React.Fragment>
        <Box className="tokenWrapper" display="flex" alignItems="center" justifyContent="center">
          {renderToken(sourceConverted, sourceToken)}
          <Box className={classes.arrowIconWrapper}>
            <ArrowIcon />
          </Box>
          {renderToken(targetConverted, targetToken)}
        </Box>
        <Typography
          className={classes.secondaryText}
          variant="subtitle1"
        >
          {displayAmount(sourceRemaining, sourceToken.symbol)} remaining
        </Typography>
      </React.Fragment>

    const renderTotalSwaps = () =>
      <React.Fragment>
        <div className={classes.batchesWrapper}>
          <Typography
            component="p"
            variant="h5"
          >
            {order.batchesExecuted} of {order.batches}
          </Typography>
        </div>
        <Typography
          className={classes.secondaryText}
          variant="subtitle1"
        >
          {frequency}
        </Typography>
      </React.Fragment>

    return [renderSwapped(), renderTotalSwaps(), renderLastSwap()];

    // switch (type) {
    //   case 'archived':
    //     return [renderSwapped(), renderTotalSwaps(), renderLastSwap(), status];
    //   case 'active':
    //   default:
    //     return [renderSwapped(), renderTotalSwaps(), renderLastSwap()];
    // }
  };

  const getFormattedOrders = () => {
    let orders = [];
    for (const orderKey of orderKeys) {
      const orderState = drizzleState.contracts.CostAverageOrderBook.getOrderForAccountIndex[orderKey];
      if (orderState) {
        const order = {
          id: orderState.value.id_,
          amount: drizzle.web3.utils.fromWei(orderState.value.amount_, 'ether'),
          batches: Number(orderState.value.batches_),
          batchesExecuted: Number(orderState.value.batchesExecuted_),
          frequency: Number(orderState.value.frequency_),
          lastConversionTimestamp: Number(orderState.value.lastConversionTimestamp_),
          status: Number(orderState.value.state_),
          sourceCurrency: orderState.value.sourceCurrency_,
          sourceCurrencyConverted: drizzle.web3.utils.fromWei(orderState.value.sourceCurrencyConverted_),
          targetCurrency: orderState.value.targetCurrency_,
          targetCurrencyConverted: drizzle.web3.utils.fromWei(orderState.value.targetCurrencyConverted_)
        }
        order['nextConversionTimestamp'] = order['lastConversionTimestamp'] > 0 ? order['lastConversionTimestamp'] + order['frequency'] : 0;
        orders.push(order);
      }
    }
    return orders;
  }

  const renderOrders = () =>
    orders.map((order, i) =>
      <TableRow
        className={`${classes.tableRow} ${order.status === ORDER_STATES.ACTIVE ? "active" : "inactive"}`}
        key={order.id}
      >
        {getOrderTableValues(order).map((value, j) =>
          <TableCell
            key={j}
            align="center"
            className={classes.tableCell}
          >
            {value}
          </TableCell>
        )}
        {order.status === ORDER_STATES.ACTIVE ? (
          <TableCell
            align="center"
          >
            <Button
              className={classes.cancelButton}
              onClick={() => onCancelOrderClick(order.id)}
              size="small"
            >
              Cancel
            </Button>
          </TableCell>
        ) : (
          <TableCell
            key={`status-${i}`}
            align="center"
            className={classes.tableCell}
          >
            {orderStateLabels[order.status]}
          </TableCell>
        )}

      </TableRow>
    );

//   const renderOrdersActive = () =>
//     ordersActive.map((order, i) =>
//       <TableRow className={classes.tableRow} key={order.id}>
//         {getOrderTableValues(order, 'active').map((value, j) =>
//           <TableCell
//             key={j}
//             align="center"
//             className={classes.tableCell}
//           >
//             {value}
//           </TableCell>
//         )}
//         <TableCell>
//           <Button
//             className={classes.cancelButton}
//             onClick={() => onCancelOrderClick(order.id)}
//             size="small"
//           >
//             Cancel
//           </Button>
//         </TableCell>
//       </TableRow>
//     );
//
//   const renderOrdersArchived = () =>
//     ordersArchived.map((order, i) =>
//       <TableRow key={order.id}>
//         {getOrderTableValues(order, 'archived').map((value, j) =>
//           <TableCell
//             key={j}
//             align="center"
//             className={classes.tableCell}
//           >
//             {value}
//           </TableCell>
//         )}
//       </TableRow>
//     );

  const renderOrdersTableHead = type =>
    <TableRow>
      {getOrdersColLabels(type).map((label, i) =>
        <TableCell
          key={label}
          align="center"
          className={classes.tableCell}
        >
          {label}
        </TableCell>
      )}
    </TableRow>

  const orders = getFormattedOrders();
  if (!(orders.length > 0)) return null;

  // const ordersActive = orders.filter(order => order.status === ORDER_STATES.ACTIVE);
  // const ordersArchived = orders.filter(order => order.status !== ORDER_STATES.ACTIVE);

  return (
    <div className={classes.root}>
      {orders.length > 0 &&
        <div className={classes.ordersActiveWrapper}>
          <Table className={classes.table}>
            <TableHead>
              {renderOrdersTableHead('active')}
            </TableHead>
            <TableBody>
              {renderOrders(orders)}
            </TableBody>
          </Table>
        </div>
      }
      {/* {ordersArchived.length > 0 && */}
      {/*   <div className={classes.ordersArchivedWrapper}> */}
      {/*     <h2>Archived Orders</h2> */}
      {/*     <Table className={classes.table} size="small"> */}
      {/*       <TableHead> */}
      {/*         {renderOrdersTableHead('archived')} */}
      {/*       </TableHead> */}
      {/*       <TableBody> */}
      {/*         {renderOrdersArchived(ordersArchived)} */}
      {/*       </TableBody> */}
      {/*     </Table> */}
      {/*   </div> */}
      {/* } */}
    </div>
  );
};

export default OrderTable;
