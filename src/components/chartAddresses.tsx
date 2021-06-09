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
  ChartValues,
  ChartData,
} from '../store/types';

import {getDbaseEntries} from '../store/app/dbase/actions';

import {
  Dbase,
  Addresses as AddressVars,
  Chart as ChartVars,
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

const getRandomColour = () => {
  const letters = '0123456789ABCDEF'.split('');
  let color = '#';
  for (let i = 0; i < 6; i++ ) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

/*
const getRandomColourForEachAddress = (count: number) => {
  const data =[];
  for (let i = 0; i < count; i++) {
    data.push(getRandomColour());
  }
  return data;
};
*/

const chart = (props: Props) => {
  // const classes = themeStyles();
  // eslint-disable-next-line no-unused-vars
  let [address, setAddress] = useState({} as ChartData);
  const [chartHeight, setChartHeight] = useState(0);
  const addressCtx = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let chart: any;
    if ( props.logsData?.data.length ) {
      props.logsData.data.map( ( log: LogsType, index: number ) => {
        if (!index) {
          address = {};
        }
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
            const chartValues: ChartValues = {
              count: 1,
              colour: getRandomColour(),
            };
            address[thisAddressId] = chartValues;
          } else {
            address[thisAddressId].count += 1;
          }
        }
      });

      setChartHeight(Object.keys(address).length * ChartVars.gridHeight);
      const ctx = addressCtx.current;
      if ( ctx ) {
        chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: Object.keys(address).map((key: string) => key),
            datasets: [{
              data:
                Object.values(address).map((value: ChartValues) => value.count),
              backgroundColor:
                Object.values(
                    address).map((value: ChartValues) => value.colour),
              barThickness: ChartVars.barThickness,
              maxBarThickness: ChartVars.barThickness + 2,
            }],
          },
          options: {
            plugins: {
              legend: {
                display: false,
              },
              gridLines: {
                display: false,
              },
              title: {
                display: false,
              },
            },
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            scales: {
              y: {
                grid: {
                  display: false,
                },
                ticks: {
                  color: Object.values(
                      address).map((value: ChartValues) => value.colour),
                  mirror: true,
                  labelOffset: ChartVars.labelOffset * -1,
                  z: 1,
                },
              },
              x: {
                position: 'top',
                grid: {
                  display: false,
                },
              },
            },
          },
        });
      }
    }
    return () => {
      chart ? chart.destroy() : null;
    };
  }, [props.logsData]);

  return (

    <>
      <Grid
        item
        container
        alignItems="flex-start"
        justify='flex-start'
        style={{
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(2),
          paddingTop: theme.spacing(2),
        }}
        xs={12}
      >
        <Typography variant="h3">
          {AddressVars.chartHeading}
        </Typography>
      </Grid>
      <Grid
        item
        container
        alignItems="flex-start"
        justify='flex-start'
        style={{
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(2),
          paddingBottom: theme.spacing(2),
        }}
        xs={12}
      >
        <div
          style={{
            height: chartHeight,
            width: '100%',
          }}
        >
          <canvas
            id='chartAddress'
            ref={addressCtx}
          />
        </div>
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
