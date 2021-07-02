import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import {Home as HomeVars} from '../../config/vars';

import {Local} from '../../config/paths';

import {
  Cmd as CmdChart,
  Addresses as AddressesChart,
  Tokens as TokensChart,
  DailyTokens as DailyTokensChart,
  API as APIChart,
} from '../../config/charts';

import {theme, themeStyles} from '../../styles';

import {ListBalances} from '../listBalances';
import {ListStatus} from '../listStatus';
import {Chart} from './charts';

export const Home = () => {
  const classes = themeStyles();

  return (

    <Grid
      container
      alignItems='flex-start'
      style={{
        paddingLeft: theme.spacing(8),
        paddingRight: theme.spacing(8),
      }}>

      <Grid item container xs={12}>

        <Grid item container justify="flex-start" xs={12}>

          <Typography variant="h2">
            {HomeVars.heading}
          </Typography>

        </Grid>

        <Grid
          item
          container
          justify="flex-start"
          alignItems='flex-start'
          xs={8}
        >
          <Paper
            elevation={5}
            className={classes.dashboardToken}
          >
            { <ListBalances /> }
          </Paper>
        </Grid>

        <Grid
          item
          container
          justify="flex-start"
          alignItems='flex-start'
          xs={4}
        >
          <Paper
            elevation={5}
            className={classes.dashboardStatus}
          >
            { <ListStatus /> }
          </Paper>

        </Grid>


        <Grid
          item
          container
          justify="flex-start"
          alignItems='flex-start'
          xs={6}>

          <Paper
            elevation={5}
            className={classes.dashboardChartLeft}
          >
            {
              <Chart
                chartType={TokensChart.chart}
                isFullScreen={false}
                navLink={Local.chartTokens}
                logNavLink={Local.logTokens} /> }
          </Paper>
        </Grid>


        <Grid
          item
          container
          justify="flex-start"
          alignItems='flex-start'
          xs={6}>

          <Paper
            elevation={5}
            className={classes.dashboardChartRight}
          >
            {
              <Chart
                chartType={AddressesChart.chart}
                isFullScreen={false}
                navLink={Local.chartAddresses}
                logNavLink={Local.logAddresses}/> }
          </Paper>
        </Grid>

        <Grid
          item
          container
          justify="flex-start"
          xs={6}>

          <Paper
            elevation={5}
            className={classes.dashboardChartLeft}
          >
            {
              <Chart
                chartType={APIChart.chart}
                isFullScreen={false}
                navLink={Local.chartAPI}
                logNavLink={Local.logAPI} /> }
          </Paper>
        </Grid>

        <Grid
          item
          container
          justify="flex-start"
          xs={6}>

          <Paper
            elevation={5}
            className={classes.dashboardChartRight}
          >
            {
              <Chart
                chartType={CmdChart.chart}
                isFullScreen={false}
                navLink={Local.chartCmds}
                logNavLink={Local.logCmds} /> }
          </Paper>
        </Grid>

        <Grid
          item
          container
          justify="flex-start"
          xs={6}>

          <Paper
            elevation={5}
            className={classes.dashboardChartLeft}
          >
            {
              <Chart
                chartType={DailyTokensChart.chart}
                isFullScreen={false}
                navLink={Local.chartDailyTokens}
                logNavLink={Local.logTokens} /> }
          </Paper>
        </Grid>


        <Grid item container justify="flex-start" xs={6}>
          &nbsp;
        </Grid>

      </Grid>

    </Grid>
  );
};
