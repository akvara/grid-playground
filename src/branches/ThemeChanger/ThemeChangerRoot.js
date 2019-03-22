import React, { Component } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import * as colors from '@material-ui/core/colors';
import { defaultContext, Provider } from './context';
import ThemeChangerApp from './ThemeChangerApp';

export default class AppProvider extends Component {
  state = defaultContext;

  handleConfigVarChange = (name) => ({ target: { value } }) =>
    this.setState({
      [name]: value,
    });

  render() {
    const {
      state,
      state: { type, color, unit },
      handleConfigVarChange,
    } = this;

    const theme = createMuiTheme({
      palette: {
        type,
        primary: colors[color],
      },
      spacing: {
        unit,
      },
    });

    return (
      <Provider
        value={{
          ...state,
          handleConfigVarChange,
        }}
      >
        <MuiThemeProvider theme={theme}>
          <ThemeChangerApp />
        </MuiThemeProvider>
      </Provider>
    );
  }
}
