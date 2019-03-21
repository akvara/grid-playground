import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { compose } from 'recompose';

const Footer = (props) => (
  <Typography variant="display1" align="center" gutterBottom>
    Footer
  </Typography>
);

export default compose()(Footer);
