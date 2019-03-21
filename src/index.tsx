import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';


import Form from './branches/Form/Form';
import GridPlayground from './branches/GridPlayground/GridPlayground';


const theme = createMuiTheme({
  palette: {
    primary: deepOrange,
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Form />
    {/*<GridPlayground />*/}
  </MuiThemeProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
