import React, { Component } from "react";
import PropTypes from "prop-types";

import { Container, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
  root: {}
});

class TitleWrapper extends Component {
  render() {
    const { children, classes } = this.props;
    return(
      <div className={classes.root}>
        <Container maxWidth="md">
          <Typography variant="h1">{children}</Typography>
        </Container>
      </div>
    );
  }
}

TitleWrapper.propTypes = {
  children: PropTypes.string,
};

export default withStyles(styles)(TitleWrapper);
