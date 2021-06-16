import React, {useEffect, useState, useRef} from 'react';
import {connect} from 'react-redux';

import {Token as Balance} from 'minima';

import {
  ApplicationState,
  AppDispatch,
  LogsProps,
  BalanceProps,
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
  balanceData: BalanceProps
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
      if ( props.logsData?.data.length && props.balanceData?.data.length ) {
        const chartData =
            getChartData(
                props.logsData,
                Dbase.tables.txpow.name,
                Dbase.defaultActions.insert,
                ' 0x[A-Z0-9]*',
            );
        const tokens: ChartData = {};
        props.balanceData.data.forEach((token: Balance) => {
          // console.log(thisTokenId);
          if ( token.tokenid in chartData.data) {
            const tokenName = token.token;
            tokens[tokenName] = chartData.data[token.tokenid];
          }
        });
        setData(tokens);
        setTotal(chartData.total);
      }
    }
  }, [props.logsData, props.balanceData]);

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
    balanceData: state.balanceData as BalanceProps,
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

const ChartTokens = connect<StateProps, DispatchProps, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(chart);

export {ChartTokens};
