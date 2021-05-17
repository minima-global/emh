import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {
  Log as LogVars,
} from '../../config';

import {ListLogs} from '../listLogs';

export const Logs = () => {
  return (

    <Grid item container alignItems='flex-start' xs={12}>

      <Grid item container xs={12}>

        <Grid item container justify="flex-start" xs={12}>

          <Typography variant="h2">
            {LogVars.heading}
          </Typography>

        </Grid>

        <Grid item container justify="flex-start" xs={12}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2000"
            height="4"
          >
            <line x2="2000" stroke="#317AFF" strokeWidth={4} />
          </svg>
        </Grid>

        { <ListLogs /> }

      </Grid>

    </Grid>
  );
};
