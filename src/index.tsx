import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';

import ThemeChangerRoot from './branches/ThemeChanger';
// import GridPlayground from './branches/GridPlayground/GridPlayground';
// import FormWithState from './branches/FormWithState';
// import VitaneleForm from './branches/VitaneleForm';

ReactDOM.render(
  // <GridPlayground />,
  // <FormWithState />,
  // <VitaneleForm />,
  <ThemeChangerRoot />,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
