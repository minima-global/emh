import React, {useEffect, useState, useRef} from 'react';
import {connect} from 'react-redux';

import Grid from '@material-ui/core/Grid';

import {Token as Balance} from 'minima';

import {theme} from '../../styles';

import {
  ApplicationState,
  AppDispatch,
  LogsProps,
  BalanceProps,
  ChartSummary,
  ChartData,
} from '../../store/types';

import {getDbaseEntries} from '../../store/app/dbase/actions';

import {
  Dbase,
  Tokens as TokensVars,
} from '../../config';

import {getChartData} from '../../utils/getChartData';
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

type Props = ThisProps & StateProps & DispatchProps

const chart = (props: Props) => {
  const isFirstRun = useRef(true);
  const [data, setData] = useState({} as ChartSummary);
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
                props.filterType,
                props.filterAction,
                props.filterRegex,
            );
        if ( props. heading === TokensVars.chartHeading) {
          const tokens: ChartData = {};
          props.balanceData.data.forEach((token: Balance) => {
            // console.log(thisTokenId);
            if ( token.tokenid in chartData.data) {
              const tokenName = token.token;
              tokens[tokenName] = chartData.data[token.tokenid];
            }
          });
          const thisData: ChartSummary = {
            data: tokens,
            total: chartData.total,
          };
          setData(thisData);
        } else {
          setData(chartData);
        }
      }
    }
  }, [props.logsData, props.balanceData]);

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

const Chart = connect<StateProps, DispatchProps, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(chart);

export {Chart};
