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
      fontSize: '1em',
      fontWeight: 700,
      fontFamily: '"Manrope", "Roboto", "Arial", "sans-serif"',
      color: '#91919D',
    },
    h2: {
      lineHeight: '2',
      fontSize: '1.6em',
      fontWeight: 700,
      fontFamily: '"Manrope", "Roboto", "Arial", "sans-serif"',
      color: '#001C32',
    },
    h3: {
      lineHeight: '1.5',
      fontSize: '1.4em',
      fontWeight: 700,
      fontFamily: '"Manrope", "Roboto", "Arial", "sans-serif"',
      color: '#001C32',
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
      fontSize: '1.3em',
      fontWeight: 700,
      fontFamily: '"Manrope", "Roboto", "Arial", "sans-serif"',
      color: '#001C32',
    },
    h6: {
      lineHeight: '1.5',
      fontSize: '1.2em',
      fontWeight: 700,
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
      fontWeight: 700,
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
      main: '#317AFF',
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
    'background': 'linear-gradient(#F0F0FA, #F0F0FA)',
    'height': '100vh',
    'width': '100%',
    'position': 'relative',
    '& .MuiInput-root': {
      border: '1px solid #C8C8D4',
      borderRadius: '10px',
      background: 'linear-gradient(#FFFFFF, #FFFFFF)',
      color: '#001C32',
      padding: theme.spacing(1),
      marginBottom: theme.spacing(0.3),
    },
    '& .MuiOutlinedInput-root': {
      border: '1px solid #C8C8D4',
      borderRadius: '20px',
      background: 'linear-gradient(#FFFFFF, #FFFFFF)',
      color: '#001C32',
      marginBottom: theme.spacing(0.3),
    },
    '& .MuiButton-root': {
      minWidth: '100%',
      background: 'linear-gradient(#317AFF, #317AFF)',
    },
    '& .MuiIconButton-root': {
      padding: theme.spacing(0.5),
    },
    '& .MuiButton-label': {
      lineHeight: '1',
      fontSize: '1em',
      fontWeight: 700,
    },
    '& .MuiPaper-rounded': {
      borderRadius: '20px',
      backgroundColor: 'white',
    },
    '& .MuiAvatar-root': {
      marginTop: theme.spacing(1),
      [breakpoints.up('xs')]: {
        height: '35px',
        width: '35px',
      },
      [breakpoints.up('lg')]: {
        height: '60px',
        width: '60px',
      },
    },
    '& .MuiPaper-elevation5': {
      boxShadow: '0 3px 10px rgb(00, 00, 00, 0.084)',
    },
  },
  header: {
    background: 'linear-gradient(#001C32, #001C32)',
    width: '100%',
    position: 'relative',
    height: '70px',
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
    'background': 'linear-gradient(#F0F0FA, #F0F0FA)',
    'position': 'absolute',
    'overflow': 'auto',
    'width': '100%',
    'bottom': '90px',
    'top': '80px',
    [breakpoints.up('xs')]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    [breakpoints.up('lg')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(#001C32, #001C32)',
    margin: '0',
    height: '90px',
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
  fullscreenChart: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(2),
    width: '100%',
    height: '720px',
  },
  dashboardToken: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(4),
    marginRight: theme.spacing(2),
    width: '100%',
    height: '300px',
  },
  dashboardStatus: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(4),
    marginLeft: theme.spacing(2),
    width: '100%',
    height: '300px',
  },
  dashboardChartLeft: {
    marginBottom: theme.spacing(4),
    marginRight: theme.spacing(2),
    width: '100%',
    height: '400px',
  },
  dashboardChartRight: {
    marginBottom: theme.spacing(4),
    marginLeft: theme.spacing(2),
    width: '100%',
    height: '400px',
  },
  urlForm: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    width: '100%',
  },
  triggerForm: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    width: '100%',
  },
  sortIcon: {
    [breakpoints.up('xs')]: {
      height: '20px',
      width: '20px',
    },
    [breakpoints.up('md')]: {
      height: '25px',
      width: '25px',
    },
  },
  modalSub: {
    [breakpoints.up('xs')]: {
      backgroundColor: theme.palette.background.default,
      boxShadow: theme.shadows[3],
      padding: theme.spacing(1),
      borderRadius: '10px',
      outline: 'none',
      width: '30%',
    },
  },
  showModalSub: {
    [breakpoints.up('xs')]: {
      backgroundColor: theme.palette.background.default,
      boxShadow: theme.shadows[3],
      padding: theme.spacing(1),
      borderRadius: '10px',
      outline: 'none',
      width: '30%',
    },
  },
  cmdSelect: {
    '& ul': {
      backgroundColor: '#FFFFFF',
    },
  },
  modalSubIcons: {
    textAlign: 'center',
  },
  active: {
    color: 'red',
  },
  buttonDisabled: {
    backgroundColor: '#EEEEEE',
  },
  statusIcon: {
    height: '20px',
  },
  searchClearIcon: {
    height: '15px',
  },
  searchIcon: {
    height: '20px',
    marginLeft: theme.spacing(1),
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
    'fill': '#C8C8D4',
    '&:active': {
      fill: '#317AFF',
    },
    [breakpoints.up('xs')]: {
      height: '35px',
      width: '35px',
    },
    [breakpoints.up('lg')]: {
      margin: 'auto',
      height: '40px',
      width: '40px',
    },
  },
  activeFooterIcon: {
    'fill': '#317AFF',
    '&:active': {
      fill: '#C8C8D4',
    },
    [breakpoints.up('xs')]: {
      height: '35px',
      width: '35px',
    },
    [breakpoints.up('lg')]: {
      margin: 'auto',
      height: '40px',
      width: '40px',
    },
  },
  chartTitle: {
    marginBottom: theme.spacing(2),
  },
  chartIcon: {
    [breakpoints.up('xs')]: {
      height: '30px',
    },
  },
  minimaIcon: {
    [breakpoints.up('xs')]: {
      height: '40px',
    },
  },
  megIcon: {
    [breakpoints.up('xs')]: {
      height: '40px',
    },
  },
  pageIcon: {
    [breakpoints.up('xs')]: {
      height: '40px',
      width: '40px',
    },
  },
  deleteIcon: {
    [breakpoints.up('xs')]: {
      height: '30px',
      width: '30px',
    },
  },
  pageButton: {
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
    color: '#AAAABE',
  },
  oddRow: {
    backgroundColor: '#FAFAFF',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  evenRow: {
    backgroundColor: '#F5F3F2',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  row: {
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
    color: '#001C32',
    fontWeight: 400,
  },
  formEntry: {
    paddingTop: theme.spacing(1),
  },
  formError: {
    color: 'red',
    margin: 0,
    padding: 0,
  },
  formButton: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    lineHeight: '1',
    fontSize: '1.4em',
    fontWeight: 700,
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
