import { horizontal, onlyRight, onlyTop, vertical } from './themeUtils';

export const Color = {
  primary: {
    lightest: '#Eff9E9',
    light: '#C5F0B0',
    main: '#46bc01',
    dark: '#469d01',
    darkest: '#276700',
  },
  brand: {
    lightest: '#EBF0F4',
    main: '#007dc5',
    dark: '#1D598F',
    darkest: '#0a507c',
  },
  error: {
    lightest: '#fcdad9',
    main: '#f44336',
    dark: '#e50601',
  },
  warning: {
    lightest: '#fee4c9',
    light: '#ffc62f',
    main: '#f1a019',
  },
  grey: {
    lightest: '#F4F4F4',
    light: '#CCCCCC',
    default: '#666666',
    dark: '#4D4D4D',
    darkest: '#333333',
  },
  background: {
    body: '#EBF0F4',
    light: 'white',
    dark: 'black',
  },
  font: {
    light: 'white',
    dark: '#333333',
  },
};

export const Font = {
  // tslint:disable-next-line
  family: "'helvetica-neue', Arial, Helvetica, sans-serif",
  size: {
    small: 10,
    mediumSmall: 12,
    medium: 14,
    mediumBig: 16,
    big: 18,
    caption: 12,
    title: 22,
    heading: 35,
  },
  lineHeight: {
    small: 1,
    mediumSmall: 1.1,
    medium: 1.2,
    mediumBig: 1.67,
    big: 1.8,
  },
  weight: {
    light: 300,
    normal: 400,
    bold: 700,
  },
};

export const BorderRadius = {
  low: 2,
  default: 5,
  high: 100,
  onlyTop: onlyTop(5),
  onlyRight: onlyRight(5),
};

export const BoxShadow = {
  light: '0 2px 4px 0 rgba(0, 0, 0, 0.3)',
  default: '0 2px 2px 0 rgba(0, 0, 0, 0.12), 0 0 2px 0 rgba(0, 0, 0, 0.12)',
  dark: '0 0 0 1px #fff, 0 0 2px 4px #666',
};

export const Space = {
  margin: {
    smallest: 5,
    small: 10,
    default: 20,
    large: 30,
    largest: 50,
    horizontalDefault: horizontal(20),
    verticalDefault: vertical(20),
  },
  padding: {
    smallest: 5,
    small: 10,
    default: 20,
    large: 30,
    largest: 50,
    horizontalDefault: horizontal(20),
    verticalDefault: vertical(20),
  },
  layout: {
    fullWidth: 1440,
    partialWidth: 1024,
  },
};

export const Layout = {
  width: {
    full: 1440,
    partial: 920,
  },
  sidebar: {
    full: 320,
  },
  header: {
    topBar: 60,
    menu: 50,
  },
};
