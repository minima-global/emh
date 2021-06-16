import React, {useEffect, useState, useRef} from 'react';
import {connect} from 'react-redux';

import {
  ApplicationState,
  AppDispatch,
  LogsProps,
  ChartData,
} from '../../store/types';

import {getDbaseEntries} from '../../store/app/dbase/actions';

import {
  Dbase,
} from '../../config';

import {getChartData} from '../../utils/getChartData';
import {DisplayChart} from '../displayChart';
import {DataSummary} from '../summariseChart';

interface ChartProps {
  isFullScreen: boolean
  navLink: string
  heading: string
}

interface StateProps {
  logsData: LogsProps
}

interface DispatchProps {
  getDbaseEntries: (
    dbase: string,
    sortField: string,
    sortOrder: string
  ) => void
}

type Props = ChartProps & StateProps & DispatchProps

const chart = (props: Props) => {
  const isFirstRun = useRef(true);
  const [data, setData] = useState({} as ChartData);
  const [total, setTotal] = useState(0);
  const screenHeight = props.isFullScreen ? '800px' : '250px';

  useEffect(() => {
    if ( isFirstRun.current ) {
      isFirstRun.current = false;

      props.getDbaseEntries(
          Dbase.tables.log.name,
          'DATE',
          'DESC');
    } else {
      if ( props.logsData?.data.length ) {
        const chartData =
            getChartData(
                props.logsData,
                Dbase.tables.trigger.name,
                Dbase.defaultActions.run,
                '^[a-zA-Z]* ',
            );
        setData(chartData.data);
        setTotal(chartData.total);
      }
    }
  }, [props.logsData]);

  return (
    <>
      <DataSummary
        heading={props.heading}
        total={total}
        isFullScreen={props.isFullScreen}
        navLink={props.navLink} />

      <DisplayChart
        title={props.heading}
        chartData={data}
        viewport={screenHeight} />
    </>
  );
};

const mapStateToProps = (state: ApplicationState): StateProps => {
  return {
    logsData: state.logsData as LogsProps,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => {
  return {
    getDbaseEntries: (
        dbase: string,
        sortField: string,
        sortOrder: string) =>
      dispatch(getDbaseEntries(
          dbase,
          sortField,
          sortOrder),
      ),
  };
};

const ChartAPI = connect<StateProps, DispatchProps, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(chart);

export {ChartAPI};
