import React, { useContext } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { DrizzleContext } from 'drizzle-react';

import { makeStyles } from '@material-ui/styles';

// import AdminPage from '../containers/AdminPage';
import CostAverageOrderBookPage from '../containers/CostAverageOrderBookPage';
import useAddContracts from '../effects/useAddContracts';
import FooterBlock from './FooterBlock';
import Navbar from './Navbar';

const useStyles = makeStyles({
  root: {}
});

const App = props => {
  const classes = useStyles(props);
  const { initialized, drizzle } = useContext(DrizzleContext.Context);

  const contractsInitialized = useAddContracts(initialized, drizzle);

  return (
    <div className={classes.root}>
      <Router>
        <Navbar />
        <Route
          path='/'
          exact
          render={props => (
            <CostAverageOrderBookPage
              contractsInitialized={contractsInitialized}
            />
          )}
        />
        {/* <Route */}
        {/*   path='/admin' */}
        {/*   exact */}
        {/*   component={AdminPage} */}
        {/* /> */}
        <FooterBlock />
      </Router>
    </div>
  );
}

export default App;
