import React from 'react';
import {connect} from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import {theme} from '../../styles';

import {
  ApplicationState,
  AppDispatch,
  ChartProps,
  ChartType,
} from '../../store/types';

import {
  Home,
} from '../../config';

import {getChartEntries} from '../../store/app/dbase/actions';

import {themeStyles} from '../../styles';
// import {getChartData} from '../../utils/getChartData';
import {DisplayChart} from '../displayChart';
import {DisplayChartSummary} from '../displayChartSummary';

interface ThisProps {
  chartType: ChartType
  isFullScreen: boolean
  navLink: string
  logNavLink: string
}

interface StateProps {
  chartsData: ChartProps
}

interface DispatchProps {
  getChartEntries: (
    query: string,
    chartName: string,
    filterRegex: string
  ) => void
}

type Props = ThisProps & StateProps & DispatchProps

const chart = (props: Props) => {
  const screenHeight = props.isFullScreen ? '520px' : '250px';

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
          <Grid item container xs={12}>

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
                <Grid
                  item
                  container
                  alignItems="flex-start"
                  style={{
                    padding: theme.spacing(2),
                  }}
                >
                  <Grid container>
                    <DisplayChartSummary
                      chartType={props.chartType}
                      isFullScreen={props.isFullScreen}
                      navLink={props.navLink}
                      logNavLink={props.logNavLink} />

                    <DisplayChart
                      chartType={props.chartType}
                      viewport={screenHeight} />
                  </Grid>
                </Grid>

              </Paper>
            </Grid>
          </Grid>

        </Grid> :
        <Grid
          item
          container
          alignItems="flex-start"
          style={{
            padding: theme.spacing(2),
          }}
        >
          <Grid container>
            <DisplayChartSummary
              chartType={props.chartType}
              isFullScreen={props.isFullScreen}
              navLink={props.navLink}
              logNavLink={props.logNavLink} />

            <DisplayChart
              chartType={props.chartType}
              viewport={screenHeight} />
          </Grid>
        </Grid>
      }
    </>
  );
};

const mapStateToProps = (state: ApplicationState): StateProps => {
  return {
    chartsData: state.chartsData as ChartProps,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => {
  return {
    getChartEntries: (
        query: string,
        chartName: string,
        filterRegex: string,
    ) =>
      dispatch(getChartEntries(query, chartName, filterRegex)),
  };
};

const Chart = connect<StateProps, DispatchProps, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(chart);

export {Chart};
