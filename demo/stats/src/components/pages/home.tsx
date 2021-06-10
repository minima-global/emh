import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {
  Home as HomeVars,
} from '../../config';

import {ChartTokens} from '../chartTokens';
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

        <Grid item container justify="flex-start" xs={12}>
          <ChartTokens />
        </Grid>


      </Grid>

    </Grid>
  );
};
