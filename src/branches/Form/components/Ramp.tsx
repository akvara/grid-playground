import * as React from 'react';
import classNames from 'classnames';
import { compose } from 'recompose';

import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import { border, transition } from '../../GridPlayground/style/theme/themeUtils';

export interface RampProps {
  color: string;
  onRampClick: (color: string) => void;
  isSelected: boolean;
}

export interface RampPrivateProps extends RampProps, WithStyles {}

const styles = () =>
  createStyles({
    ramp: {
      cursor: 'pointer',
      height: 25,
      width: 25,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: border('green'),
      transition: transition(100),
    },
    rampSelected: {
      boxShadow: 'grey',
      border: border('white'),
    },
  });

const Ramp: React.FunctionComponent<RampPrivateProps> = (props) => {
  const { classes, color, onRampClick, isSelected } = props;

  const rampClasses = classNames({
    [classes.ramp]: true,
    [classes[color]]: true,
    [classes.rampSelected]: isSelected,
  });

  return (
    <div
      className={rampClasses}
      style={{ color: color , backgroundColor: color }}
      onClick={() => onRampClick(color) }
    >
      {' '}
    </div>
  );
};

export default compose<RampPrivateProps, RampProps>(withStyles(styles))(Ramp);
