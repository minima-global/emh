import React, {useEffect, useState, useRef} from 'react';
import {connect} from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';

import Chart from 'chart.js/auto';

// import {themeStyles} from '../styles';

import {
  ApplicationState,
  AppDispatch,
  LogsProps,
  Logs as LogsType,
} from '../store/types';

import {getDbaseEntries} from '../store/app/dbase/actions';

import {
  Dbase,
  Addresses as AddressVars,
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
  [address: string]: number
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
  const isFirstRun = useRef(true);
  // const classes = themeStyles();
  // eslint-disable-next-line no-unused-vars
  const [address, setAddress] = useState({} as ChartData);
  const addressCtx = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let chart: any;
    if ( isFirstRun.current ) {
      isFirstRun.current = false;

      props.getDbaseEntries(
          Dbase.tables.log.name,
          'DATE',
          'DESC');
    } else {
      if ( props.logsData?.data.length ) {
        props.logsData.data.map( ( log: LogsType, index: number ) => {
        // const thisDate = new Date(+log.DATE);
          const thisData = log.DATA;
          const thisType = log.LOGGINGTYPE;
          const addressInsertString = 'insert Mx';
          if ( thisType === Dbase.tables.txpow.name &&
             thisData.includes(addressInsertString, 0)) {
            const thisAddressId = 'Mx' + thisData.slice(
                addressInsertString.length,
                thisData.indexOf(' ', addressInsertString.length));
            // console.log('address id', thisAddressId);
            // console.log('address name', addressName);
            const addressDetails = address[thisAddressId];
            if (!addressDetails) {
              address[thisAddressId] = 1;
            } else {
              address[thisAddressId] += 1;
            }
          }
        });
        const ctx = addressCtx.current;
        if ( ctx ) {
          chart = new Chart(ctx, {
            type: 'pie',
            data: {
              labels: Object.keys(address).map((key: string) => key),
              datasets: [{
                data: Object.values(address).map((value: number) => value),
                backgroundColor:
                getRandomColourForEachAddress(Object.keys(address).length),
              }],
            },
          });
        }
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
      <Grid item container alignItems="flex-start" xs={12}>
        <Typography variant="h3">
          {AddressVars.chartHeading}
        </Typography>
        <canvas
          id='chartAddress'
          ref={addressCtx}
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

const ChartAddresses = connect<StateProps, DispatchProps, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(chart);

export {ChartAddresses};
