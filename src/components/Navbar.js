import React, { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { DrizzleContext } from 'drizzle-react';

import {
  AppBar,
  Box,
  Container,
  Grid,
  Link,
  Toolbar,
  Typography
} from '@material-ui/core';
import { Person as UserIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';

import { truncateStringMiddle } from '../utils';

const useStyles = makeStyles({
  accountWrapper: {
    textAlign: 'right'
  },
  brand: {
    fontWeight: 'bold',
    '& span': {
      fontSize: 28,
      verticalAlign: 'middle'
    }
  },
  brandWrapper: {

  },
  root: {
    boxShadow: 'none'
  },
  userIconWrapper: {
    marginRight: 5,
    '& svg': {
      verticalAlign: 'middle'
    }
  }
});

const Navbar = props => {
  const classes = useStyles(props);

  const { drizzleState, initialized } = useContext(DrizzleContext.Context);

  const renderAccountBlock = () => {
    if (!initialized) return null;

    const truncEthAddress = truncateStringMiddle(drizzleState.accounts[0], 6, 2);
    return (
      <Grid item xs={6}>
        <Box className={classes.accountWrapper} display="flex" alignItems="center" justifyContent="flex-end">
          <Box className={classes.userIconWrapper}>
            <UserIcon />
          </Box>
          <Box>
            <Typography variant="body1">{truncEthAddress}</Typography>
          </Box>
        </Box>
      </Grid>
    );
  };


  return (
    <AppBar position="static" color="inherit" className={classes.root}>
      <Container maxWidth="lg">

        <Toolbar disableGutters>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item xs={6}>
              <div className={classes.brandWrapper}>
                <Link
                  className={classes.brand}
                  color="primary"
                  component={RouterLink}
                  to="/"
                  underline="none"
                  variant="h5"
                >
                  Vulcan Swap <span role="img" aria-label="vulcan-hand">🖖</span>
                </Link>
              </div>
            </Grid>
            {renderAccountBlock()}
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
