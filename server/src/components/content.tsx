import React from 'react';
import {Switch, Route} from 'react-router-dom';

import {PageTypes} from '../store/types';

import {
  Logs,
  Cmd,
  Info,
} from '../components/pages';

import {Local} from '../config';

export const Content = () => {
  return (

    <Switch>

      <Route
        exact path={Local.help}
        render={() => <Info page={PageTypes.HELP}/>}
      />
      <Route
        exact path={Local.contact}
        render={() => <Info page={PageTypes.CONTACT}/>}
      />
      <Route
        exact path={Local.about}
        render={() => <Info page={PageTypes.ABOUT}/>}
      />

      <Route
        exact path={Local.logs}
        render= {() => <Logs />}
      />
      <Route
        exact path={Local.cmd}
        render= {() => <Cmd />}
      />

      <Route
        path={Local.home}
        render= {() => <Logs />}
      />

    </Switch>
  );
};
