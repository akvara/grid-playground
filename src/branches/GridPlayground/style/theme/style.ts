import { createMuiTheme } from '@material-ui/core/styles';
import { Theme, ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { BorderRadius, BoxShadow, Color, Font, Layout, Space } from './themeConf';
import { border } from './themeUtils';

export type CssFnValue = (val?: number) => number[];
export type CssValue = string | number | number[] | CssFnValue;

export interface CustomOptions {
  color: typeof Color & {
    input: {
      border: string;
      placeholder: string;
    };
  };
  common: {
    borderRadius: typeof BorderRadius & { [key: string]: CssValue };
    shadow: typeof BoxShadow & { [key: string]: CssValue };
  };
  font: typeof Font;
  space: typeof Space;
  layout: typeof Layout;
}

export interface MyThemeOptions extends ThemeOptions, CustomOptions {}

export interface MyTheme extends Theme, CustomOptions {}

const MyThemeOption: MyThemeOptions = {
  color: {
    primary: {
      lightest: Color.primary.lightest,
      light: Color.primary.light,
      main: Color.primary.main,
      dark: Color.primary.dark,
      darkest: Color.primary.darkest,
    },
    brand: {
      lightest: Color.brand.lightest,
      main: Color.brand.main,
      dark: Color.brand.dark,
      darkest: Color.brand.darkest,
    },
    error: {
      lightest: Color.error.lightest,
      main: Color.error.main,
      dark: Color.error.dark,
    },
    warning: {
      lightest: Color.warning.lightest,
      light: Color.warning.light,
      main: Color.warning.main,
    },
    grey: {
      lightest: Color.grey.lightest,
      light: Color.grey.light,
      default: Color.grey.default,
      dark: Color.grey.dark,
      darkest: Color.grey.darkest,
    },
    input: {
      placeholder: Color.grey.default,
      border: Color.grey.default,
    },
    background: {
      body: Color.background.body,
      light: Color.background.light,
      dark: Color.background.dark,
    },
    font: {
      dark: Color.font.dark,
      light: Color.font.light,
    },
  },
  font: {
    family: Font.family,
    size: {
      small: Font.size.small,
      mediumSmall: Font.size.mediumSmall,
      medium: Font.size.medium,
      mediumBig: Font.size.mediumBig,
      big: Font.size.big,
      caption: Font.size.caption,
      title: Font.size.title,
      heading: Font.size.heading,
    },
    lineHeight: {
      small: Font.lineHeight.small,
      mediumSmall: Font.lineHeight.mediumSmall,
      medium: Font.lineHeight.medium,
      mediumBig: Font.lineHeight.mediumBig,
      big: Font.lineHeight.big,
    },
    weight: {
      light: Font.weight.light,
      normal: Font.weight.normal,
      bold: Font.weight.bold,
    },
  },
  common: {
    borderRadius: {
      low: BorderRadius.low,
      default: BorderRadius.default,
      high: BorderRadius.high,
      onlyTop: BorderRadius.onlyTop,
      onlyRight: BorderRadius.onlyRight,
    },
    shadow: {
      light: BoxShadow.light,
      default: BoxShadow.default,
      dark: BoxShadow.dark,
    },
  },
  space: {
    layout: {
      fullWidth: Space.layout.fullWidth,
      partialWidth: Space.layout.partialWidth,
    },
    margin: {
      smallest: Space.margin.smallest,
      small: Space.margin.small,
      default: Space.margin.default,
      large: Space.margin.large,
      largest: Space.margin.largest,
      horizontalDefault: Space.margin.horizontalDefault,
      verticalDefault: Space.margin.verticalDefault,
    },
    padding: {
      smallest: Space.padding.smallest,
      small: Space.padding.small,
      default: Space.padding.default,
      large: Space.padding.large,
      largest: Space.padding.largest,
      horizontalDefault: Space.padding.horizontalDefault,
      verticalDefault: Space.padding.verticalDefault,
    },
  },
  layout: {
    width: {
      full: Layout.width.full,
      partial: Layout.width.partial,
    },
    sidebar: {
      full: Layout.sidebar.full,
    },
    header: {
      topBar: Layout.header.topBar,
      menu: Layout.header.menu,
    },
  },
};

function createMyTheme(options: MyThemeOptions) {
  return createMuiTheme({
    palette: {
      primary: {
        main: Color.primary.main, // - temp to check errors
        // main: '#21ff9e',
      },
      secondary: {
        main: Color.font.dark, // - temp to check errors
        // main: '#f0f',
      },
      text: {
        primary: '#000',
        secondary: '#fff',
      },
    },
    typography: {
      fontFamily: Font.family,
      h5: {
        fontSize: '1.25rem',
        lineHeight: '1.5',
      },
      subtitle1: {
        lineHeight: '1.25',
      },
      body1: {
        color: '#4a4a4a',
      },
      caption: {
        color: '#333',
        fontSize: '0.625rem',
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 500,
        color: 'black',
      },
    },
    overrides: {
      MuiInput: {
        underline: {
          '&:after, &:before': {
            borderBottom: border('currentColor'),
          },
          '&:hover:not($disabled):not($focused):not($error):before': {
            borderBottomColor: 'currentColor',
          },
        },
      },
      MuiFormHelperText: {
        root: {
          marginTop: 2,
          fontSize: '0.70rem',
          lineHeight: '0.9em',
        },
      },
      MuiFormLabel: {
        root: {
          color: Color.grey.light,
        },
        disabled: {
          color: Color.grey.light,
        },
        focused: {
          color: Color.font.dark,
        },
      },
      MuiInputLabel: {
        formControl: {
          color: Color.font.dark,
        },
      },
      MuiStepLabel: {
        root: {
          textTransform: 'uppercase',
        },
        label: {
          color: Color.font.dark,
        },
        completed: {
          '&:hover': {
            cursor: 'pointer',
            textDecoration: 'underline',
          },
        },
        active: {
          fontWeight: `${Font.weight.bold} !important`,
        },
        disabled: {
          color: Color.grey.light,
        },
      },
      MuiStepIcon: {
        root: {
          '& text': {
            fill: Color.font.light,
            fontSize: Font.size.mediumSmall,
            fontWeight: Font.weight.bold,
          },
        },
        completed: {
          color: `${Color.primary.main} !important`,
        },
        active: {
          color: `${Color.primary.main} !important`,
        },
      },
      MuiInputBase: {
        input: {
          padding: [7, 0, 2],
          fontSize: Font.size.mediumBig,
        },
      },
      MuiSelect: {
        select: {
          padding: [7, 0, 6],
        },
      },
    },
    ...(options as any),
  }) as MyTheme;
}

export const theme = createMyTheme(MyThemeOption);

export default theme;
