import React from 'react';
import ReactDOM from 'react-dom';

import { Drizzle, generateStore } from "drizzle";
import { DrizzleContext } from "drizzle-react";
import drizzleOptions from "./drizzleOptions";

import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

import theme from './theme';

import AppContainer from './containers/AppContainer';

const drizzleStore = generateStore(drizzleOptions);
const drizzle = new Drizzle(drizzleOptions, drizzleStore);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <DrizzleContext.Provider drizzle={drizzle}>
      <CssBaseline />
      <AppContainer />
    </DrizzleContext.Provider>
  </ThemeProvider>,
  document.getElementById('root')
);
