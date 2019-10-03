import React from 'react';

import {
  Box,
  Button,
  Input,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Typography
} from '@material-ui/core';
import {
  ArrowRightAlt as ArrowIcon,
  Alarm as FrequencyIcon,
  Error as ErrorIcon,
  FilterNone as BatchesIcon
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';

import { TIMETABLE } from '../constants';
import useTokenTable from '../effects/useTokenTable';
import {
  BLUE_DARK3,
  BLUE_LIGHT2,
  GRAY_DARK1,
  GRAY,
  GRAY_LIGHT5,
  RED_DARK1,
  WHITE
} from '../theme/colors';
import { truncateAmountToMaxDecimals } from '../utils';

import CurrencyPicker from './forms/CurrencyPicker';

const useStyles = makeStyles({
  amountPerBatchWrapper: {
    color: GRAY,
    marginLeft: 10
  },
  arrowIconWrapper: {
    height: '100%',
    margin: '0 20px',
    '& svg': {
      fill: GRAY_DARK1,
      height: '100%',
      width: 55
    }
  },
  batchesInput: {
    color: BLUE_DARK3,
    margin: '0 10px',
    paddingLeft: 15,
    width: 60,
    '& input': {
      fontSize: 20,
      textAlign: 'center'
    }
  },
  currencyPickerGroup: {
    backgroundColor: GRAY_LIGHT5,
    borderRadius: 24,
    padding: '5px 10px 5px 15px'
  },
  formBottomWrapper: {
    padding: "24px 48px"
  },
  formErrorIconWrapper: {
    color: RED_DARK1,
    minWidth: 35
  },
  formErrorsWrapper: {
    marginTop: 10
  },
  formErrorText: {
    color: RED_DARK1
  },
  formTopWrapper: {
    backgroundColor: WHITE,
    padding: "32px 48px"
  },
  frequencyInput: {
    color: BLUE_DARK3,
    fontSize: 20,
    marginLeft: 10,
    padding: '0 10px'
  },
  frequencyInputWrapper: {
    marginLeft: 48
  },
  inputHelperText: {
    color: BLUE_DARK3
  },
  inputIconWrapper: {
    '& svg': {
      color: BLUE_LIGHT2,
      verticalAlign: 'middle'
    }
  },
  quantityInput: {
    '& input': {
      fontSize: 24,
      margin: '0 10px 0 20px',
      textAlign: 'center'
    }
  },
  root: {},
  selectRoot: {
    '&:focus': {
      backgroundColor: 'inherit'
    }
  },
  sourceTokenBalance: {
    marginLeft: 20,
    color: GRAY
  },
  submitButton: {
    borderRadius: 24,
    boxShadow: 'none',
    marginTop: 24
  },
  tokensRow: {
    marginBottom: 20
  }
});

const OrderForm = props => {
  const classes = useStyles(props);
  const {
    formErrors,
    inputs,
    networkId,
    onInputChange,
    onSubmitClick,
    sourceTokenBalance
  } = props;

  const tokenTable = useTokenTable(networkId);
  let tokenOptions, sourceTokenOptions, sourceSymbol;
  if (tokenTable) {
    tokenOptions = Object.values(tokenTable);
    sourceTokenOptions = tokenOptions.filter(token => ["DAI", "ETH"].includes(token.symbol));
    sourceSymbol = inputs.sourceTokenAddress ? tokenTable[inputs.sourceTokenAddress].symbol : "[TOKEN]";
  }

  const renderFrequencyOptions = () =>
    Object.keys(TIMETABLE).map(seconds =>
      <MenuItem
        key={seconds}
        value={seconds}
      >
        {TIMETABLE[seconds]}
      </MenuItem>
    );

  // const renderAmountPerBatchText = () => {
  //   const amount = inputs.quantity || 0;
  //   const batches = inputs.batches || 0;
  //   const amountPerBatch = (amount && batches) ? (amount / batches).toFixed(2) : "-";
  //   return `${amountPerBatch} ${sourceSymbol}`;
  // }

//   const renderOrderSummary = () => {
//     const amount = inputs.quantity || 0;
//     const sourceSymbol = inputs.sourceTokenAddress ? tokenTable[inputs.sourceTokenAddress].symbol : "[TOKEN]";
//     const targetSymbol = inputs.targetTokenAddress ? tokenTable[inputs.targetTokenAddress].symbol : "[TOKEN]";
//     const frequency = inputs.frequency ? TIMETABLE[inputs.frequency] : "[FREQUENCY]";
//     const batches = inputs.batches || 0;
//     const amountPerBatch = amount && batches ? amount / batches : 0;
//
//     return `Use ${amount} ${sourceSymbol} to buy ${targetSymbol} in ${batches} orders of ${amountPerBatch}, every ${frequency}`;
//   }

  return (
    <div className={classes.root}>
      <div className={classes.formTopWrapper}>
        <Box className={classes.currencyInputsWrapper} display="flex" alignItems="center">
          <Box flexGrow={1}>
            <div className={classes.currencyPickerGroup}>
              <Box display="flex" alignItems="center">
                <Box flexGrow={1}>
                  <Input
                    autoComplete="off"
                    autoFocus={true}
                    className={classes.quantityInput}
                    disableUnderline
                    fullWidth
                    name="quantity"
                    onChange={onInputChange}
                    placeholder="100"
                    type="number"
                    value={inputs.quantity}
                  />
                </Box>
                <Box>
                  <CurrencyPicker
                    inputName="sourceTokenAddress"
                    onInputChange={onInputChange}
                    selectedTokenAddress={inputs.sourceTokenAddress}
                    tokens={sourceTokenOptions}
                  />
                </Box>
              </Box>
            </div>
          </Box>
          <Box>
            <div className={classes.arrowIconWrapper}>
              <ArrowIcon />
            </div>
          </Box>
          <Box>
            <div className={classes.currencyPickerGroup}>
              <CurrencyPicker
                inputName="targetTokenAddress"
                onInputChange={onInputChange}
                selectedTokenAddress={inputs.targetTokenAddress}
                tokens={tokenOptions}
              />
            </div>
          </Box>
        </Box>
        <Typography
          className={classes.sourceTokenBalance}
          variant="subtitle1"
        >
          Available: {sourceTokenBalance ?
            `${truncateAmountToMaxDecimals(sourceTokenBalance, 2)} ${sourceSymbol}`  :
            "loading..."
          }
        </Typography>

      </div>

      <div className={classes.formBottomWrapper}>
        <Box
          alignItems="center"
          display="flex"
          justifyContent="center"
        >
          <Box
            alignItems="center"
            display="flex"
            className={classes.batchesInputWrapper}
          >
            <Box className={classes.inputIconWrapper}>
              <BatchesIcon />
            </Box>
            <Box>
              <Input
                autoComplete="off"
                className={classes.batchesInput}
                color="primary"
                fullWidth
                name="batches"
                onChange={onInputChange}
                placeholder="5"
                type="number"
                value={inputs.batches}
              />
            </Box>
            <Box>
              <Typography
                className={classes.inputHelperText}
                variant="body1"
              >
                {"batches"}
              </Typography>
            </Box>
          </Box>
          <Box
            alignItems="center"
            display="flex"
            className={classes.frequencyInputWrapper}
          >
            <Box className={classes.inputIconWrapper}>
              <FrequencyIcon />
            </Box>
            <Box>
              <Select
                className={classes.frequencyInput}
                classes={{ root: classes.selectRoot }}
                color="primary"
                fullWidth
                name="frequency"
                onChange={onInputChange}
                value={inputs.frequency}
              >
                {renderFrequencyOptions()}
              </Select>
            </Box>
          </Box>
        </Box>

        {Object.keys(formErrors).length > 0 &&
          <div className={classes.formErrorsWrapper}>
            <List dense>
              {Object.keys(formErrors).map(field =>
                <ListItem key={field}>
                  <ListItemIcon className={classes.formErrorIconWrapper}>
                    <ErrorIcon />
                  </ListItemIcon>
                  <ListItemText
                    className={classes.formErrorText}
                    primary={`${field}: ${formErrors[field].message}`}
                    variant="subtitle2"
                  />
                </ListItem>
              )}
            </List>
          </div>
        }

        <Button
          className={classes.submitButton}
          fullWidth
          onClick={onSubmitClick}
          variant="contained"
        >
          VUNCANIZE
        </Button>

      </div>
    </div>
  );
};

export default OrderForm;
