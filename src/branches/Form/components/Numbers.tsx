import * as React from 'react';
import { compose } from 'recompose';
import { createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

export interface NumbersProps {}

interface NumbersPrivateProps extends NumbersProps, WithStyles {}

const styles = () =>
  createStyles({
    mainContainer: {
      margin: '80px',
      width: 100,
    },
  });

const Numbers: React.FunctionComponent<NumbersPrivateProps> = (props) => {
  const { classes } = props;
  return (
    <div>
      <div className={classes.mainContainer}>
        <Grid container direction="row" alignContent="center" justify="space-between">
          {Array.from(Array(2).keys()).map((number1) => (
            <>
              {Array.from(Array(3).keys()).map((number2) => (
                <Grid item >
                  {`${number1}${number2}`}
                </Grid>
              ))}
            </>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default compose<NumbersPrivateProps, NumbersProps>(withStyles(styles))(Numbers);
