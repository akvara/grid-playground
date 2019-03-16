import * as React from 'react';
import moment from 'moment';
import { nasdaq } from './config/constants';
import { compose } from 'recompose';
import { createStyles, WithStyles, withStyles } from '@material-ui/core';

export interface ListItemProps {
  ticker: string;
  label?: string;
}

interface ListItemPrivateProps extends ListItemProps, WithStyles {}

const styles = () =>
  createStyles({
    appLink: {
      color: '#61dafb',
      margin: '40px',
    },
  });

const TickerDisplay: React.FunctionComponent<ListItemPrivateProps> = (props) => {
  const { ticker, label, classes } = props;
  const from = moment()
    .subtract(nasdaq.before.amount, 'month')
    .format(nasdaq.dateFormat);

  const to = moment().format(nasdaq.dateFormat);
  const link = `https://www.nasdaqbaltic.com/market/?issuer=${ticker}&market=&legal%5B%5D=main&legal%5B%5D=firstnorth&start=${from}&end=${to}&keyword=&pg=news&lang=lt`;
  return (
    <a className={classes.appLink} href={link} target="_blank" rel="noopener noreferrer">
      {label? label : ticker}
    </a>
  );
};

export default compose<ListItemPrivateProps, ListItemProps>(withStyles(styles))(TickerDisplay);
