import React from 'react';

import { Container, Link, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { BLUE_LIGHT2, GRAY_LIGHT4, GRAY_LIGHT1 } from '../theme/colors';

const useStyles = makeStyles({
  authorLink: {
    color: BLUE_LIGHT2
  },
  copyrightText: {
    color: GRAY_LIGHT1
  },
  root: {
    borderTop: `solid 1px ${GRAY_LIGHT4}`,
    marginTop: 64,
    padding: "24px 0"
  }
})

const FooterBlock = props => {
  const classes = useStyles(props);
  const authorLink = (
    <Link
      className={classes.authorLink}
      underline="none"
      href="http://seanjcasey.com/"
      target="_blank"
    >
      @SeanJCasey
    </Link>
  );

  return (
    <div className={classes.root}>
      <Container>
        <Typography
          className={classes.copyrightText}
          variant="subtitle1"
        >
          A Polyvalent Solutions (LLC) solution by {authorLink}
        </Typography>
      </Container>
    </div>
  );
}

export default FooterBlock;
