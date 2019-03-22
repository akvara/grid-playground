import * as React from 'react';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import FormWithState from './FormWithState';
import { deepOrange } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: deepOrange,
  },
});

const FormWithStateRoot = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <FormWithState />
    </MuiThemeProvider>
  );
};

export default FormWithStateRoot;
