import * as React from 'react';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import VitaneleForm from './VitaneleForm';
import { deepOrange } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: deepOrange,
  },
});

const VitaneleFormRoot = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <VitaneleForm />
    </MuiThemeProvider>
  );
};

export default VitaneleFormRoot;
