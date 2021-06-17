import React from 'react';
import {Switch, Route} from 'react-router-dom';

import {PageTypes} from '../store/types';

import {
  Home,
  Logs,
  Cmd,
  Info,
  Addresses,
  Tokens,
  Triggers,
  Chart,
} from '../components/pages';

import {
  Dbase,
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
          <Logs
            heading={LogVars.heading}
            limitLow={0}
            offset={Dbase.pageLimit} /> }
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
            isFullScreen={true}
            heading={TokensVars.chartHeading}
            navLink={Local.home}
            filterType={Dbase.tables.txpow.name}
            filterAction={Dbase.defaultActions.insert}
            filterRegex={TokensVars.regex} /> }
      />
      <Route
        exact path={Local.chartAddresses}
        render= {() =>
          <Chart
            isFullScreen={true}
            heading={AddressVars.chartHeading}
            navLink={Local.home}
            filterType={Dbase.tables.txpow.name}
            filterAction={Dbase.defaultActions.insert}
            filterRegex={AddressVars.regex} /> }
      />
      <Route
        exact path={Local.chartAPI}
        render= {() =>
          <Chart
            isFullScreen={true}
            heading={APIVars.chartHeading}
            navLink={Local.home}
            filterType={Dbase.tables.trigger.name}
            filterAction={Dbase.defaultActions.run}
            filterRegex={APIVars.regex} /> }
      />
      <Route
        exact path={Local.chartAPI}
        render= {() =>
          <Chart
            isFullScreen={true}
            heading={CmdVars.chartHeading}
            navLink={Local.home}
            filterType={Dbase.extraLogTypes.COMMAND}
            filterAction={Dbase.defaultActions.run}
            filterRegex={CmdVars.regex} /> }
      />

      <Route
        path={Local.home}
        render= {() => <Home />}
      />

    </Switch>
  );
};
