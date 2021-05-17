import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import {theme, themeStyles} from '../styles';

import {
  ApplicationState,
  AppDispatch,
  TriggersProps,
  Triggers as TriggersType,
  TxData,
} from '../store/types';

import {
  initTx,
  deleteRow,
  getDbaseEntries,
} from '../store/app/blockchain/actions';

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
  deleteRow: (
    table: string,
    columns: Array<string>,
    values: Array<string>) => void
  getDbaseEntries: (dbase: string) => void
}

type Props = StateProps & DispatchProps


const list = (props: Props) => {
  const [summary, setSummary] = useState('');
  const isFirstRun = useRef(true);
  const [isDisabled, setIsDisabled] = useState([] as boolean[]);

  const classes = themeStyles();

  useEffect(() => {
    if ( isFirstRun.current ) {
      isFirstRun.current = false;
      props.initTx();
      props.getDbaseEntries(Dbase.tables.trigger.name);
    } else {
      if ( props.triggersData.data.length != isDisabled.length ) {
        for (let i = 0; i < props.triggersData.data.length; i++ ) {
          isDisabled[i] = false;
        }
      }
      const txSummary: string = props.tx.summary;
      if ( txSummary != summary ) {
        setSummary(txSummary);
        if ( (txSummary === SQL.insertSuccess ) ||
             (txSummary === SQL.deleteSuccess ) ) {
          props.getDbaseEntries(Dbase.tables.trigger.name);
        }
      }
    }
  }, [props.triggersData, props.tx]);

  const deleteTrigger = (trigger: TriggersType, index: number) => {
    isDisabled[index] = true;
    props.initTx();
    props.deleteRow(
        Dbase.tables.trigger.name,
        Dbase.tables.trigger.key.name,
        [trigger.ENDPOINT],
    );
  };

  return (

    <>
      <Grid item container alignItems="flex-start" xs={12}>

        <Grid item container xs={12}>

          <Grid item container justify="flex-start" xs={2}>
            <Typography variant="h5">
              {TriggerVars.endpoint}
            </Typography>
          </Grid>
          <Grid item container justify="flex-start" xs={2}>
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
          <Grid item container justify="flex-end" xs={2}>
            <Typography variant="h5">
              &nbsp;
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

                      <Grid
                        item
                        container
                        alignItems='center'
                        justify="flex-start"
                        xs={2}
                      >
                        <Typography variant="body1">
                          {endpoint}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        container
                        alignItems='center'
                        justify="flex-start"
                        xs={2}
                      >
                        <Typography variant="body1">
                          {command}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        container
                        alignItems='center'
                        justify="flex-start"
                        xs={3}
                      >
                        <Typography variant="body1">
                          {setParams}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        container
                        alignItems='center'
                        justify="flex-start"
                        xs={3}
                      >
                        <Typography variant="body1">
                          {params}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        container
                        justify="flex-end"
                        xs={2}
                      >
                        <Button
                          onClick={() => deleteTrigger(trigger, index)}
                          disabled={isDisabled[index]}
                          style={{
                            marginTop: theme.spacing(0.5),
                            background: 'linear-gradient(#FF0000, #FF0000)',
                          }}
                        >
                          {TriggerVars.deleteButton}
                        </Button>
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
    deleteRow: (
        table: string,
        columns: Array<string>,
        values: Array<string>) => dispatch(deleteRow(table, columns, values)),
    getDbaseEntries: (dbase: string) => dispatch(getDbaseEntries(dbase)),
  };
};

const ListTriggers = connect<StateProps, DispatchProps, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(list);

export {ListTriggers};
