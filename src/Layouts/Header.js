import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { compose } from 'recompose';

const Header = (props) => (
  <Typography variant="body1" align="center" gutterBottom>
    Header
  </Typography>
);
export default compose()(Header);
