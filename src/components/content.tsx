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
  DailyCmd as DailyCmdChart,
  Addresses as AddressesChart,
  DailyAddresses as DailyAddressesChart,
  Tokens as TokensChart,
  DailyTokens as DailyTokensChart,
  Minima as MinimaChart,
  DailyMinima as DailyMinimaChart,
  API as APIChart,
  DailyAPI as DailyAPIChart,
} from '../config/charts';


import {
  Cmd as CmdLog,
  DailyCmd as DailyCmdLog,
  Addresses as AddressesLog,
  DailyAddresses as DailyAddressesLog,
  Tokens as TokensLog,
  DailyTokens as DailyTokensLog,
  Minima as MinimaLog,
  DailyMinima as DailyMinimaLog,
  API as APILog,
  DailyAPI as DailyAPILog,
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
        exact path={Local.chartMinima}
        render= {() =>
          <Chart
            chartType={MinimaChart.chart}
            isFullScreen={true}
            navLink={Local.home}
            logNavLink={Local.logMinima} /> }
      />
      <Route
        exact path={Local.chartDailyMinima}
        render= {() =>
          <Chart
            chartType={DailyMinimaChart.chart}
            isFullScreen={true}
            navLink={Local.home}
            logNavLink={Local.logDailyMinima} /> }
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
        exact path={Local.chartDailyAddresses}
        render= {() =>
          <Chart
            chartType={DailyAddressesChart.chart}
            isFullScreen={true}
            navLink={Local.home}
            logNavLink={Local.logDailyAddresses} /> }
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
        exact path={Local.chartDailyAPI}
        render= {() =>
          <Chart
            chartType={DailyAPIChart.chart}
            isFullScreen={true}
            navLink={Local.home}
            logNavLink={Local.logDailyAPI} /> }
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
        exact path={Local.chartDailyCmds}
        render= {() =>
          <Chart
            chartType={DailyCmdChart.chart}
            isFullScreen={true}
            navLink={Local.home}
            logNavLink={Local.logDailyCmds} /> }
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
        path={Local.logMinima}
        render= {() =>
          <Logs logType={MinimaLog.log} /> }
      />
      <Route
        path={Local.logDailyMinima}
        render= {() =>
          <Logs logType={DailyMinimaLog.log} /> }
      />
      <Route
        path={Local.logAddresses}
        render= {() =>
          <Logs logType={AddressesLog.log} /> }
      />
      <Route
        path={Local.logDailyAddresses}
        render= {() =>
          <Logs logType={DailyAddressesLog.log} /> }
      />
      <Route
        path={Local.logAPI}
        render= {() =>
          <Logs logType={APILog.log} /> }
      />
      <Route
        path={Local.logDailyAPI}
        render= {() =>
          <Logs logType={DailyAPILog.log} /> }
      />
      <Route
        path={Local.logCmds}
        render= {() =>
          <Logs logType={CmdLog.log} /> }
      />
      <Route
        path={Local.logDailyCmds}
        render= {() =>
          <Logs logType={DailyCmdLog.log} /> }
      />

      <Route
        path={Local.home}
        render= {() => <Home />}
      />

    </Switch>
  );
};
