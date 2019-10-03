import { createMuiTheme } from "@material-ui/core/styles";

import {
  BLUE_DARK4,
  BLUE_LIGHT1,
  BLUE_LIGHT5,
  COLOR_PRIMARY,
  COLOR_SECONDARY,
  GRAY_DARK4,
  YELLOW,
  YELLOW_DARK5
} from './colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: COLOR_PRIMARY,
      // dark: PURPLE_DARK
    },
    secondary: {
      main: COLOR_SECONDARY
    },
    text: {
      primary: GRAY_DARK4
    }
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    body1: {
      lineHeight: "20px"
    },
    button: {
      fontWeight: 'bold',
      lineHeight: "20px"
    },
    h1: {
      fontSize: 48,
      lineHeight: "36px",
      fontWeight: "bold"
    },
    h2: {
      fontSize: 36,
      lineHeight: "36px",
      fontWeight: "bold"
    },
    h3: {
      fontSize: 28,
      lineHeight: "36px",
      fontWeight: "bold"
    },
    h4: {
      fontSize: 24,
      lineHeight: "28px",
      fontWeight: "bold"
    },
    h5: {
      fontSize: 20,
      lineHeight: "24px"
    },
    h6: {
      fontSize: 16,
      lineHeight: "24px"
    },
    subtitle1: {
      fontSize: 12,
      fontWeight: 'bold',
      lineHeight: "16px"
    },
    subtitle2: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: '20px'
    },
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 5,
        padding: '7px 14px',
        textTransform: 'none'
      },
      outlined: {
        backgroundColor: BLUE_LIGHT5,
        borderColor: BLUE_LIGHT1,
        color: BLUE_DARK4,
        // padding: '12px'
      },
      contained: {
        backgroundColor: YELLOW,
        border: 0,
        color: YELLOW_DARK5,
        '&:hover': {
          backgroundColor: YELLOW
        }
      }
    },
  //   MuiTextField: {
  //     root: {
  //       color: ONYX_DARKEST,
  //       fontSize: 16,
  //       lineHeight: '24px',
  //       '& label': {
  //         color: ONYX_DARKEST,
  //         fontWeight: 'bold',
  //         position: 'relative',
  //         textAlign: 'left',
  //         '& + .MuiInput-formControl': {
  //           margin: 0
  //         },
  //         '& span': {
  //           color: ONYX_LIGHT,
  //           fontSize: '12px',
  //           fontWeight: '400'
  //         }
  //       }
  //     }
    // }
  }
});

export default theme;
