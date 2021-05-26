import React, {useEffect, useState, useRef} from 'react';
import {connect} from 'react-redux';

import Grid from '@material-ui/core/Grid';
// import Button from '@material-ui/core/Button';

import Chart from 'chart.js/auto';

import {themeStyles} from '../styles';

import {
  ApplicationState,
  AppDispatch,
  LogsProps,
  Logs as LogsType,
  TokenProps,
  Token,
} from '../store/types';

import {getDbaseEntries} from '../store/app/dbase/actions';

import {
  Dbase,
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

type ChartData = {
  [token: string]: number
}

const getRandomColour = () => {
  const letters = '0123456789ABCDEF'.split('');
  let color = '#';
  for (let i = 0; i < 6; i++ ) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const getRandomColourForEachToken = (count: number) => {
  const data =[];
  for (let i = 0; i < count; i++) {
    data.push(getRandomColour());
  }
  return data;
};

const chart = (props: Props) => {
  const isFirstRun = useRef(true);
  const classes = themeStyles();
  // eslint-disable-next-line no-unused-vars
  const [tokens, setTokens] = useState({} as ChartData);
  const chartCtx = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if ( isFirstRun.current ) {
      isFirstRun.current = false;

      props.getDbaseEntries(
          Dbase.tables.log.name,
          'DATE',
          'DESC');
    } else {
      if ( props.logsData?.data.length && props.tokensData?.data.length ) {
        props.logsData.data.map( ( log: LogsType, index: number ) => {
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
              tokens[tokenName] = 1;
            } else {
              tokens[tokenName] += 1;
            }
          }
        });
        const ctx = chartCtx.current;
        if ( ctx ) {
          new Chart(ctx, {
            type: 'pie',
            data: {
              labels: Object.keys(tokens).map((key: string) => key),
              datasets: [{
                data: Object.values(tokens).map((value: number) => value),
                backgroundColor:
                getRandomColourForEachToken(Object.keys(tokens).length),
              }],
            },
          });
        }
      }
    }
  }, [props.logsData, props.tokensData]);

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
        <Grid item container className={classes.formSummary} xs={2}>
          <canvas
            ref={chartCtx}
          />
        </Grid>
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
