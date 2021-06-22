import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import Grid from '@material-ui/core/Grid';

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
} from '../../config';

import {getChartEntries} from '../../store/app/dbase/actions';

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

  const screenHeight = props.isFullScreen ? '800px' : '250px';
  const chartIndex = ChartVars.chartInfo.indexOf(props.chartType.name);

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
    <Grid
      item
      container
      alignItems="flex-start"
      style={{
        marginLeft: theme.spacing(8),
        marginRight: theme.spacing(8),
      }}
      xs={12}
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
