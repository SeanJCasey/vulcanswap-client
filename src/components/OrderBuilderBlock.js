import React from 'react';

import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import OrderForm from "./OrderForm";
import TokenLiquidityContainer from "../containers/TokenLiquidityContainer";

const useStyles = makeStyles({
  root: {}
});

const OrderBuilderBlock = props => {
  const classes = useStyles(props);

  const {
    formErrors,
    networkId,
    newOrderInputs,
    onOrderInputChange,
    onOrderSubmitClick,
  } = props;

  return (
    <div className={classes.root}>
      <Typography variant="h3">New Order</Typography>
      <Grid container>
        <Grid item xs={12} sm={6} md={7} lg={8}>
          <OrderForm
            formErrors={formErrors}
            inputs={newOrderInputs}
            networkId={networkId}
            onSubmitClick={onOrderSubmitClick}
            onInputChange={onOrderInputChange}
          />
        </Grid>
        {newOrderInputs.tokenAddress &&
          <Grid item xs={12} sm={6} md={5} lg={4}>
            <TokenLiquidityContainer
              targetTokenAddress={newOrderInputs.tokenAddress}
            />
          </Grid>
        }
      </Grid>
    </div>
  );
};

export default OrderBuilderBlock;
