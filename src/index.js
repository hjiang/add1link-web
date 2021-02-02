/* eslint-disable import/default */

import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
// import './styles/styles.scss';
import 'semantic-ui-css/semantic.min.css';
require('./favicon.ico'); // Tell webpack to load favicon.ico

render(
  <App />,
  document.getElementById('app')
);
