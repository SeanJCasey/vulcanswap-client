import React from 'react';

import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    marginTop: 24
  }
})

const TempLoadingBlock = props => {
  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      <Container>
        <Typography variant="h5">Loading... make sure that you're on <strong>Rinkeby</strong> if you want to "Go long, and prosper" 🚀</Typography>
      </Container>
    </div>
  );
}

export default TempLoadingBlock;
