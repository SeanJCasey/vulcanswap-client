import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { makeStyles } from '@material-ui/styles';

import Navbar from './Navbar';
// import AdminPage from '../containers/AdminPage';
import CostAverageOrderBookPage from '../containers/CostAverageOrderBookPage';

const useStyles = makeStyles({
  root: {}
});

const App = props => {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <Router>
        <Navbar />
        <Route
          path='/'
          exact
          component={CostAverageOrderBookPage}
        />
        {/* <Route */}
        {/*   path='/admin' */}
        {/*   exact */}
        {/*   component={AdminPage} */}
        {/* /> */}
      </Router>
    </div>
  );
}

export default App;
