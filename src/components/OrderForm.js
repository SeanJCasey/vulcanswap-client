import React from 'react';

import { Button, Grid, MenuItem, Select, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { TIMETABLE } from '../constants';
import { getTokenTableForNetwork } from '../utils';

const useStyles = makeStyles({
  root: {}
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
      <Grid container>
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
          />
        </Grid>
        <Grid item xs={6}>
          <Select
            className={classes.tokenAddressInput}
            fullWidth
            name="tokenAddress"
            onChange={onInputChange}
            value={inputs.tokenAddress}
          >
            {renderTargetTokenOptions()}
          </Select>
        </Grid>
        <Grid item xs={6}>
          <Select
            className={classes.frequencyInput}
            fullWidth
            name="frequency"
            onChange={onInputChange}
            value={inputs.frequency}
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
            label="Swap Amount"
            name="batches"
            onChange={onInputChange}
            placeholder="5"
            type="number"
            value={inputs.batches}
          />
        </Grid>
        <Grid item>
          <Button
            className="btn btn-primary"
            color="primary"
            onClick={onSubmitClick}
            variant="contained"
          >
            Vulcanize!
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderForm;
