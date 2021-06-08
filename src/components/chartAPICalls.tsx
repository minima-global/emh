import React, {useEffect, useState, useRef} from 'react';
import {connect} from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';

import Chart from 'chart.js/auto';

import {theme} from '../styles';

import {
  ApplicationState,
  AppDispatch,
  LogsProps,
  Logs as LogsType,
} from '../store/types';

import {getDbaseEntries} from '../store/app/dbase/actions';

import {
  Dbase,
  API as APIVars,
} from '../config';

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

type Props = StateProps & DispatchProps

type ChartData = {
  [call: string]: number
}

const getRandomColour = () => {
  const letters = '0123456789ABCDEF'.split('');
  let color = '#';
  for (let i = 0; i < 6; i++ ) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const getRandomColourForEachAddress = (count: number) => {
  const data =[];
  for (let i = 0; i < count; i++) {
    data.push(getRandomColour());
  }
  return data;
};

const chart = (props: Props) => {
  // const classes = themeStyles();
  // eslint-disable-next-line no-unused-vars
  let [call, setCall] = useState({} as ChartData);
  const callCtx = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let chart: any;
    if ( props.logsData?.data.length ) {
      props.logsData.data.map( ( log: LogsType, index: number ) => {
        if (!index) {
          call = {};
        }
        // const thisDate = new Date(+log.DATE);
        if ( log.LOGGINGTYPE === Dbase.extraLogTypes.API ) {
          // console.log(log.LOGGINGTYPEID);
          const callDetails = call[log.LOGGINGTYPEID];
          if (!callDetails) {
            call[log.LOGGINGTYPEID] = 1;
          } else {
            call[log.LOGGINGTYPEID] += 1;
          }
        }
      });
      const ctx = callCtx.current;
      if ( ctx ) {
        chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: Object.keys(call).map((key: string) => key),
            datasets: [{
              data: Object.values(call).map((value: number) => value),
              backgroundColor:
                getRandomColourForEachAddress(Object.keys(call).length),
            }],
          },
          options: {
            indexAxis: 'y',
          },
        });
      }
    }
    return () => {
      chart ? chart.destroy() : null;
    };
  }, [props.logsData]);

  /*
  const getRecords = () => {
    props.getDbaseEntries(
        Dbase.tables.log.name,
        'DATE',
        'DESC');
  };
  */

  return (

    <>
      <Grid
        item
        container
        alignItems="flex-start"
        justify='flex-start'
        style={{
          padding: theme.spacing(2),
        }}
        xs={12}
      >
        <Typography variant="h3">
          {APIVars.chartHeading}
        </Typography>
        <canvas
          id='chartCall'
          ref={callCtx}
        />
      </Grid>
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

const ChartAPICalls = connect<StateProps, DispatchProps, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(chart);

export {ChartAPICalls};
