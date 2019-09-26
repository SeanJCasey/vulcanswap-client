import React from 'react';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import OrderForm from "./OrderForm";
import TokenLiquidityContainer from "../containers/TokenLiquidityContainer";

import { CLOUD_LIGHT } from '../theme/colors';

const useStyles = makeStyles({
  root: {
    borderRadius: 15,
    background: CLOUD_LIGHT,
    padding: 40
  }
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
      {/* <Typography variant="h3">New Order</Typography> */}
      <Grid container>
        <Grid item xs={12}>
          <OrderForm
            formErrors={formErrors}
            inputs={newOrderInputs}
            networkId={networkId}
            onSubmitClick={onOrderSubmitClick}
            onInputChange={onOrderInputChange}
          />
        </Grid>
        {newOrderInputs.targetTokenAddress &&
          <Grid item xs={12} sm={6} md={5} lg={4}>
            <TokenLiquidityContainer
              targetTokenAddress={newOrderInputs.targetTokenAddress}
            />
          </Grid>
        }
      </Grid>
    </div>
  );
};

export default OrderBuilderBlock;
