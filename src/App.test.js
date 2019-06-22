import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import { Drizzle, generateStore } from "drizzle";
import { DrizzleContext } from "drizzle-react";
import drizzleOptions from "./drizzleOptions";

import App from './containers/App';

const drizzleStore = generateStore(drizzleOptions);
const drizzle = new Drizzle(drizzleOptions, drizzleStore);

describe('App', () => {
  const drizzleWrappedComponent =
    (<DrizzleContext.Provider drizzle={drizzle}>
      <App />
    </DrizzleContext.Provider>);

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(drizzleWrappedComponent, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(drizzleWrappedComponent);
    const tree = component.toJSON();
    console.log(tree)
    expect(tree).toMatchSnapshot();
  });
});

// TODO: End-to-End test
// Create an order and click vulcanize, want to see specific result (mouse on click vulcanize)
// - Order added to active orders table?
