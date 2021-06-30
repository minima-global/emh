import React from 'react';
import {connect} from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// import {theme, themeStyles} from '../styles';

import {
  ApplicationState,
  AppDispatch,
  ChartType,
} from '../store/types';

import {countTableEntries, getChartEntries} from '../store/app/dbase/actions';

const time = {
  anHour: {
    timeString: 'AN HOUR',
    timeAmount: 3600000,
  },
  sixHours: {
    timeString: 'SIX HOURS',
    timeAmount: 21600000,
  },
  twelveHours: {
    timeString: 'TWELVE HOURS',
    timeAmount: 43200000,
  },
  aDay: {
    timeString: 'ONE DAY',
    timeAmount: 86400000,
  },
  aWeek: {
    timeString: 'ONE WEEK',
    timeAmount: 604800000,
  },
  aMonth: {
    timeString: 'ONE MONTH',
    timeAmount: 2629800000,
  },
  threeMonths: {
    timeString: 'THREE MONTHS',
    timeAmount: 7889400000,
  },
  sixMonths: {
    timeString: 'SIX MONTHS',
    timeAmount: 15778800000,
  },
  aYear: {
    timeString: 'ONE YEAR',
    timeAmount: 31557600000, // 365.25 * aWeek,
  },
};

interface SummaryProps {
  chartType: ChartType
}

interface DispatchProps {
  countTableEntries: (
    query: string
  ) => void
  getChartEntries: (
    query: string,
    chartName: string,
    countKey: string,
    dataKey: string
  ) => void
}

type Props = SummaryProps & DispatchProps

const footer = (props: Props) => {
  // const classes = themeStyles();

  const doQuery = (span: string) => {
    let timeFrom = 0;
    const timeNow = Date.now();
    switch (span) {
      case time.anHour.timeString: {
        timeFrom = timeNow - time.anHour.timeAmount;
        break;
      }
      case time.sixHours.timeString: {
        timeFrom = timeNow - time.sixHours.timeAmount;
        break;
      }
      case time.twelveHours.timeString: {
        timeFrom = timeNow - time.twelveHours.timeAmount;
        break;
      }
      case time.aDay.timeString: {
        timeFrom = timeNow - time.aDay.timeAmount;
        break;
      }
      case time.aWeek.timeString: {
        timeFrom = timeNow - time.aWeek.timeAmount;
        break;
      }
      case time.aMonth.timeString: {
        timeFrom = timeNow - time.aMonth.timeAmount;
        break;
      }
      case time.threeMonths.timeString: {
        timeFrom = timeNow - time.threeMonths.timeAmount;
        break;
      }
      case time.sixMonths.timeString: {
        timeFrom = timeNow - time.sixMonths.timeAmount;
        break;
      }
      case time.aYear.timeString: {
        timeFrom = timeNow - time.aYear.timeAmount;
        break;
      }
    }

    let countQuery =
      props.chartType.countQuery.replace(/<firstTime>/g, timeFrom.toString());
    countQuery = countQuery.replace(/<secondTime>/g, timeNow.toString());
    props.countTableEntries(countQuery);
    let query =
      props.chartType.query.replace(/<firstTime>/g, timeFrom.toString());
    query = query.replace(/<secondTime>/g, timeNow.toString());

    console.log('time count', countQuery);
    console.log('time', query);

    props.countTableEntries(countQuery);
    props.getChartEntries(
        query,
        props.chartType.name,
        props.chartType.countColumn,
        props.chartType.dataColumn);
  };

  return (
    <Grid
      container
    >
      <Grid
        item
        container
        alignItems="center"
        justify='flex-start'
        xs={12}
        style={{
          background: '#001C32',
          backgroundColor: '#001C32',
          borderBottomLeftRadius: '20px',
          borderBottomRightRadius: '20px',
        }}
      >
        <Grid
          item
          container
          alignItems="center"
          justify="center"
          xs={3}>

          <Typography variant="body2">
            Time
          </Typography>

        </Grid>

        <Grid item container xs={1}>

          <Button
            onClick={() => doQuery(time.anHour.timeString)}
            size='medium'
            variant='outlined'
            color='primary'
            style={{
              background: '#001C32',
              backgroundColor: '#001C32',
            }}
          >
            <Typography variant="body2">
              1H
            </Typography>
          </Button>
        </Grid>

        <Grid item container xs={1}>

          <Button
            onClick={() => doQuery(time.sixHours.timeString)}
            size='medium'
            variant='outlined'
            color='primary'
            style={{
              background: '#001C32',
              backgroundColor: '#001C32',
            }}
          >
            <Typography variant="body2">
              6H
            </Typography>
          </Button>
        </Grid>

        <Grid item container xs={1}>

          <Button
            onClick={() => doQuery(time.twelveHours.timeString)}
            size='medium'
            variant='outlined'
            color='primary'
            style={{
              background: '#001C32',
              backgroundColor: '#001C32',
            }}
          >
            <Typography variant="body2">
              12H
            </Typography>
          </Button>
        </Grid>

        <Grid item container xs={1}>

          <Button
            onClick={() => doQuery(time.aDay.timeString)}
            size='medium'
            variant='outlined'
            color='primary'
            style={{
              background: '#001C32',
              backgroundColor: '#001C32',
            }}
          >
            <Typography variant="body2">
              1D
            </Typography>
          </Button>
        </Grid>

        <Grid item container xs={1}>

          <Button
            onClick={() => doQuery(time.aWeek.timeString)}
            size='medium'
            variant='outlined'
            color='primary'
            style={{
              background: '#001C32',
              backgroundColor: '#001C32',
            }}
          >
            <Typography variant="body2">
              7D
            </Typography>
          </Button>
        </Grid>

        <Grid item container xs={1}>

          <Button
            onClick={() => doQuery(time.aMonth.timeString)}
            size='medium'
            variant='outlined'
            color='primary'
            style={{
              background: '#001C32',
              backgroundColor: '#001C32',
            }}
          >
            <Typography variant="body2">
              1M
            </Typography>
          </Button>
        </Grid>

        <Grid item container xs={1}>

          <Button
            onClick={() => doQuery(time.threeMonths.timeString)}
            size='medium'
            variant='outlined'
            color='primary'
            style={{
              background: '#001C32',
              backgroundColor: '#001C32',
            }}
          >
            <Typography variant="body2">
              3M
            </Typography>
          </Button>
        </Grid>

        <Grid item container xs={1}>

          <Button
            onClick={() => doQuery(time.sixMonths.timeString)}
            size='medium'
            variant='outlined'
            color='primary'
            style={{
              background: '#001C32',
              backgroundColor: '#001C32',
            }}
          >
            <Typography variant="body2">
              6M
            </Typography>
          </Button>
        </Grid>

        <Grid item container xs={1}>

          <Button
            onClick={() => doQuery(time.aYear.timeString)}
            size='medium'
            variant='outlined'
            color='primary'
            style={{
              background: '#001C32',
              backgroundColor: '#001C32',
              borderRadius: '20px',
            }}
          >
            <Typography variant="body2">
              1Y
            </Typography>
          </Button>
        </Grid>

      </Grid>
    </Grid>
  );
};

/*
{Chart.totals} {props.chartType.name} = {
  Object.values(props.chartData)
      .reduce( function(acc: number, chartData: number) {
        return acc + chartData;
      }, 0)
}
*/

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => {
  return {
    countTableEntries: (
        query: string,
    ) => dispatch(countTableEntries(
        query,
    )),
    getChartEntries: (
        query: string,
        chartName: string,
        countKey: string,
        dataKey: string,
    ) =>
      dispatch(getChartEntries(query, chartName, countKey, dataKey)),
  };
};

const DisplayChartFooter =
  connect<{}, DispatchProps, {}, ApplicationState>(
      null,
      mapDispatchToProps,
  )(footer);

export {DisplayChartFooter};
