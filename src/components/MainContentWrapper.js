import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Container } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
  root: {}
});

class MainContentWrapper extends Component {
  render() {
    const { children, classes } = this.props;

    return(
      <div className={classes.root}>
        <Container maxWidth="lg">{children}</Container>
      </div>
    );
  }
}

MainContentWrapper.propTypes = {
  children: PropTypes.node.isRequired
};

export default withStyles(styles)(MainContentWrapper);
