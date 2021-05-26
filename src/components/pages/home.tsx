import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {
  Home as HomeVars,
} from '../../config';

import {ListBalances} from '../listBalances';
import {ListStatus} from '../listStatus';
import {ChartTokens} from '../chartTokens';
import {ChartAddresses} from '../chartAddresses';

export const Home = () => {
  return (

    <Grid item container alignItems='flex-start' xs={12}>

      <Grid item container xs={12}>

        <Grid item container justify="flex-start" xs={12}>

          <Typography variant="h2">
            {HomeVars.heading}
          </Typography>

        </Grid>

        <Grid item container justify="flex-start" xs={12}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 4000 20"
          >
            <line x2="4000" stroke="#001C32" width="100%" height="100%"/>
          </svg>
        </Grid>

        <Grid item container justify="flex-start" xs={6}>
          { <ListBalances /> }
        </Grid>

        <Grid item container justify="flex-start" xs={6}>
          { <ListStatus /> }
        </Grid>

        <Grid item container justify="flex-start" xs={12}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 4000 20"
          >
            <line x2="4000" stroke="#001C32" width="100%" height="100%"/>
          </svg>
        </Grid>

        <Grid item container justify="flex-start" xs={6}>
          { <ChartTokens /> }
        </Grid>

        <Grid item container justify="flex-start" xs={6}>
          { <ChartAddresses /> }
        </Grid>

      </Grid>

    </Grid>
  );
};
