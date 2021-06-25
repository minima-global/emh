import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import {theme} from '../../styles';

import {
  ApplicationState,
  AppDispatch,
  ChartProps,
  ChartData,
  ChartType,
} from '../../store/types';

import {
  Chart as ChartVars,
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
  const [data, setData] = useState({} as ChartData);

  // console.log('got chart', props.chartType);

  const screenHeight = props.isFullScreen ? '560px' : '250px';
  const chartIndex = ChartVars.chartInfo.indexOf(props.chartType.name);

  const classes = themeStyles();

  useEffect(() => {
    if ( chartIndex != -1 ) {
      if ( props.chartsData.data[chartIndex] ) {
        setData(props.chartsData.data[chartIndex]);
      } else {
        // SELECT * FROM LOGGING ORDER BY DATE DESC LIMIT 0, 2147483647
        // console.log('runnig charts query', query);
        props.getChartEntries(
            props.chartType.query, props.chartType.name, props.chartType.regex);
      }
    }
  }, [props.chartsData]);

  return (

    <>
      { props.isFullScreen ?

        <Grid
          container
          style={{
            paddingLeft: theme.spacing(8),
            paddingRight: theme.spacing(8),
          }}
        >
          <Grid item container justify="flex-start" xs={12}>

            <Typography variant="h2">
              {Home.heading}
            </Typography>

          </Grid>

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
                  heading={props.chartType.name}
                  chartData={data}
                  isFullScreen={props.isFullScreen}
                  navLink={props.navLink}
                  logNavLink={props.logNavLink} />

                <DisplayChart
                  chartType={props.chartType}
                  chartData={data}
                  viewport={screenHeight} />
              </Grid>
            </Grid>

          </Paper>

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
              heading={props.chartType.name}
              chartData={data}
              isFullScreen={props.isFullScreen}
              navLink={props.navLink}
              logNavLink={props.logNavLink} />

            <DisplayChart
              chartType={props.chartType}
              chartData={data}
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
