
import {
  createTheme,
  responsiveFontSizes,
  makeStyles,
} from '@material-ui/core/styles';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';

import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/blue';
import orange from '@material-ui/core/colors/orange';
import yellow from '@material-ui/core/colors/yellow';

/*
xs, extra-small: 0px
sm, small: 600px
md, medium: 960px
lg, large: 1280px
xl, extra-large: 1920px
*/

const breakpoints = createBreakpoints({});

let theme = createTheme({
  spacing: 8,
  typography: {
    fontFamily: [
      'Manrope',
      'Roboto',
      'Arial',
      'sans-serif',
      '-apple-system',
    ].join(','),
    fontSize: 2,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      lineHeight: '1',
      fontSize: '1.8em',
      fontWeight: 700,
      fontFamily: '"Manrope", "Roboto", "Arial", "sans-serif"',
      color: '#91919D',
    },
    h2: {
      lineHeight: '1.5',
      fontSize: '1.6em',
      fontWeight: 400,
      fontFamily: '"Manrope", "Roboto", "Arial", "sans-serif"',
      color: '#91919D',
    },
    h3: {
      lineHeight: '1.5',
      fontSize: '1.5em',
      fontWeight: 400,
      fontFamily: '"Manrope", "Roboto", "Arial", "sans-serif"',
      color: '91919D',
    },
    h4: {
      lineHeight: '1.5',
      fontSize: '1.5em',
      fontWeight: 700,
      fontFamily: '"Manrope", "Roboto", "Arial", "sans-serif"',
      color: '#001C32',
    },
    h5: {
      lineHeight: '1.5',
      fontSize: '1.4em',
      fontWeight: 400,
      fontFamily: '"Manrope", "Roboto", "Arial", "sans-serif"',
      color: '#AAAABE',
    },
    h6: {
      lineHeight: '1.5',
      fontSize: '1.4em',
      fontWeight: 400,
      fontFamily: '"Manrope", "Roboto", "Arial", "sans-serif"',
      color: '#001C32',
    },
    subtitle1: {
      lineHeight: '1.5',
      fontSize: '1em',
      fontWeight: 600,
      fontFamily: '"Manrope", "Roboto", "Arial", "sans-serif"',
      color: '#FFFFFF',
    },
    subtitle2: {
      lineHeight: '1.5',
      fontSize: '0.8em',
      fontWeight: 400,
      fontFamily: '"Manrope", "Roboto", "Arial", "sans-serif"',
      color: '#F0F0FA',
    },
    body1: {
      lineHeight: '1.5',
      fontSize: '1em',
      fontWeight: 400,
      fontFamily: '"Manrope", "Roboto", "Arial", "sans-serif"',
      color: '#001C32',
    },
    body2: {
      lineHeight: '1.5',
      fontSize: '1em',
      fontWeight: 400,
      fontFamily: '"Manrope", "Roboto", "Arial", "sans-serif"',
      color: '#91919D',
    },
    caption: {
      lineHeight: '1',
      fontSize: '0.8em',
      fontWeight: 600,
      fontFamily: '"Manrope", "Roboto", "Arial", "sans-serif"',
      color: '#F0F0FA',
    },
    button: {
      background: 'linear-gradient(#91919D, #91919D)',
      margin: 0,
      padding: 0,
      lineHeight: '1',
      minWidth: '100%',
      textTransform: 'none',
      fontSize: '1em',
      fontWeight: 500,
      fontFamily: '"Manrope", "Roboto", "Arial", "sans-serif"',
      color: '#001C32',
    },
  },
  palette: {
    type: 'dark',
    background: {
      default: '#edefef',
    },
    text: {
      primary: '#001C32',
      secondary: '#929396',
    },
    primary: {
      main: '#001C32',
    },
    secondary: {
      main: '#929396',
    },
    error: red,
    warning: orange,
    info: yellow,
    success: green,
  },
});

theme = responsiveFontSizes(theme);

const themeStyles = makeStyles({
  root: {
    'background': 'linear-gradient(#FAFAFF, #FAFAFF)',
    'height': '100vh',
    'width': '100%',
    'position': 'relative',
    '& .MuiInputBase-input': {
      border: '2px solid #C8C8D4',
      borderRadius: '10px',
      background: 'linear-gradient(#FFFFFF, #FFFFFF)',
      color: '#001C32',
      padding: theme.spacing(1),
    },
    '& .MuiInputBase-input:focus': {
      border: '2px solid #317AFF',
      borderRadius: '10px',
    },
    '& .MuiButton-root': {
      minWidth: '100%',
    },
  },
  header: {
    background: 'linear-gradient(#001C32, #001C32)',
    margin: 0,
    width: '100%',
    position: 'relative',
    height: '60px',
    [breakpoints.up('xs')]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    [breakpoints.up('lg')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  content: {
    background: 'white',
    margin: 0,
    position: 'absolute',
    overflow: 'auto',
    width: '100%',
    bottom: '100px',
    top: '60px',
    [breakpoints.up('xs')]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    [breakpoints.up('lg')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  active: {
    color: 'red',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(#001C32, #001C32)',
    margin: '0',
    height: '100px',
    width: '100%',
    position: 'absolute',
    bottom: '0',
    [breakpoints.up('xs')]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    [breakpoints.up('lg')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  select: {
    'border': '2px solid #C8C8D4',
    'borderRadius': '5px',
    'background': 'linear-gradient(#FFFFFF, #FFFFFF)',
    'color': '#001C32',
    'fontWeight': 400,
    'fontFamily': '"Manrope", "Roboto", "Arial", "sans-serif"',
    '&:hover': {
      border: '2px solid #001C32',
    },
    [breakpoints.up('xs')]: {
      lineHeight: '1.5',
      fontSize: '1em',
    },
    [breakpoints.up('lg')]: {
      lineHeight: '1.5',
      fontSize: '1em',
    },
  },
  helpIcon: {
    [breakpoints.up('xs')]: {
      display: 'flex',
      justifyContent: 'flex-start',
      height: '40px',
      width: '40px',
    },
  },
  contactIcon: {
    [breakpoints.up('xs')]: {
      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(2),
      display: 'flex',
      justifyContent: 'center',
      height: '40px',
      width: '40px',
    },
  },
  aboutIcon: {
    [breakpoints.up('xs')]: {
      display: 'flex',
      justifyContent: 'flex-end',
      height: '40px',
      width: '40px',
    },
  },
  footerIcon: {
    'color': '#FFFFFF',
    'fill': '#FFFFFF',
    '&:active': {
      color: '#317AFF',
      fill: '#317AFF',
    },
    [breakpoints.up('xs')]: {
      height: '35px',
      width: '35px',
    },
    [breakpoints.up('lg')]: {
      margin: 'auto',
      height: '30px',
      width: '30px',
    },
  },
  headerIcon: {
    [breakpoints.up('xs')]: {
      height: '50px',
      width: '50px',
    },
  },
  oddRow: {
    backgroundColor: '#F5F3F2',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  evenRow: {
    backgroundColor: '#FAFAFF',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  formSubmit: {
    paddingTop: theme.spacing(0.5),
    width: '100%',
  },
  formLabel: {
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
    color: '#AAAABE',
  },
  formError: {
    color: 'red',
    margin: 0,
    padding: 0,
  },
  formFields: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  formButton: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  pageSummary: {
    paddingTop: theme.spacing(1),
  },
  activeLink: {
    'color': '#317AFF',
    'textDecoration': 'none',
    '&:active': {
      textDecoration: 'none',
      fontWeight: 700,
    },
    '&:hover': {
      textDecoration: 'none',
      color: '#a1c8ff',
    },
  },
  inactiveLink: {
    'color': '#c7cdd7',
    'textDecoration': 'none',
    '&:active': {
      textDecoration: 'none',
      fontWeight: 900,
    },
    '&:hover': {
      textDecoration: 'none',
      color: '#a1c8ff',
    },
  },
  iconLink: {
    textDecoration: 'none',
  },
});

export {theme, themeStyles};
