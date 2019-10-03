import React from "react";

import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import spaceBackground from '../assets/space-background.jpg';
import { BLUE_LIGHT3, WHITE } from '../theme/colors';

const useStyles = makeStyles({
  root: {
    backgroundImage: `url(${spaceBackground})`,
    backgroundSize: "cover",
    height: 300,
    paddingTop: 40,
    textAlign: "center"
  },
  subtitle: {
    color: BLUE_LIGHT3
  },
  title: {
    color: WHITE,
    marginBottom: 10
  }
});

const OrderBookPageMasthead = props => {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <Typography
        className={classes.title}
        component="h1"
        variant="h2"
      >
        Go long and prosper
      </Typography>
      <Typography
        className={classes.subtitle}
        variant="body1"
      >
        Highly logical, emotion-free, decentralized cost averaging
      </Typography>
    </div>
  );
}

export default OrderBookPageMasthead;
