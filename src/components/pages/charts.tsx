import React, {useEffect, useState, useRef} from 'react';
import {connect} from 'react-redux';

import Grid from '@material-ui/core/Grid';

import {theme} from '../../styles';

import {
  ApplicationState,
  AppDispatch,
  BalanceProps,
  ChartProps,
  ChartData,
} from '../../store/types';

import {
  Chart as ChartVars,
} from '../../config';

import {getChartEntries} from '../../store/app/dbase/actions';

import {
  Dbase,
} from '../../config';

// import {getChartData} from '../../utils/getChartData';
import {DisplayChart} from '../displayChart';
import {DisplayChartSummary} from '../displayChartSummary';

interface ThisProps {
  heading: string
  isFullScreen: boolean
  navLink: string
  logNavLink: string
  filterType: string,
  filterAction: string,
  filterRegex: string,
}

interface StateProps {
  chartsData: ChartProps
  balanceData: BalanceProps
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
  const isFirstRun = useRef(true);
  const [data, setData] = useState({} as ChartData);

  const query =
    'SELECT * FROM ' +
    Dbase.tables.log.name +
    ' WHERE ' + Dbase.tables.log.columns[2] +
    ' IN (\'' + props.filterType + '\')' +
    ' AND ' + Dbase.tables.log.columns[3] +
    ' IN (\'' + props.filterAction + '\')' +
    ' And ' + Dbase.tables.log.columns[4] +
    ' REGEXP \'' + props.filterRegex +
    '\'';

  const screenHeight = props.isFullScreen ? '800px' : '250px';

  useEffect(() => {
    if ( isFirstRun.current ) {
      isFirstRun.current = false;

      // SELECT * FROM LOGGING ORDER BY DATE DESC LIMIT 0, 2147483647
      props.getChartEntries(query, props.heading, props.filterRegex);
    } else {
      const chartIndex = ChartVars.chartInfo.indexOf(props.heading);
      if ( chartIndex != -1 ) {
        setData(props.chartsData.data[chartIndex]);
      }
    }
  }, [props.chartsData, props.balanceData]);

  return (
    <Grid
      item
      container
      alignItems="flex-start"
      style={{
        padding: theme.spacing(2),
      }}
      xs={12}
    >
      <Grid container>
        <DisplayChartSummary
          heading={props.heading}
          chartData={data}
          isFullScreen={props.isFullScreen}
          navLink={props.navLink}
          logNavLink={props.logNavLink} />

        <DisplayChart
          title={props.heading}
          chartData={data}
          viewport={screenHeight} />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state: ApplicationState): StateProps => {
  return {
    chartsData: state.chartsData as ChartProps,
    balanceData: state.balanceData as BalanceProps,
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
