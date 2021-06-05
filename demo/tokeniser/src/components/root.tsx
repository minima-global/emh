import React from 'react';
import {HashRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import { Minima } from 'minima';

import CssBaseline from '@material-ui/core/CssBaseline';
import {ThemeProvider} from '@material-ui/styles';

import {theme} from '../styles';
import {Main} from './pages';

import {
  App,
  Remote,
} from '../config';

const url =
`${Remote.server}/${Remote.serverApiBase}=${Remote.listenCommand}&${Remote.nameParam}=${App.appName}`
const encodedURL = encodeURI(url);

Minima.net.GET(encodedURL, function(getResult) {
  const result = decodeURIComponent(getResult.result)
  const resultObject = JSON.parse(result);
  if ( resultObject.status ) {
    console.log('listen boom!', getResult);
    Minima.minidapps.listen(function(msg) {
      console.log('Got sent message ', msg);
      Minima.minidapps.reply(msg.replyid, 'OK');
    });
  }
}); 

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
