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

const styles = ({ spacing: { unit } }) => ({
  root: {
    margin: `${unit * 3}px auto`,
    padding: unit * 2,
    maxWidth: 400,
  },
  header: {
    ...flex,
    marginTop: unit * 2,
  },
  form: {
    ...flex,
    marginBottom: unit,
  },
});

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
