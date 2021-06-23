import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import {theme, themeStyles} from '../styles';

import {
  ApplicationState,
  AppDispatch,
  TriggersProps,
  Triggers as TriggersType,
  TriggerActionTypes,
  TxData,
  SuccessAndFailType,
} from '../store/types';

import {initTx} from '../store/app/blockchain/actions';
import {deleteRow, getTableEntries} from '../store/app/dbase/actions';

import {
  Local,
  Dbase,
  SQL,
  Triggers as TriggerVars,
} from '../config';

import closeDelete from '../images/closeDelete.png';

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
  getTableEntries: (
    query: string,
    actionType: SuccessAndFailType,
  ) => void
}

type Props = StateProps & DispatchProps


const list = (props: Props) => {
  const [summary, setSummary] = useState('');
  const isFirstRun = useRef(true);
  // eslint-disable-next-line no-unused-vars
  const [isDisabled, setIsDisabled] = useState([] as boolean[]);

  const actionType: SuccessAndFailType = {
    success: TriggerActionTypes.TRIGGER_SUCCESS,
    fail: TriggerActionTypes.TRIGGER_FAILURE,
  };

  const query = 'SELECT * FROM ' + Dbase.tables.trigger.name;

  const classes = themeStyles();
  const largeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  useEffect(() => {
    if ( isFirstRun.current ) {
      isFirstRun.current = false;
      props.initTx();
      // SELECT * FROM API LIMIT 0, 2147483647
      props.getTableEntries(query, actionType);
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
          props.getTableEntries(query, actionType);
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

          <Grid
            item
            container
            justify="flex-start"
            xs={2}
          >
            <Typography variant="h5" noWrap={true}>
              { largeScreen ?
                TriggerVars.endpoint:
                TriggerVars.smallEndpoint
              }
            </Typography>
          </Grid>
          <Grid
            item
            container
            justify="flex-start"
            xs={1}
          >
            <Typography variant="h5" noWrap={true}>
              { largeScreen ?
                TriggerVars.public:
                TriggerVars.smallPublic
              }
            </Typography>
          </Grid>
          <Grid
            item
            container
            justify="flex-start"
            xs={1}
          >
            <Typography variant="h5" noWrap={true}>
              { largeScreen ?
                TriggerVars.command:
                TriggerVars.smallCommand
              }
            </Typography>
          </Grid>
          <Grid
            item
            container
            justify="flex-start"
            xs={2}
          >
            <Typography variant="h5" noWrap={true}>
              { largeScreen ?
                TriggerVars.format:
                TriggerVars.smallFormat
              }
            </Typography>
          </Grid>
          <Grid
            item
            container
            justify="flex-start"
            xs={1}
          >
            <Typography variant="h5" noWrap={true}>
              { largeScreen ?
                TriggerVars.setParams:
                TriggerVars.smallSetParams
              }
            </Typography>
          </Grid>
          <Grid
            item
            container
            justify="flex-start"
            xs={2}
          >
            <Typography variant="h5" noWrap={true}>
              { largeScreen ?
                TriggerVars.params:
                TriggerVars.smallParams
              }
            </Typography>
          </Grid>
          <Grid
            item
            container
            justify="flex-start"
            xs={2}
          >
            <Typography variant="h5" noWrap={true}>
              { largeScreen ?
                TriggerVars.url:
                TriggerVars.smallUrl
              }
            </Typography>
          </Grid>
          <Grid
            item
            container
            justify="flex-end"
            xs={1}
          >
            <Typography variant="h5">
              &nbsp;
            </Typography>
          </Grid>

        </Grid>

        <Grid item container className={classes.formSummary} xs={12}>
          { props.triggersData?.data.map(
              ( trigger: TriggersType, index: number ) => {
                const endpoint = trigger.ENDPOINT;
                const command = trigger.CMD;
                const format = trigger.FORMAT;
                const setParams = trigger.SETPARAMS;
                const params = trigger.PARAMS;
                const isPublic = trigger.ISPUBLIC === 'true' ? 'Yes': 'No';

                // eslint-disable-next-line max-len
                // const rowclass = index % 2 ? classes.evenRow : classes.oddRow;

                return (
                  <React.Fragment key={index}>

                    <Grid className={classes.row} item container xs={12}>

                      <Grid
                        item
                        container
                        alignItems='center'
                        justify="flex-start"
                        xs={2}
                      >
                        <Typography
                          variant="body1"
                          noWrap={true}
                        >
                          {endpoint}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        container
                        alignItems='center'
                        justify="flex-start"
                        xs={1}
                      >
                        <Typography
                          variant="body1"
                          noWrap={true}
                        >
                          {isPublic}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        container
                        alignItems='center'
                        justify="flex-start"
                        xs={1}
                      >
                        <Typography
                          variant="body1"
                          noWrap={true}
                        >
                          {command}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        container
                        alignItems='center'
                        justify="flex-start"
                        xs={2}
                      >
                        <Typography
                          variant="body1"
                          noWrap={true}
                        >
                          {format}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        container
                        alignItems='center'
                        justify="flex-start"
                        xs={1}
                      >
                        <Typography
                          variant="body1"
                          noWrap={true}
                        >
                          {setParams}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        container
                        alignItems='center'
                        justify="flex-start"
                        xs={2}
                      >
                        <Typography
                          variant="body1"
                          noWrap={true}
                        >
                          {params}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        container
                        alignItems='center'
                        justify="flex-start"
                        xs={2}
                      >
                        <Typography
                          variant="body1"
                          noWrap={true}
                        >
                          {`${Local.base}${Local.apiBase}${endpoint}`}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        container
                        justify="flex-end"
                        xs={1}
                      >
                        <Button
                          onClick={() => deleteTrigger(trigger, index)}
                          style={{
                            margin: 0,
                            padding: 0,
                            background: '#F0F0FA',
                            justifyContent: 'flex-end',
                          }}
                        >
                          <img
                            className={classes.deleteIcon}
                            src={closeDelete}
                          />
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
    getTableEntries: (
        query: string,
        actionType: SuccessAndFailType,
    ) => dispatch(getTableEntries(query, actionType)),
  };
};

const ListTriggers = connect<StateProps, DispatchProps, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(list);

export {ListTriggers};
