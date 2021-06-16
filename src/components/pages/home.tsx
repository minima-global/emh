import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import {
  Home as HomeVars,
} from '../../config';

import {themeStyles} from '../../styles';

import {ListBalances} from '../listBalances';
import {ListStatus} from '../listStatus';
import {ChartTokens} from './chartTokens';
import {ChartAddresses} from './chartAddresses';
import {ChartAPI} from './chartAPI';
import {theme} from '../../styles';

export const Home = () => {
  const classes = themeStyles();

  return (

    <Grid
      item
      container
      alignItems='flex-start'
      style={{
        marginLeft: theme.spacing(8),
        marginRight: theme.spacing(8),
      }}
      xs={12}>

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
            { <ChartTokens isFullScreen={false} /> }
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
            { <ChartAddresses isFullScreen={false} /> }
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
            { <ChartAPI isFullScreen={false} /> }
          </Paper>
        </Grid>

        <Grid item container justify="flex-start" xs={6}>
          &nbsp;
        </Grid>

      </Grid>

    </Grid>
  );
};
