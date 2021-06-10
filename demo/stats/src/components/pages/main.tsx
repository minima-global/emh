import React from 'react';

import GoogleFontLoader from 'react-google-font-loader';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import minimaIcon from '../../images/minimaIcon.svg';

import {Content} from '../content';

import {App} from '../../config/vars';

import {themeStyles} from '../../styles';

export const Main = () => {
  const classes = themeStyles();

  return (

    <>
      <Grid className={classes.root}>

        <GoogleFontLoader
          fonts={[
            {
              font: 'Manrope',
              weights: [300, 400, 500, 600, 700],
            },
            {
              font: 'Roboto',
              weights: [300, 400, 500, 600, 700],
            },
          ]}
        />

        <Grid
          item
          container
          className={classes.header}
          xs={12}
        >
          <Grid
            item
            container
            alignItems="center"
            justify="flex-start"
            xs={6}
          >
            <Typography variant="h1">
              {App.appName}
            </Typography>
          </Grid>

          <Grid
            item
            container
            alignItems="center"
            justify="flex-end"
            xs={6}
          >
            <Typography variant="h1">
              {App.catchLine} &nbsp;&nbsp;
            </Typography>
            <img className={classes.headerIcon} src={minimaIcon} />
          </Grid>

        </Grid>

        <Grid className={classes.content} item container xs={12}>
          <Content/>
        </Grid>

        <Grid className={classes.footer} item container xs={12}>

          <Typography variant="caption">
            {App.copyright}
          </Typography>

        </Grid>

      </Grid>
    </>
  );
};
