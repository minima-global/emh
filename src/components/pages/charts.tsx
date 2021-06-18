import React, {useEffect, useState, useRef} from 'react';
import {connect} from 'react-redux';

import Grid from '@material-ui/core/Grid';

import {Token as Balance} from 'minima';

import {theme} from '../../styles';

import {
  ApplicationState,
  AppDispatch,
  LogsProps,
  Logs,
  BalanceProps,
  ChartSummary,
  ChartData,
  ChartValues,
} from '../../store/types';

import {getTableEntries} from '../../store/app/dbase/actions';

import {getRandomColour} from '../../utils/colourGenererator';

import {
  Dbase,
  Tokens as TokensVars,
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
  logsData: LogsProps
  balanceData: BalanceProps
}

interface DispatchProps {
  getTableEntries: (
    table: string,
    query: string,
  ) => void
}

type Props = ThisProps & StateProps & DispatchProps

const chart = (props: Props) => {
  const isFirstRun = useRef(true);
  const [data, setData] = useState({} as ChartSummary);

  /*
  const thisAction = log.ACTION;
        const thisData = log.DATA;
        const thisType = log.LOGGINGTYPE;
        const regex = new RegExp(searchRegex, 'g');
        if ( thisType === logType &&
               thisAction === action ) {
          const thisMatch = thisData.match(regex);
          const thisMatchString = thisMatch ? thisMatch.toString().trim() : '';
          if ( thisMatchString.length ) {
            // console.log('Matched! ', thisMatchString);
            if (!data[thisMatchString]) {
              const chartValues: ChartValues = {
                count: 1,
                colour: getRandomColour(),
              };
              data[thisMatchString] = chartValues;
            } else {
              data[thisMatchString].count += 1;
            }
            total = total + 1;
          }
    */

  /*
   const query =
    'SELECT * FROM ' +
    Dbase.tables.log.name +
    ' WHERE ' + Dbase.tables.log.columns[2] + ' = ' + props.filterType +
    ' AND ' + Dbase.tables.log.columns[3] + ' = ' + props.filterAction +
    ' WHERE ' + Dbase.tables.log.columns[4] + ' REGEXP \'' + props.filterRegex +
    '\'';
  */

  /*
  const query =
    'SELECT * FROM ' +
    Dbase.tables.log.name +
    ' WHERE ' + Dbase.tables.log.columns[2] + ' = ' + props.filterType +
    ' AND ' + Dbase.tables.log.columns[3] + ' = ' + props.filterAction;
  */

  const query =
    'SELECT * FROM ' +
    Dbase.tables.log.name +
    ' WHERE ' + Dbase.tables.log.columns[2] +
    ' IN (\'' + props.filterType + '\')';

  const screenHeight = props.isFullScreen ? '800px' : '250px';

  useEffect(() => {
    if ( isFirstRun.current ) {
      isFirstRun.current = false;

      // SELECT * FROM LOGGING ORDER BY DATE DESC LIMIT 0, 2147483647
      props.getTableEntries(Dbase.tables.log.name, query);
    } else {
      if ( props.logsData?.data.length && props.balanceData?.data.length ) {
        let total = 0;
        const chartData: ChartData = {};
        props.logsData.data.map( ( log: Logs, index: number ) => {
          // const thisDate = new Date(+log.DATE);
          const thisData = log.DATA;
          const thisMatch = thisData.match(props.filterRegex);
          const thisMatchString = thisMatch ? thisMatch.toString().trim() : '';
          if ( thisMatchString.length ) {
            // console.log('Matched! ', thisMatchString);
            if (!chartData[thisMatchString]) {
              const chartValues: ChartValues = {
                count: 1,
                colour: getRandomColour(),
              };
              chartData[thisMatchString] = chartValues;
            } else {
              chartData[thisMatchString].count += 1;
            }
            total = total + 1;
          }
        });
        const summary: ChartSummary = {
          data: chartData,
          total: total,
        };
        if ( props. heading === TokensVars.chartHeading) {
          const tokens: ChartData = {};
          props.balanceData.data.forEach((token: Balance) => {
            // console.log(thisTokenId);
            if ( token.tokenid in summary.data) {
              const tokenName = token.token;
              tokens[tokenName] = summary.data[token.tokenid];
            }
          });
          summary.data = tokens;
        }
        setData(summary);
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
    getTableEntries: (
        table: string,
        query: string,
    ) =>
      dispatch(getTableEntries(
          table,
          query),
      ),
  };
};

const Chart = connect<StateProps, DispatchProps, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(chart);

export {Chart};
