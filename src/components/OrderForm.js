import React from 'react';

import { Button, Grid, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { TIMETABLE } from '../constants';
import { getTokenTableForNetwork } from '../utils';

const useStyles = makeStyles({
  root: {},
  tokensRow: {
    marginBottom: 20
  }
});

const OrderForm = props => {
  const classes = useStyles(props);
  const { formErrors, inputs, networkId, onInputChange, onSubmitClick } = props;
  const tokenTable = getTokenTableForNetwork(networkId);

  const renderFrequencyOptions = () =>
    Object.keys(TIMETABLE).map(seconds =>
      <MenuItem
        key={seconds}
        value={seconds}
      >
        {TIMETABLE[seconds]}
      </MenuItem>
    );

  const renderOrderSummary = () => {
    const amount = inputs.quantity || 0;
    const targetSymbol = inputs.tokenAddress ? tokenTable[inputs.tokenAddress].symbol : "[TOKEN]";
    const frequency = inputs.frequency ? TIMETABLE[inputs.frequency] : "[FREQUENCY]";
    const batches = inputs.batches || 0;
    const amountPerBatch = amount && batches ? amount / batches : 0;

    return `Use ${amount} DAI to buy ${targetSymbol} in ${batches} orders of ${amountPerBatch}, every ${frequency}`;
  }

  const renderTargetTokenOptions = () =>
    Object.keys(tokenTable).map(address =>
      <MenuItem
        key={address}
        value={address}
      >
        {tokenTable[address].name}
      </MenuItem>
    );

  return (
    <div className={classes.root}>
      <Grid className={classes.tokensRow} container>
        <Grid item xs={6}>
          <TextField
            className={classes.quantityInput}
            error={formErrors && formErrors.quantity}
            fullWidth
            helperText={formErrors.quantity ? formErrors.quantity.message : ""}
            label="Swap Amount"
            name="quantity"
            onChange={onInputChange}
            placeholder="0.5"
            type="string"
            value={inputs.quantity}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6}>
          <Select
            className={classes.tokenAddressInput}
            fullWidth
            name="tokenAddress"
            onChange={onInputChange}
            value={inputs.tokenAddress}
            variant="outlined"
          >
            {renderTargetTokenOptions()}
          </Select>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={6}>
          <Select
            className={classes.frequencyInput}
            fullWidth
            name="frequency"
            onChange={onInputChange}
            value={inputs.frequency}
            variant="outlined"
          >
            {renderFrequencyOptions()}
          </Select>
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={classes.batchesInput}
            error={!!formErrors.batches}
            fullWidth
            helperText={formErrors.batches ? formErrors.batches.message : ""}
            label="Batches"
            name="batches"
            onChange={onInputChange}
            placeholder="5"
            type="number"
            value={inputs.batches}
            variant="outlined"
          />
        </Grid>
      </Grid>
      <Typography variant="subtitle1">{renderOrderSummary()}</Typography>
      <Button
        className="btn btn-primary"
        color="primary"
        onClick={onSubmitClick}
        variant="contained"
      >
        Vulcanize!
      </Button>
    </div>
  );
};

export default OrderForm;
