import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DrizzleContext } from 'drizzle-react';

import {
  AppBar,
  Grid,
  Toolbar,
  Typography
} from '@material-ui/core';
// import { User as UserIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  accountWrapper: {},
  brandWrapper: {},
  root: {}
});

const Navbar = props => {
  const classes = useStyles(props);

  const { drizzleState, initialized } = useContext(DrizzleContext.Context);

  return (
    <AppBar position="static" color="primary" className={classes.root}>
      <Toolbar disableGutters>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item xs={6}>
            <div className={classes.brandWrapper}>
              <Link to="/">Vulcan Swap <span role="img" aria-label="vulcan-hand">🖖</span></Link>
            </div>
          </Grid>
          {initialized &&
            <Grid item xs={6}>
              <div className={classes.accountWrapper}>
                {/* <UserIcon /> */}
                <Typography variant="body1">{drizzleState.accounts[0]}</Typography>
              </div>
            </Grid>
          }
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
