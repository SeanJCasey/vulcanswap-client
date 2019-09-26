import React from 'react';

import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { getTokenTableForNetwork } from '../utils';

const useStyles = makeStyles({
  detail: {},
  liquidityDetails: {},
  root: {}
});

const TokenLiquidityBlock = props => {
  const classes = useStyles(props);
  const { exchangeData, networkId } = props;

  const tokenTable = getTokenTableForNetwork(networkId);

  const token = exchangeData.tokenAddress ? tokenTable[exchangeData.tokenAddress] : '';

  return (
    <div className={classes.root}>
      <Typography variant="h4">Liquidity Pool</Typography>
      {token &&
        <div className={classes.liquidityDetails}>
          <div className={classes.detail}>
            <Typography variant="subtitle1">Token:</Typography>
            <Typography variant="body1">{`${token.name} (${token.symbol})`}</Typography>
          </div>
          <div className={classes.detail}>
            <Typography variant="subtitle1">Current Rate:</Typography>
            <Typography variant="body1">{`${Number(exchangeData.ratePerEth).toFixed(2)} ${token.symbol} / ETH`}</Typography>
          </div>
          <div className={classes.detail}>
            <Typography variant="subtitle1">Current Liquidity:</Typography>
            <Typography variant="body1">{`${exchangeData.totalEth} ETH`}</Typography>
          </div>
        </div>
      }
      <div className={classes.liquidityFooter}>
        <Typography variant="body1">Liquidity by Uniswap</Typography>
      </div>
    </div>
  );
};

export default TokenLiquidityBlock;
