import React from 'react'

import { createMuiTheme, responsiveFontSizes, makeStyles } from '@material-ui/core/styles'
import createBreakpoints from '@material-ui/core/styles/createBreakpoints'

import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import red from '@material-ui/core/colors/red'
import blue from '@material-ui/core/colors/blue'
import green from '@material-ui/core/colors/blue'
import indigo from '@material-ui/core/colors/indigo'
import orange from '@material-ui/core/colors/orange'
import yellow from '@material-ui/core/colors/yellow'

/*
xs, extra-small: 0px
sm, small: 600px
md, medium: 960px
lg, large: 1280px
xl, extra-large: 1920px
*/

const breakpoints = createBreakpoints({})

let theme = createMuiTheme ({
  spacing: 8,
  typography: {
    fontFamily: [
      'Manrope',
      'Roboto',
      'Arial',
      'sans-serif',
      '-apple-system',
    ].join(','),
    fontSize: 1,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      lineHeight: "1.5",
      fontWeight: 700,
      fontFamily: "\"Manrope\", \"Roboto\", \"Arial\", \"sans-serif\"",
      color: '#FFFFFF',
      [breakpoints.up('xs')]: {
        fontSize:  "3em"
      },
      [breakpoints.up('lg')]: {
        fontSize:  "1.5em"
      }
    },
    h2: {
      fontWeight: 400,
      fontFamily: "\"Manrope\", \"Roboto\", \"Arial\", \"sans-serif\"",
      color: '#001C32',
      [breakpoints.up('xs')]: {
        lineHeight: "1.5",
        fontSize:  "2.2em"
      },
      [breakpoints.up('lg')]: {
        lineHeight: "1.5",
        fontSize:  "1.4em"
      }
    },
    h3: {
      fontWeight: 400,
      fontFamily: "\"Manrope\", \"Roboto\", \"Arial\", \"sans-serif\"",
      color: 'red',
      [breakpoints.up('xs')]: {
        lineHeight: "1.5",
        fontSize:  "2.2em"
      },
      [breakpoints.up('lg')]: {
        lineHeight: "1.5",
        fontSize:  "1.2em"
      }
    },
    h4: {
      fontWeight: 400,
      fontFamily: "\"Manrope\", \"Roboto\", \"Arial\", \"sans-serif\"",
      color: '#FFFFFF',
      [breakpoints.up('xs')]: {
        lineHeight: "1.5",
        fontSize:  "2.2em"
      },
      [breakpoints.up('lg')]: {
        lineHeight: "1.5",
        fontSize:  "1.2em"
      }
    },
    h5: {
      fontWeight: 400,
      fontFamily: "\"Manrope\", \"Roboto\", \"Arial\", \"sans-serif\"",
      color: '#AAAABE',
      [breakpoints.up('xs')]: {
        lineHeight: "1.5",
        fontSize:  "1.4em"
      },
      [breakpoints.up('lg')]: {
        lineHeight: "1.5",
        fontSize:  "1em"
      }
    },
    h6: {
      fontWeight: 400,
      fontFamily: "\"Manrope\", \"Roboto\", \"Arial\", \"sans-serif\"",
      color: '#FFFFFF',
      [breakpoints.up('xs')]: {
        lineHeight: "1.5",
        fontSize: "1.3em"
      },
      [breakpoints.up('lg')]: {
        lineHeight: "1.5",
        fontSize: "1em"
      }
    },
    subtitle1: {
      lineHeight: "1.5",
      fontSize: "1em",
      fontWeight: 600,
      fontFamily: "\"Manrope\", \"Roboto\", \"Arial\", \"sans-serif\"",
      color: '#FFFFFF'
    },
    subtitle2: {
      lineHeight: "1.5",
      fontSize: "0.8em",
      fontWeight: 400,
      fontFamily: "\"Manrope\", \"Roboto\", \"Arial\", \"sans-serif\"",
      color: '#F0F0FA'
    },
    body1: {
      fontWeight: 400,
      fontFamily: "\"Manrope\", \"Roboto\", \"Arial\", \"sans-serif\"",
      color: '#001C32',
      [breakpoints.up('xs')]: {
        lineHeight: "1.5",
        fontSize: "1.4em"
      },
      [breakpoints.up('lg')]: {
        lineHeight: "1.5",
        fontSize: "1em"
      }
    },
    body2: {
      fontWeight: 400,
      fontFamily: "\"Manrope\", \"Roboto\", \"Arial\", \"sans-serif\"",
      color: '#001C32',
      [breakpoints.up('xs')]: {
        lineHeight: "1.5",
        fontSize: "1.4em"
      },
      [breakpoints.up('lg')]: {
        lineHeight: "1.5",
        fontSize: "1em"
      }
    },
    caption: {
      fontWeight: 600,
      fontFamily: "\"Manrope\", \"Roboto\", \"Arial\", \"sans-serif\"",
      color: '#F0F0FA',
      [breakpoints.up('xs')]: {
        lineHeight: "1.5",
        fontSize: "1.1em"
      },
      [breakpoints.up('lg')]: {
        lineHeight: "1.5",
        fontSize: "0.7em"
      }
    },
    button: {
      display: "flex",
      justifyContent: "center",
      textTransform: "none",
      lineHeight: "1",
      borderRadius: 0,
      fontSize: "1.1em",
      fontWeight: 500,
      fontFamily: "\"Manrope\", \"Roboto\", \"Arial\", \"sans-serif\"",
      color: '#001C32',
      width: '100%',
      background: 'linear-gradient(#317AFF, #317AFF)',
      '&:hover': {
        background: 'linear-gradient(#346FE6, #346FE6)'
      }
    }
  },
  palette: {
    type: 'dark',
    background: {
      default: '#edefef',
    },
    text: {
      primary: "#001C32",
      secondary: "#929396"
    },
    primary: {
      main: '#001C32'
    },
    secondary: {
      main: '#929396'
    },
    error: red,
    warning: orange,
    info: yellow,
    success: green,
  }
})

theme = responsiveFontSizes(theme)

const themeStyles = makeStyles({
  root: {
    padding: "0",
    margin: "0",
    background: 'linear-gradient(#FAFAFF, #FAFAFF)',
    height: "100vh",
    position: 'relative',
    "& .MuiInputBase-input": {
      border: '2px solid #C8C8D4',
      borderRadius: '5px',
      background: 'linear-gradient(#FFFFFF, #FFFFFF)',
      color: "#001C32",
      padding: theme.spacing(1)
    },
    "& .MuiInputBase-input:focus": {
      border: '2px solid #317AFF',
      borderRadius: '5px'
    }
  },
  header: {
    [breakpoints.up('xs')]: {
      background: 'linear-gradient(#001C32, #001C32)',
      paddingRight: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      paddingBottom: theme.spacing(1),
      margin: "0",
      height: '100px',
      position: 'absolute',
      top: '0'
    },
    [breakpoints.up('lg')]: {
      background: 'linear-gradient(#001C32, #001C32)',
      paddingRight: theme.spacing(1),
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      margin: "0",
      height: '50px',
      position: 'absolute',
      top: '0'
    }
  },
  loggedInContent: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    overflow: 'auto',
    position: 'absolute',
    bottom: '100px',
    [breakpoints.up('xs')]: {
      top: '100px'
    },
    [breakpoints.up('lg')]: {
      top: '50px',
    }
  },
  loggedOutContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    position: 'absolute',
    bottom: '100px',
    [breakpoints.up('xs')]: {
      top: '100px'
    },
    [breakpoints.up('lg')]: {
      top: '50px',
    }
  },
  footer: {
    [breakpoints.up('xs')]: {
      background: 'linear-gradient(#001C32, #001C32)',
      paddingRight: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      paddingTop: theme.spacing(1),
      margin: "0",
      height: "100px",
      position: 'absolute',
      bottom: '0'
    },
    [breakpoints.up('lg')]: {
      background: 'linear-gradient(#001C32, #001C32)',
      paddingRight: theme.spacing(1),
      paddingLeft: theme.spacing(1),
      paddingTop: theme.spacing(1),
      margin: "0",
      height: "100px",
      position: 'absolute',
      bottom: '0'
    }
  },
  select: {
    border: '2px solid #C8C8D4',
    borderRadius: '5px',
    background: 'linear-gradient(#FFFFFF, #FFFFFF)',
    color: "#001C32",
    fontWeight: 400,
    fontFamily: "\"Manrope\", \"Roboto\", \"Arial\", \"sans-serif\"",
    '&:hover': {
      border: '2px solid #001C32'
    },
    [breakpoints.up('xs')]: {
      lineHeight: '1.6',
      fontSize: "1.4em"
    },
    [breakpoints.up('lg')]: {
      lineHeight: '1.5',
      fontSize: "1em"
    }
  },
  spinner: {
     position: 'relative',
     top: "50%",
     bottom: "50%"
  },
  deleteModal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteModalSub: {
    [breakpoints.up('xs')]: {
      backgroundColor: theme.palette.background.default,
      boxShadow: theme.shadows[3],
      padding: theme.spacing(1),
      outline: "none",
      width: "10%"
    }
  },
  deleteModalSubIcons: {
    textAlign: "center"
  },
  appIcon: {
    [breakpoints.up('xs')]: {
      height: "65px",
      width: '60px'
    }
  },
  downloadIcon: {
    [breakpoints.up('xs')]: {
      height: "25px",
      width: '20px'
    }
  },
  deleteIcon: {
    [breakpoints.up('xs')]: {
      height: "25px",
      width: '25px'
    }
  },
  tickIcon: {
    [breakpoints.up('xs')]: {
      height: "25px",
      width: '31px'
    }
  },
  subHeaderIconParent: {
    [breakpoints.up('xs')]: {
      position: "relative",
      height: "100%"
    }
  },
  helpIcon: {
    [breakpoints.up('xs')]: {
      display: 'flex',
      justifyContent: 'flex-start',
      height: "40px",
      width: '40px'
    }
  },
  contactIcon: {
    [breakpoints.up('xs')]: {
      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(2),
      display: 'flex',
      justifyContent: 'center',
      height: "40px",
      width: '40px'
    }
  },
  aboutIcon: {
    [breakpoints.up('xs')]: {
      display: 'flex',
      justifyContent: 'flex-end',
      height: "40px",
      width: '40px'
    }
  },
  userIcon: {
    [breakpoints.up('xs')]: {
      height: "35px",
      width: '35px'
    }
  },
  footerIcon: {
    color: '#FFFFFF',
    fill: '#FFFFFF',
    '&:active': {
      color: '#317AFF',
      fill: '#317AFF',
    },
    [breakpoints.up('xs')]: {
      height: "35px",
      width: '35px'
    },
    [breakpoints.up('lg')]: {
      margin: 'auto',
      height: "30px",
      width: '30px'
    }
  },
  headerIcon: {
    [breakpoints.up('xs')]: {
      height: "50px",
      width: '50px'
    }
  },
  sortIcon: {
    [breakpoints.up('xs')]: {
      height: "25px",
      width: '25px'
    }
  },
  appNameIconContainer: {
    [breakpoints.up('xs')]: {
      position: "relative",
      top: "0",
      left: "0",
      height: "50px",
      width: '208px'
    }
  },
  appNameIcon: {
    [breakpoints.up('xs')]: {
      position: "absolute",
      bottom: "0",
      left: "0",
      height: "25px",
      width: '168px'
    }
  },
  linkIcon: {
    [breakpoints.up('xs')]: {
      margin: 'auto',
      height: "15px",
      width: '15px'
    },
    [breakpoints.up('lg')]: {
      margin: 'auto',
      height: "30px",
      width: '30px'
    }
  },
  oddRow: {
    padding: theme.spacing(0.2),
    backgroundColor: '#F5F3F2'
  },
  evenRow: {
    padding: theme.spacing(0.2),
    backgroundColor: '#FAFAFF'
  },
  disabledRow: {
    padding: theme.spacing(0.2),
    backgroundColor: '#C8C8D4'
  },
  formSubmit: {
    paddingTop: theme.spacing(2),
    width: '100%'
  },
  formLabel: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  formError: {
    padding: 0,
    color: 'red'
  },
  formButton: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  formSummary: {
    paddingTop: theme.spacing(1)
  },
  forgotLink: {
    [breakpoints.up('xs')]: {
      fontSize: "1.8em",
    },
    [breakpoints.up('lg')]: {
      fontSize: "1.5em",
    },
    color: '#317AFF',
    lineHeight: "2",
    textDecoration: 'none',
    fontWeight: 700,
    '&:active': {
      textDecoration: 'none'
    },
    '&:hover': {
      textDecoration: 'none',
      color: '#a1c8ff'
    }
  },
  activeLink: {
    color: '#317AFF',
    textDecoration: 'none',
    '&:active': {
      textDecoration: 'none',
      fontWeight: 700
    },
    '&:hover': {
      textDecoration: 'none',
      color: '#a1c8ff'
    }
  },
  inactiveLink: {
    color: '#c7cdd7',
    textDecoration: 'none',
    '&:active': {
      textDecoration: 'none',
      fontWeight: 900
    },
    '&:hover': {
      textDecoration: 'none',
      color: '#a1c8ff'
    }
  },
  iconLink: {
    textDecoration: 'none',
  },
  hr: {
    height: "1px",
    width: "100%"
  },
  hrBlue: {
    backgroundColor: "#317aff",
    width: "100%"
  },
  hrGrey: {
    backgroundColor: "#C8C8D4",
    width: "100%"
  }
})

export { theme, themeStyles }
