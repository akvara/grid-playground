import * as React from 'react';
import { compose } from 'recompose';
import { createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import Ramp from './Ramp';
import { colors } from '../../../config/constants';

export interface ColorsProps {}

interface ColorsPrivateProps extends ColorsProps, WithStyles {}

const styles = () =>
  createStyles({
    mainContainer: {
      margin: '80px',
      width: 100,
    },
  });

const Colors: React.FunctionComponent<ColorsPrivateProps> = (props) => {
  const { classes } = props;
  return (
    <div>
      <div className={classes.mainContainer}>
        <Grid
          container
          direction="row"
          spacing={8}
          alignContent="center"
          justify="space-between"
          className={classes.rampWrapper}
        >
          {colors.map((color) => (
            <Grid item xs={3}>
              <Ramp color={color} isSelected={false} onRampClick={() => alert('Click!')} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default compose<ColorsPrivateProps, ColorsProps>(withStyles(styles))(Colors);
