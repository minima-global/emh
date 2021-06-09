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
  TokenProps,
  Token,
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
  tokensData: TokenProps
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
      if ( props.logsData?.data.length && props.tokensData?.data.length ) {
        props.logsData.data.map( ( log: LogsType, index: number ) => {
          if (!index) {
            tokens = {};
          }
          // const thisDate = new Date(+log.DATE);
          const thisData = log.DATA;
          const thisType = log.LOGGINGTYPE;
          const tokenInsertString = 'insert 0x';
          if ( thisType === Dbase.tables.txpow.name &&
             thisData.includes(tokenInsertString, 0)) {
            const thisTokenId = '0x' + thisData.slice(
                tokenInsertString.length,
                thisData.indexOf(' ', tokenInsertString.length));
            // console.log('token id', thisTokenId);
            let tokenName = 'Minima';
            props.tokensData.data.forEach((token: Token) => {
              if ( token.tokenid == thisTokenId ) {
                tokenName = token.token;
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
          }
        });

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
  }, [props.logsData, props.tokensData]);

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
          {TokenVars.chartHeading}
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
            id='chartToken'
            ref={tokenCtx}
          />
        </div>
      </Grid>
    </>
  );
};

const mapStateToProps = (state: ApplicationState): StateProps => {
  return {
    logsData: state.logsData as LogsProps,
    tokensData: state.tokensData as TokenProps,
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
