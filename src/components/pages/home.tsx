import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import {
  Home as HomeVars,
} from '../../config';

import {ListBalances} from '../listBalances';
import {ListStatus} from '../listStatus';
import {ChartTokens} from '../chartTokens';
import {ChartAddresses} from '../chartAddresses';
import {ChartAPICalls} from '../chartAPICalls';
import {theme} from '../../styles';

export const Home = () => {
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
            style={{
              marginTop: theme.spacing(1),
              marginRight: theme.spacing(1),
              width: '100%',
              height: '30vh',
              overflow: 'auto',
              background: 'white',
            }}
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
            style={{
              marginTop: theme.spacing(1),
              marginLeft: theme.spacing(1),
              width: '100%',
              height: '30vh',
              background: 'white',
            }}
          >
            { <ListStatus /> }
          </Paper>

        </Grid>

        <Grid item container justify="flex-start" xs={6}>
          <Paper
            elevation={5}
            style={{
              marginTop: theme.spacing(1),
              marginRight: theme.spacing(1),
              width: '100%',
              height: '45vh',
              overflow: 'auto',
              background: 'white',
            }}
          >
            { <ChartTokens /> }
          </Paper>
        </Grid>

        <Grid item container justify="flex-start" xs={6}>
          <Paper
            elevation={5}
            style={{
              marginTop: theme.spacing(1),
              marginLeft: theme.spacing(1),
              width: '100%',
              height: '45vh',
              overflow: 'auto',
              background: 'white',
            }}
          >
            { <ChartAddresses /> }
          </Paper>
        </Grid>

        <Grid item container justify="flex-start" xs={6}>
          <Paper
            elevation={5}
            style={{
              marginTop: theme.spacing(1),
              marginRight: theme.spacing(1),
              width: '100%',
              height: '45vh',
              overflow: 'auto',
              background: 'white',
            }}
          >
            { <ChartAPICalls /> }
          </Paper>
        </Grid>

        <Grid item container justify="flex-start" xs={6}>
          &nbsp;
        </Grid>

      </Grid>

    </Grid>
  );
};
