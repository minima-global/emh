import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import {theme} from '../../styles';

import {ChartType} from '../../store/types';

import {
  Home,
} from '../../config/vars';

import {themeStyles} from '../../styles';
import {DisplayChart} from '../displayChart';

interface ThisProps {
  chartType: ChartType
  isFullScreen: boolean
  navLink: string
  logNavLink: string
}

type Props = ThisProps

export const Chart = (props: Props) => {
  const classes = themeStyles();

  return (

    <>
      { props.isFullScreen ?

        <Grid
          container
          alignItems='flex-start'
          style={{
            paddingLeft: theme.spacing(8),
            paddingRight: theme.spacing(8),
          }}
        >
          <Grid
            item
            container
            justify="flex-start"
            xs={12}>

            <Typography variant="h2">
              {Home.heading}
            </Typography>

          </Grid>

          <Grid
            item
            container
            justify="flex-start"
            alignItems='flex-start'
            xs={12}
          >
            <Paper
              elevation={5}
              className={classes.fullscreenChart}
            >
              <DisplayChart
                chartType={props.chartType}
                isFullScreen={props.isFullScreen}
                navLink={props.navLink}
                logNavLink={props.logNavLink} />
            </Paper>
          </Grid>
        </Grid> :
        <DisplayChart
          chartType={props.chartType}
          isFullScreen={props.isFullScreen}
          navLink={props.navLink}
          logNavLink={props.logNavLink} />
      }
    </>
  );
};
