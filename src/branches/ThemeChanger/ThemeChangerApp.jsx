import React from 'react';
import { compose } from 'recompose';

import { FormControl, MenuItem, Paper, Select } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { Consumer } from './context';
import FormWithState from '../FormWithState/FormWithState';

const flex = {
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-evenly',
};

const styles = (theme) => {

  // console.log('-****- theme', theme);

  return {
  root: {
    margin: `${theme.spacing(3)}px auto`,
    padding: theme.spacing(2),
    maxWidth: 400,
  },
  header: {
    ...flex,
    marginTop: theme.spacing(2),
  },
  form: {
    ...flex,
    marginBottom: theme.spacing(1),
  },
}};

const ThemeChangerApp = (props) => {
  const { classes } = props;

  return (
    <Consumer>
      {({ options, handleConfigVarChange, ...configVars }) => (
        <Paper className={classes.root}>
          <header className={classes.header}>
            {Object.entries(options).map(([variable, defaults]) => (
              <FormControl key={variable}>
                <Select name={variable} value={configVars[variable]} onChange={handleConfigVarChange(variable)}>
                  {defaults.map((value) => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ))}
          </header>

          <FormWithState />
        </Paper>
      )}
    </Consumer>
  );
};

export default compose(withStyles(styles))(ThemeChangerApp);
