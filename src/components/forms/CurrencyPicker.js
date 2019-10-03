import React from 'react';

import {
  Box,
  MenuItem,
  Select,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {},
  optionIconWrapper: {
    marginRight: 7,
    '& img': {
      verticalAlign: 'middle'
    }
  },
  selectRoot: {
    '&:focus': {
      backgroundColor: 'inherit'
    }
  },
});

const CurrencyPicker = props => {
  const classes = useStyles(props);

  const { inputName, onInputChange, selectedTokenAddress, tokens } = props;

  const renderTokenOptions = () => {
    if (tokens) {
      return tokens.map(token =>
        <MenuItem
          key={token.address}
          value={token.address}
        >
          {renderTokenOption(token)}
        </MenuItem>
      );
    }
    else return null;
  }

  const renderTokenOption = token =>
    <Box display="flex" alignItems="center">
      <Box className={classes.optionIconWrapper}>
        <img src={token.icon} alt={token.name} />
      </Box>
      <Box>
        <Typography variant="body1">{token.symbol}</Typography>
      </Box>
    </Box>

  return (
    <Select
      className={classes.root}
      classes={{
        root: classes.selectRoot
      }}
      disableUnderline
      name={inputName}
      onChange={onInputChange}
      value={selectedTokenAddress}
    >
      {renderTokenOptions(tokens)}
    </Select>
  );
};

export default CurrencyPicker;
