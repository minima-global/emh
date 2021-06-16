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
  Local,
  Dbase,
  Addresses as AddressVars,
} from '../../config';

import {getChartData} from '../../utils/getChartData';
import {DisplayChart} from '../displayChart';
import {DataSummary} from '../summariseChart';

interface ChartProps {
  isFullScreen: boolean
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
  let screenHeight = '250px';
  let navLink = Local.chartAddresses;
  if ( props.isFullScreen ) {
    screenHeight = '800px';
    navLink = Local.home;
  }

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
                Dbase.tables.txpow.name,
                'insert',
                ' Mx[A-Z0-9]*',
            );
        setData(chartData.data);
        setTotal(chartData.total);
        // console.log('Addresses data: ', chartData.data);
      }
    }
  }, [props.logsData]);

  return (
    <>
      <DataSummary
        heading={AddressVars.chartHeading}
        total={total}
        isFullScreen={props.isFullScreen}
        navLink={navLink} />

      <DisplayChart
        title='Addresses'
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

const ChartAddresses = connect<StateProps, DispatchProps, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(chart);

export {ChartAddresses};
