import * as React from 'react';
import { compose } from 'recompose';
import { createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import Colors from './components/Colors';
import Numbers from './components/Numbers';

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
        // backgroundColor: 'white',
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
    },
    appContainer: { display: 'flex', height: '100%' },
  });

const App: React.FunctionComponent<AppPrivateProps> = (props) => {
  const { classes } = props;
  return (
    <div className={classes.appContainer}>
      {/*<Colors />*/}
      <Numbers/>
    </div>
  );
};

export default compose<AppPrivateProps, AppProps>(withStyles(styles))(App);
