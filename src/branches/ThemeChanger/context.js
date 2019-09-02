import { createContext } from 'react';
import { colors } from '../../config/constants'

export const defaultContext = {
  color: 'blue',
  type: 'light',
  spacing: 8,
  options: {
    color: colors,
    type: ['light', 'dark'],
    spacing: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
  handleConfigVarChange: () => {},
};

export const { Provider, Consumer } = createContext(defaultContext);
