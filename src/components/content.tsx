import React from 'react';
import {Switch, Route} from 'react-router-dom';

import {PageTypes} from '../store/types';

import {
  Home,
  Logs,
  Cmd,
  Info,
  URLs,
  Addresses,
  Tokens,
  Triggers,
  Chart,
} from '../components/pages';

import {
  Local,
  Log as LogVars,
  Cmd as CmdVars,
  Tokens as TokensVars,
  Addresses as AddressVars,
  API as APIVars,
} from '../config';

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
        path={Local.logs}
        render= {() =>
          <Logs logType={LogVars.logType} /> }
      />
      <Route
        exact path={Local.urls}
        render= {() => <URLs />}
      />
      <Route
        exact path={Local.addresses}
        render= {() => <Addresses />}
      />
      <Route
        exact path={Local.tokens}
        render= {() => <Tokens />}
      />
      <Route
        exact path={Local.triggers}
        render= {() => <Triggers />}
      />
      <Route
        exact path={Local.cmd}
        render= {() => <Cmd />}
      />
      <Route
        exact path={Local.chartTokens}
        render= {() =>
          <Chart
            chartType={TokensVars.chartType}
            isFullScreen={true}
            navLink={Local.home}
            logNavLink={Local.logTokens} /> }
      />
      <Route
        exact path={Local.chartAddresses}
        render= {() =>
          <Chart
            chartType={AddressVars.chartType}
            isFullScreen={true}
            navLink={Local.home}
            logNavLink={Local.logAddresses} /> }
      />
      <Route
        exact path={Local.chartAPI}
        render= {() =>
          <Chart
            chartType={APIVars.chartType}
            isFullScreen={true}
            navLink={Local.home}
            logNavLink={Local.logAPI} /> }
      />
      <Route
        exact path={Local.chartCmds}
        render= {() =>
          <Chart
            chartType={CmdVars.chartType}
            isFullScreen={true}
            navLink={Local.home}
            logNavLink={Local.logCmds} /> }
      />

      <Route
        path={Local.logTokens}
        render= {() =>
          <Logs logType={TokensVars.logType} /> }
      />

      <Route
        path={Local.logAddresses}
        render= {() =>
          <Logs logType={AddressVars.logType} /> }
      />

      <Route
        path={Local.logAPI}
        render= {() =>
          <Logs logType={APIVars.logType} /> }
      />

      <Route
        path={Local.logCmds}
        render= {() =>
          <Logs logType={CmdVars.logType} /> }
      />

      <Route
        path={Local.home}
        render= {() => <Home />}
      />

    </Switch>
  );
};
