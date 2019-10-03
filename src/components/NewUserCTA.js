import React from 'react';

import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    marginTop: 64,
    textAlign: 'center'
  },
  textBlock: {
    marginBottom: 32
  }
})

const NewUserCTA = props => {
  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      <Typography
        className={classes.textBlock}
        variant="h2"
      >
        Welcome fellow logician! <span role="img" aria-label="nerd face">🤓</span>
      </Typography>
      <Typography
        className={classes.textBlock}
        variant="h3"
      >
        Try placing some cost average orders <span role="img" aria-label="pointing upward">☝️</span>
      </Typography>
      <Typography
        className={classes.textBlock}
        variant="h4"
      >
        (It's just Rinkeby money <span role="img" aria-label="money face">🤑</span>)
      </Typography>
    </div>
  );
}

export default NewUserCTA;
