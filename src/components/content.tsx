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

import {Local} from '../config/paths';

import {
  Cmd as CmdChart,
  Addresses as AddressesChart,
  Tokens as TokensChart,
  DailyTokens as DailyTokensChart,
  API as APIChart,
} from '../config/charts';


import {
  Cmd as CmdLog,
  Addresses as AddressesLog,
  Tokens as TokensLog,
  DailyTokens as DailyTokensLog,
  API as APILog,
  Log as AllLog,
} from '../config/logs';

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
          <Logs logType={AllLog.log} /> }
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
            chartType={TokensChart.chart}
            isFullScreen={true}
            navLink={Local.home}
            logNavLink={Local.logTokens} /> }
      />
      <Route
        exact path={Local.chartDailyTokens}
        render= {() =>
          <Chart
            chartType={DailyTokensChart.chart}
            isFullScreen={true}
            navLink={Local.home}
            logNavLink={Local.logTokens} /> }
      />
      <Route
        exact path={Local.chartAddresses}
        render= {() =>
          <Chart
            chartType={AddressesChart.chart}
            isFullScreen={true}
            navLink={Local.home}
            logNavLink={Local.logAddresses} /> }
      />
      <Route
        exact path={Local.chartAPI}
        render= {() =>
          <Chart
            chartType={APIChart.chart}
            isFullScreen={true}
            navLink={Local.home}
            logNavLink={Local.logAPI} /> }
      />
      <Route
        exact path={Local.chartCmds}
        render= {() =>
          <Chart
            chartType={CmdChart.chart}
            isFullScreen={true}
            navLink={Local.home}
            logNavLink={Local.logCmds} /> }
      />

      <Route
        path={Local.logTokens}
        render= {() =>
          <Logs logType={TokensLog.log} /> }
      />

      <Route
        path={Local.logDailyTokens}
        render= {() =>
          <Logs logType={DailyTokensLog.log} /> }
      />

      <Route
        path={Local.logAddresses}
        render= {() =>
          <Logs logType={AddressesLog.log} /> }
      />

      <Route
        path={Local.logAPI}
        render= {() =>
          <Logs logType={APILog.log} /> }
      />

      <Route
        path={Local.logCmds}
        render= {() =>
          <Logs logType={CmdLog.log} /> }
      />

      <Route
        path={Local.home}
        render= {() => <Home />}
      />

    </Switch>
  );
};
