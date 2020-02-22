import React from 'react';

import GridPlayground from './branches/GridPlayground/GridPlayground';
import VitaneleForm from './branches/VitaneleFormNew';
import ThemeChangerApp from './branches/ThemeChanger/ThemeChangerRoot';
import { Button, Grid, Paper, withStyles } from '@material-ui/core';
import { compose } from 'recompose';

const styles = (theme: any) => {
  return {
    root: {
      margin: `${theme.spacing(3)}px auto`,
      padding: theme.spacing(2),
      maxWidth: 400,
    },
    button: {
      padding: theme.spacing(2),
    }
  };
};

enum Selections {
  Vitanele = 'Vitanele',
  ThemeChanger = 'ThemeChanger',
  GridPlayground = 'GridPlayground',
}

const matrix = {
  [Selections.Vitanele]: <VitaneleForm />,
  [Selections.ThemeChanger]: <ThemeChangerApp />,
  [Selections.GridPlayground]: <GridPlayground />,
};

const Switcher = ({ classes }: any) => {
  const [selection, setSelection] = React.useState(null);

  if (!selection) {
    return (
      <Paper className={classes.root}>
        <Grid container direction={'column'}>
          {Object.keys(Selections).map((sel: any, idx: number) => (
            <Grid key={idx} item className={classes.button}>
              <Button type="submit" color="primary" variant="contained" onClick={() => setSelection(sel)}>
                {sel}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Paper>
    );
  }
  return matrix[selection!];
};

export default compose(withStyles(styles))(Switcher);
