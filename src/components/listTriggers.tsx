import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

// import useMediaQuery from '@material-ui/core/useMediaQuery';

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
  Dbase,
  SQL,
  Triggers as TriggerVars,
} from '../config/vars';

import {Local} from '../config/paths';

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
  const [showTrigger, setShowTrigger] = useState({} as TriggersType);
  const [showDialogue, setShowDialogue] = useState(false);

  const actionType: SuccessAndFailType = {
    success: TriggerActionTypes.TRIGGER_SUCCESS,
    fail: TriggerActionTypes.TRIGGER_FAILURE,
  };

  const query = 'SELECT * FROM ' + Dbase.tables.trigger.name;

  const classes = themeStyles();
  // const largeScreen = useMediaQuery(theme.breakpoints.up('lg'));

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

  const showInfo = (trigger: TriggersType) => {
    setShowTrigger(trigger);
    setShowDialogue(true);
  };

  const showDialogueClose = () => {
    setShowDialogue(false);
  };

  return (

    <>
      <Grid item container alignItems="flex-start" xs={12}>

        <Grid item container xs={12}>

          <Grid
            item
            container
            justify="flex-start"
            xs={3}
          >
            <Typography variant="h5" noWrap={true}>
              {TriggerVars.endpoint}
            </Typography>
          </Grid>
          <Grid
            item
            container
            justify="flex-start"
            xs={1}
          >
            <Typography variant="h5" noWrap={true}>
              {TriggerVars.public}
            </Typography>
          </Grid>
          <Grid
            item
            container
            justify="flex-start"
            xs={7}
          >
            <Typography variant="h5" noWrap={true}>
              {TriggerVars.url}
            </Typography>
          </Grid>
          <Grid
            item
            container
            justify="flex-start"
            xs={1}
          >
            <Typography variant="h5" noWrap={true}>
              &nbsp;
            </Typography>
          </Grid>

        </Grid>

        <Grid
          className={classes.formSummary}
          item
          container
          justify="flex-start"
          xs={12}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 4000 20"
          >
            <line x2="4000" stroke="#001C32" width="100%" height="100%"/>
          </svg>
        </Grid>

        <Grid item container className={classes.formSummary} xs={12}>
          { props.triggersData?.data.map(
              ( trigger: TriggersType, index: number ) => {
                const endpoint = trigger.ENDPOINT;
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
                        xs={3}
                      >
                        <Button
                          onClick={() => showInfo(trigger)}
                          size='medium'
                          variant='outlined'
                          style={{
                            margin: 0,
                            paddingLeft: 0,
                            paddingRight: 0,
                            paddingTop: theme.spacing(1),
                            paddingBottom: theme.spacing(1),
                            color: '#001C32',
                            background: '#F0F0FA',
                            backgroundColor: '#F0F0FA',
                            justifyContent: 'flex-start',
                          }}
                        >
                          {endpoint}
                        </Button>
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
                        xs={7}
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

      <Modal
        aria-labelledby={TriggerVars.showTrigger}
        aria-describedby={TriggerVars.showTrigger}
        open={showDialogue}
        onClose={showDialogueClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Fade in={showDialogue}>
          <div className={classes.showModalSub}>
            <Typography
              variant="body1"
            >
              {TriggerVars.endpoint}: {showTrigger.ENDPOINT}
            </Typography>
            <br/>
            <Typography
              variant="body1"
            >
              {TriggerVars.public}:
              {showTrigger.ISPUBLIC === 'true' ? 'Yes': 'No'}
            </Typography>
            <br/>
            <Typography
              variant="body1"
            >
              {TriggerVars.url}: &nbsp;
              {`${Local.base}${Local.apiBase}${showTrigger.ENDPOINT}`}
            </Typography>
            <br/>
            <Typography
              variant="body1"
            >
              {TriggerVars.command}: &nbsp;
              {showTrigger.CMD ? showTrigger.CMD : 'None'}
            </Typography>
            <br/>
            <Typography
              variant="body1"
            >
              {TriggerVars.format}: &nbsp;
              {showTrigger.FORMAT ? showTrigger.FORMAT : 'None'}
            </Typography>
            <br/>
            <Typography
              variant="body1"
            >
              {TriggerVars.setParams}: &nbsp;
              {showTrigger.SETPARAMS ? showTrigger.SETPARAMS : 'None'}
            </Typography>
            <br/>
            <Typography
              variant="body1"
            >
              {TriggerVars.params}: &nbsp;
              {showTrigger.PARAMS ? showTrigger.PARAMS : 'None'}
            </Typography>
            <br/>
            <div className={classes.modalSubIcons}>
              <Button
                onClick={showDialogueClose}
                size='medium'
                variant='outlined'
                color='secondary'
                style={{
                  color: 'white',
                  background: '#317AFF',
                  backgroundColor: '#317AFF',
                  borderRadius: '10px',
                  justifyContent: 'center',
                }}
              >
                {TriggerVars.closeTrigger}
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
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
