import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {themeStyles} from '../styles';

import {
  ApplicationState,
  AppDispatch,
  ActionTypes,
  TriggersProps,
  Triggers as TriggersType,
  TriggerActionTypes,
  TxData,
} from '../store/types';

import {initTx, getDbaseEntries} from '../store/app/blockchain/actions';

import {
  Dbase,
  SQL,
  Triggers as TriggerVars,
} from '../config';

interface StateProps {
  tx: TxData
  triggersData: TriggersProps
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
          Dbase.tables.trigger.name,
          TriggerActionTypes.TRIGGER_SUCCESS,
          TriggerActionTypes.TRIGGER_FAILURE,
      );
    } else {
      const txSummary: string = props.tx.summary;
      if ( txSummary != summary ) {
        setSummary(txSummary);
        if ( txSummary === SQL.insertSuccess ) {
          props.getDbaseEntries(
              Dbase.tables.trigger.name,
              TriggerActionTypes.TRIGGER_SUCCESS,
              TriggerActionTypes.TRIGGER_FAILURE,
          );
        }
      }
    }
  }, [props.triggersData, props.tx]);

  return (

    <>
      <Grid item container alignItems="flex-start" xs={12}>

        <Grid item container xs={12}>

          <Grid item container justify="flex-start" xs={3}>
            <Typography variant="h5">
              {TriggerVars.endpoint}
            </Typography>
          </Grid>
          <Grid item container justify="flex-start" xs={3}>
            <Typography variant="h5">
              {TriggerVars.command}
            </Typography>
          </Grid>
          <Grid item container justify="flex-start" xs={3}>
            <Typography variant="h5">
              {TriggerVars.setParams}
            </Typography>
          </Grid>
          <Grid item container justify="flex-start" xs={3}>
            <Typography variant="h5">
              {TriggerVars.params}
            </Typography>
          </Grid>

        </Grid>

        <Grid item container className={classes.formSummary} xs={12}>
          { props.triggersData.data.map(
              ( trigger: TriggersType, index: number ) => {
                const endpoint = trigger.ENDPOINT;
                const command = trigger.COMMAND;
                const setParams = trigger.SETPARAMS;
                const params = trigger.PARAMS;

                const rowclass = index % 2 ? classes.evenRow : classes.oddRow;

                return (
                  <React.Fragment key={index}>

                    <Grid className={rowclass} item container xs={12}>

                      <Grid item container justify="flex-start" xs={3}>
                        <Typography variant="body1">
                          {endpoint}
                        </Typography>
                      </Grid>
                      <Grid item container justify="flex-start" xs={3}>
                        <Typography variant="body1">
                          {command}
                        </Typography>
                      </Grid>
                      <Grid item container justify="flex-start" xs={3}>
                        <Typography variant="body1">
                          {setParams}
                        </Typography>
                      </Grid>
                      <Grid item container justify="flex-start" xs={3}>
                        <Typography variant="body1">
                          {params}
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
    triggersData: state.triggersData as TriggersProps,
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

const ListTriggers = connect<StateProps, DispatchProps, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(list);

export {ListTriggers};
