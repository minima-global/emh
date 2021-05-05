import React from 'react';
import {HashRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import CssBaseline from '@material-ui/core/CssBaseline';
import {ThemeProvider} from '@material-ui/styles';

import {theme} from '../styles';
import {Main} from './pages';

const Root = ({store}: any) => {
  const path = window.location.href;
  const indexOf = path.indexOf('index');
  if (indexOf > -1) {
    const redirect = path.substr(0, indexOf);
    window.location.href = redirect;
  }

  return (

    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HashRouter>
          <Main />
        </HashRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default Root;
