import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {
  Home as HomeVars,
} from '../../config';

import {Token} from './token';

export const Home = () => {
  return (

    <Grid item container justify="flex-start" xs={12}>
      { <Token /> }
    </Grid>
  );
};
