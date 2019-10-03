import React from 'react';

import { makeStyles } from '@material-ui/styles';

import OrderForm from "./OrderForm";

import { BLUE_LIGHT5 } from '../theme/colors';
import { BOX_SHADOW_2 } from '../theme/styles';

const useStyles = makeStyles({
  root: {
    background: BLUE_LIGHT5,
    borderRadius: 15,
    boxShadow: BOX_SHADOW_2,
    maxWidth: 550,
    margin: "-140px auto 48px",
    overflow: "hidden"
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
    sourceTokenBalance
  } = props;

  return (
    <div className={classes.root}>
      <OrderForm
        formErrors={formErrors}
        inputs={newOrderInputs}
        networkId={networkId}
        onSubmitClick={onOrderSubmitClick}
        onInputChange={onOrderInputChange}
        sourceTokenBalance={sourceTokenBalance}
      />
    </div>
  );
};

export default OrderBuilderBlock;
