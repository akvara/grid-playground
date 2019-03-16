import * as React from 'react';
import { compose } from 'recompose';
import { createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import ListItem from './TickerDisplay';
import { bourses, tickers } from './config/tickers';
import { Grid } from '@material-ui/core';
import TickerDisplay from './TickerDisplay';

export interface AppProps {}

interface AppPrivateProps extends AppProps, WithStyles {}

const styles = () =>
  createStyles({
    '@global': {
      '*': {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
      },
      body: {
        backgroundColor: '#282c34',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 'calc(8px + 2vmin)',
        color: 'white',
      },
      a: {
        textDecoration: 'none',
      },
      html: {
        height: '100%',
      },
      // body: {
      //   color: theme.color.font.dark,
      //   fontFamily: theme.font.family,
      //   backgroundColor: theme.color.grey.lightest,
      //   minWidth: 1024,
      //   height: '100%',
      //   margin: 0,
      // },
    } as any,
    mainContainer: {
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'hidden',
      height: '100%',
      margin: '80px',
    },
  });

const App: React.FunctionComponent<AppPrivateProps> = (props) => {
  const { classes } = props;
  return (
    <div>
      <div className={classes.mainContainer}>
        <Grid container direction="row">
          {bourses.map((bourse, bidx) => (
            <Grid item>
              <Grid container direction="column">
                {tickers
                  .filter((ticker) => ticker.substr(-1) === bourse)
                  .sort()
                  .map((ticker, tidx) => (
                    <Grid key={tidx} item>
                      {<TickerDisplay ticker={ticker.substr(0, 3)} />}
                    </Grid>
                  ))}
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Grid container direction="column">
          {/*<Grid item>*/}
            <TickerDisplay ticker="FIN" label="INVL Asset Management" />
          {/*</Grid>*/}
          <Grid item>
            <TickerDisplay ticker="" label="All" />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default compose<AppPrivateProps, AppProps>(withStyles(styles))(App);
