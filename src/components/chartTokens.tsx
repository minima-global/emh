import React, {useEffect, useState, useRef} from 'react';
import {connect} from 'react-redux';

import {Token as Balance} from 'minima';

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
  BalanceProps,
  ChartValues,
  ChartData,
} from '../store/types';

import {getDbaseEntries} from '../store/app/dbase/actions';

import {
  Dbase,
  Tokens as TokenVars,
  Chart as ChartVars,
} from '../config';

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

type Props = StateProps & DispatchProps

const getRandomColour = () => {
  const letters = '0123456789ABCDEF'.split('');
  let color = '#';
  for (let i = 0; i < 6; i++ ) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const chart = (props: Props) => {
  const isFirstRun = useRef(true);
  // const classes = themeStyles();
  // eslint-disable-next-line no-unused-vars
  let [tokens, setTokens] = useState({} as ChartData);
  const [chartHeight, setChartHeight] = useState(0);
  const tokenCtx = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let chart: any;
    if ( isFirstRun.current ) {
      isFirstRun.current = false;

      props.getDbaseEntries(
          Dbase.tables.log.name,
          'DATE',
          'DESC');
    } else {
      if ( props.logsData?.data.length && props.balanceData?.data.length ) {
        props.logsData.data.map( ( log: LogsType, index: number ) => {
          if (!index) {
            tokens = {};
          }
          // const thisDate = new Date(+log.DATE);
          console.log(log.DATA);
          const dataJSON = JSON.parse(log.DATA);
          console.log('here?');
          // console.log(dataJSON);
          const thisAction = dataJSON.action;
          const thisData = dataJSON.data;
          const thisType = log.LOGGINGTYPE;
          const tokenInsertString = Dbase.tables.txpow.name + ' 0x';
          if ( thisType === Dbase.tables.txpow.name &&
               thisAction === 'insert' &&
               thisData.includes(tokenInsertString, 0)) {
            const thisTokenId = '0x' + thisData.slice(
                tokenInsertString.length,
                thisData.indexOf(' ', tokenInsertString.length));
            console.log('token id', thisTokenId);
            let tokenName = 'Minima';
            props.balanceData.data.forEach((token: Balance) => {
              if ( token.tokenid == thisTokenId ) {
                tokenName = token.token;
                // console.log('token name', tokenName);
              }
            });
            // console.log('token name', tokenName);
            const tokenDetails = tokens[tokenName];
            if (!tokenDetails) {
              const chartValues: ChartValues = {
                count: 1,
                colour: getRandomColour(),
              };
              tokens[tokenName] = chartValues;
            } else {
              tokens[tokenName].count += 1;
            }
            console.log('tokens', tokens);
          }
        });

        console.log('egaswdefasdf', tokens);

        setChartHeight(Object.keys(tokens).length * ChartVars.gridHeight);
        const ctx = tokenCtx.current;
        if ( ctx ) {
          chart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: Object.keys(tokens).map((key: string) => key),
              datasets: [{
                data:
                  Object.values(
                      tokens).map((value: ChartValues) => value.count),
                backgroundColor:
                  Object.values(
                      tokens).map((value: ChartValues) => value.colour),
                barThickness: ChartVars.barThickness,
                maxBarThickness: ChartVars.barThickness + 2,
              }],
            },
            options: {
              plugins: {
                legend: {
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
                        tokens).map((value: ChartValues) => value.colour),
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
    }
    return () => {
      chart ? chart.destroy() : null;
    };
  }, [props.logsData, props.balanceData]);

  return (

    <>
      <Grid
        item
        container
        alignItems="flex-start"
        style={{
          padding: theme.spacing(2),
        }}
        xs={12}
      >
        <Typography variant="h3">
          {TokenVars.chartHeading}
        </Typography>

        <Grid
          item
          container
          alignItems="flex-start"
          style={{
            marginTop: theme.spacing(1),
            width: '100%',
            maxHeight: '300px',
            overflow: 'auto',
          }}
          xs={12}
        >
          <div
            style={{
              height: chartHeight,
              width: '100%',
              paddingRight: theme.spacing(1),
            }}
          >
            <canvas
              id='chartToken'
              ref={tokenCtx}
            />
          </div>
        </Grid>
      </Grid>
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
