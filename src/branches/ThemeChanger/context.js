import { createContext } from 'react';
import { colors } from '../../config/constants'

export const defaultContext = {
  color: 'blue',
  type: 'light',
  unit: 8,
  options: {
    color: colors,
    type: ['light', 'dark'],
    unit: [6, 8, 12, 14, 16],
  },
  handleConfigVarChange: () => {},
};

export const { Provider, Consumer } = createContext(defaultContext);
