import React from 'react';
import {HashRouter} from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import {ThemeProvider} from '@material-ui/styles';

import {theme} from '../styles';
import {Main} from './pages';

const Root = () => {
  const path = window.location.href;
  const indexOf = path.indexOf('index');
  if (indexOf > -1) {
    const redirect = path.substr(0, indexOf);
    window.location.href = redirect;
  }

  return (

    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HashRouter>
        <Main />
      </HashRouter>
    </ThemeProvider>
  );
};

export default Root;
