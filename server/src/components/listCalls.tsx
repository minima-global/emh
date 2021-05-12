import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {themeStyles} from '../styles';

import {
  ApplicationState,
  AppDispatch,
  ActionTypes,
  CallsProps,
  Calls as CallsType,
  CallActionTypes,
  TxData,
} from '../store/types';

import {initTx, getDbaseEntries} from '../store/app/blockchain/actions';

import {
  Dbase,
  SQL,
  Calls as CallVars,
} from '../config';

interface StateProps {
  tx: TxData
  callsData: CallsProps
}

interface DispatchProps {
  initTx: () => void
  getDbaseEntries: (
      dbase: string,
      succcessAction: ActionTypes,
      failAction: ActionTypes
  ) => void
}

type Props = StateProps & DispatchProps

const list = (props: Props) => {
  const [summary, setSummary] = useState('');
  const isFirstRun = useRef(true);

  const classes = themeStyles();

  useEffect(() => {
    if ( isFirstRun.current ) {
      isFirstRun.current = false;
      props.initTx();
      props.getDbaseEntries(
          Dbase.tables.call.name,
          CallActionTypes.CALL_SUCCESS,
          CallActionTypes.CALL_FAILURE,
      );
    } else {
      const txSummary: string = props.tx.summary;
      if ( txSummary != summary ) {
        setSummary(txSummary);
        if ( txSummary === SQL.insertSuccess ) {
          props.getDbaseEntries(
              Dbase.tables.call.name,
              CallActionTypes.CALL_SUCCESS,
              CallActionTypes.CALL_FAILURE,
          );
        }
      }
    }
  }, [props.callsData, props.tx]);

  return (

    <>
      <Grid item container alignItems="flex-start" xs={12}>

        <Grid item container xs={12}>

          <Grid item container justify="flex-start" xs={6}>
            <Typography variant="h5">
              {CallVars.address}
            </Typography>
          </Grid>
          <Grid item container justify="flex-start" xs={6}>
            <Typography variant="h5">
              {CallVars.url}
            </Typography>
          </Grid>

        </Grid>

        <Grid item container className={classes.formSummary} xs={12}>
          { props.callsData.data.map( ( call: CallsType, index: number ) => {
            const address = call.ADDRESS;
            const url = call.URL;

            const rowclass = index % 2 ? classes.evenRow : classes.oddRow;

            return (
              <React.Fragment key={index}>

                <Grid className={rowclass} item container xs={12}>

                  <Grid item container justify="flex-start" xs={6}>
                    <Typography variant="body1">
                      {address}
                    </Typography>
                  </Grid>
                  <Grid item container justify="flex-start" xs={6}>
                    <Typography variant="body1">
                      {url}
                    </Typography>
                  </Grid>

                </Grid>

              </React.Fragment>
            );
          })}
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = (state: ApplicationState): StateProps => {
  return {
    tx: state.tx.data as TxData,
    callsData: state.callsData as CallsProps,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => {
  return {
    initTx: () => dispatch(initTx()),
    getDbaseEntries: (
        dbase: string,
        succcessAction: ActionTypes,
        failAction: ActionTypes,
    ) => dispatch(getDbaseEntries(dbase, succcessAction, failAction)),
  };
};

const ListCalls = connect<StateProps, DispatchProps, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(list);

export {ListCalls};
