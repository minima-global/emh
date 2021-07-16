import React, {useEffect, useState, useRef} from 'react';
import {connect} from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import * as Yup from 'yup';
import {useFormik} from 'formik';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from 'react-select';

import Spinner from 'react-spinner-material';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import {theme, themeStyles} from '../../styles';

import {
  ApplicationState,
  AppDispatch,
  CmdProps,
  TriggersProps,
  TriggerActionTypes,
  SuccessAndFailType,
} from '../../store/types';

import {initCmd, command} from '../../store/app/blockchain/actions';
import {getTableEntries} from '../../store/app/dbase/actions';

import {
  Dbase,
  GeneralError,
  Cmd as CmdVars,
} from '../../config/vars';

const cmdSchema = Yup.object().shape({
  trigger: Yup.object()
      .required(GeneralError.required),
  params: Yup.string()
      .max(255, GeneralError.lengthError255),
});

interface StateProps {
  triggersData: TriggersProps
  cmd: CmdProps
}

interface DispatchProps {
  initCmd: () => void
  command: (endpoint: string, cmd: string) => void
  getTableEntries: (
    query: string,
    actionType: SuccessAndFailType,
  ) => void
}

type Props = StateProps & DispatchProps

type SelectOptionType = {
  value: number
  label: string
}

const display = (props: Props) => {
  const isFirstRun = useRef(true);
  // eslint-disable-next-line no-unused-vars
  const [triggers, setTriggers] = useState([] as SelectOptionType[]);
  const [thisTrigger, setThisTrigger] = useState({} as SelectOptionType);
  const [paramsDisabled, setParamsDisabled] = useState(false);
  const [params, setParams] = useState('');

  const [thisCommand, setThisCommand] = useState([] as string[]);
  const [runDialogue, setRunDialogue] = useState(false);
  const [running, setRunning] = useState(false);

  const actionType: SuccessAndFailType = {
    success: TriggerActionTypes.TRIGGER_SUCCESS,
    fail: TriggerActionTypes.TRIGGER_FAILURE,
  };

  const query = 'SELECT * FROM ' + Dbase.tables.trigger.name;

  const classes = themeStyles();
  const formik = useFormik({
    initialValues: {
      trigger: thisTrigger,
      params: params,
    },
    enableReinitialize: true,
    validationSchema: cmdSchema,
    onSubmit: (values: any) => {
      const endpoint = props.triggersData.data[values.trigger.value].ENDPOINT;
      let command = props.triggersData.data[values.trigger.value].CMD;

      // get the format of the command
      if ( props.triggersData.data[values.trigger.value].FORMAT ) {
        const format = (
          props.triggersData.data[values.trigger.value].FORMAT).split(' ');

        /**
        * get the parameters for the command, and split into key value pairs
        */
        let setParams: string[] | null = [];
        const setParamKeys: string[] = [];
        const setParamValues: string[] = [];
        if ( props.triggersData.data[values.trigger.value].SETPARAMS ) {
          // regex from https://stackoverflow.com/questions/16261635/javascript-split-string-by-space-but-ignore-space-in-quotes-notice-not-to-spli
          setParams = (
            props.triggersData.data[values.trigger.value].SETPARAMS)
              .match(/(?:[^\s"]+|"[^"]*")+/g);
          if ( setParams ) {
            for ( let i = 0; i < setParams.length; i++ ) {
              const tuple = setParams[i].split('=');
              setParamKeys.push(tuple[0]);
              setParamValues.push(tuple[1]);
            }
          }
        }

        let params: string[] | null = [];
        const paramKeys: string[] = [];
        const paramValues: string[] = [];
        if ( values.params ) {
          params = values.params.match(/(?:[^\s"]+|"[^"]*")+/g);
          if ( params ) {
            for ( let i = 0; i < params.length; i++ ) {
              const tuple = params[i].split('=');
              paramKeys.push(tuple[0]);
              paramValues.push(tuple[1]);
            }
          }
        }

        /**
         * for each parameter specified in the command format,
         * grab the value from its parameter key
         * and construct the requisite command
         */
        format.forEach((param) => {
          const setIndex = setParamKeys.indexOf(param);
          const paramIndex = paramKeys.indexOf(param);
          if ( setIndex !== -1 ) {
            command += ' ' + setParamValues[setIndex];
          } else if ( paramIndex !== -1 ) {
            if ( endpoint === Dbase.defaultAPI.tokenCreate.endpoint ) {
              if (paramValues[paramIndex].includes('"')) {
                command += ' ' + param + ':' + paramValues[paramIndex];
              } else {
                command += ' ' + param + ':"' + paramValues[paramIndex] + '"';
              }
            } else {
              command += ' ' + paramValues[paramIndex];
            }
          }
        });
      }

      // console.log(endpoint, ' this command: ', command);
      // props.command(endpoint, command.trim());
      setThisCommand([endpoint, command.trim()]);
      setRunDialogue(true);
    },
  });

  useEffect(() => {
    if ( isFirstRun.current ) {
      isFirstRun.current = false;
      // SELECT * FROM API LIMIT 0, 2147483647
      props.getTableEntries(query, actionType);
    } else {
      props.triggersData.data.forEach((trigger, index) => {
        const thisTrigger: SelectOptionType = {
          value: index,
          label: trigger.ENDPOINT,
        };
        triggers.push(thisTrigger);
      });

      if (props.cmd?.data ) {
        setRunning(false);
      }
    }
  }, [props.triggersData, props.cmd]);

  const doSetTrigger = (trigger: SelectOptionType | null | undefined) => {
    if ( trigger ) {
      setThisTrigger(trigger);
      if ( props.triggersData.data[trigger.value].PARAMS ) {
        setParams(props.triggersData.data[trigger.value].PARAMS);
        setParamsDisabled(false);
      } else {
        setParams('');
        setParamsDisabled(true);
      }
    }
  };

  const runCommand = () => {
    setRunDialogue(false);
    setRunning(true);
    props.command(thisCommand[0], thisCommand[1]);
  };

  const runDialogueClose = () => {
    setRunDialogue(false);
  };

  const clear = () => {
    // do something
    setThisTrigger({} as SelectOptionType);
    setParams('');
    props.initCmd();
  };

  return (
    <>
      <Grid
        container
        alignItems='flex-start'
        style={{
          marginLeft: theme.spacing(8),
          marginRight: theme.spacing(8),
        }}>

        <Grid item container xs={12}>

          <Grid item container justifyContent="flex-start" xs={12}>

            <Typography variant="h2">
              {CmdVars.heading}
            </Typography>

          </Grid>

          <Paper elevation={5} className={classes.urlForm}>

            <form onSubmit={formik.handleSubmit} className={classes.formSubmit}>
              <Grid item container xs={12}>

                <Grid
                  item
                  container
                  className={classes.formLabel}
                  justifyContent="flex-start"
                  alignItems="center"
                  xs={4}
                  lg={2}
                >
                  <label htmlFor="trigger">{CmdVars.trigger}</label>
                </Grid>
                <Grid item container xs={8} lg={10}>
                  <div
                    style={{
                      width: '100%',
                      marginBottom: theme.spacing(1),
                    }}
                  >
                    <Select
                      className={classes.select}
                      size="small"
                      value={thisTrigger}
                      onChange={(selectedOption) => {
                        doSetTrigger(selectedOption);
                        const thisValue = selectedOption ? selectedOption : {};
                        formik.setFieldValue('trigger', thisValue);
                      }}
                      options={triggers}
                      name='trigger'
                    />
                  </div>
                </Grid>
                {formik.errors.trigger && formik.touched.trigger ? (
                  <>
                    <Grid item container xs={2}>
                      <Typography variant="body1">
                        &nbsp;
                      </Typography>
                    </Grid>
                    <Grid
                      className={classes.formError}
                      item container
                      xs={10}
                    >
                      {formik.errors.trigger}
                    </Grid>
                  </>
                    ) : null
                }
              </Grid>

              <Grid item container xs={12}>

                <Grid
                  item
                  container
                  className={classes.formLabel}
                  justifyContent="flex-start"
                  alignItems="center"
                  xs={4}
                  lg={2}
                >
                  <label htmlFor="params">{CmdVars.params}</label>
                </Grid>

                <Grid
                  item
                  container
                  className={classes.formEntry}
                  xs={8}
                  lg={10}
                >

                  <TextField
                    fullWidth
                    disabled={paramsDisabled}
                    size="small"
                    name="params"
                    type="text"
                    value={formik.values.params}
                    onChange={formik.handleChange}
                    InputProps={{disableUnderline: true}}
                  />
                </Grid>
                {formik.errors.params && formik.touched.params ? (
                  <>
                    <Grid item container xs={2}>
                      <Typography variant="body1">
                        &nbsp;
                      </Typography>
                    </Grid>
                    <Grid
                      className={classes.formError}
                      item container
                      xs={10}
                    >
                      {formik.errors.params}
                    </Grid>
                  </>
                    ) : null
                }
              </Grid>

              <Grid item container xs={12}>

                <Grid item container xs={10}>
                  <Typography variant="h2">
                    &nbsp;
                  </Typography>
                </Grid>

                <Grid
                  className={classes.formButton}
                  item
                  container
                  justifyContent='flex-end'
                  xs={1}
                >
                  <Button
                    onClick={() => clear()}
                    size='medium'
                    variant='outlined'
                    color='primary'
                    disabled={running}
                    style={{
                      marginRight: theme.spacing(1),
                      color: '#C8C8D4',
                      borderColor: '#C8C8D4',
                      background: 'white',
                      backgroundColor: 'white',
                    }}
                  >
                    {CmdVars.clearButton}
                  </Button>
                </Grid>

                <Grid
                  className={classes.formButton}
                  item
                  container
                  justifyContent='flex-end'
                  xs={1}
                >
                  <Button
                    type='submit'
                    size='medium'
                    variant='outlined'
                    color='secondary'
                    disabled={running}
                    style={{
                      color: 'white',
                    }}
                  >
                    {CmdVars.cmdButton}
                  </Button>
                </Grid>

              </Grid>

            </form>

          </Paper>

        </Grid>

      </Grid>

      <Grid
        container
        alignItems='flex-start'
        style={{
          marginLeft: theme.spacing(8),
          marginRight: theme.spacing(8),
        }}
      >

        { running ?

          <Grid item container justifyContent="center">
            <Spinner
              radius={40}
              color={'#001C32'}
              stroke={5}
              visible={running}
            />
          </Grid> : (

            <Grid
              item
              container
              alignItems='flex-start'
              justifyContent='flex-start'
              xs={12}
              style={{
                width: '800px',
                maxHeight: '500px',
                overflow: 'auto',
              }}
            >
              <pre>
                { Object.keys(props.cmd.data).length ?
                  (((JSON.stringify(props.cmd.data, undefined, 2)))
                      .replace(/(^[ \t]*\n)/gm, ''))
                      .replace(/\\n/g, '\n') : null
                }
              </pre>
            </Grid>
          )
        }
      </Grid>

      <Modal
        aria-labelledby={CmdVars.confirmRun}
        aria-describedby={CmdVars.confirmRun}
        open={runDialogue}
        onClose={runDialogueClose}
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
        <Fade in={runDialogue}>
          <div className={classes.modalSub}>
            <Typography
              variant="body1"
              style={{
                textAlign: 'center',
              }}>
              {CmdVars.confirmRun}
            </Typography>
            <br/>
            <div className={classes.modalSubIcons}>
              <Button
                onClick={runDialogueClose}
                size='medium'
                variant='outlined'
                color='primary'
                style={{
                  marginRight: theme.spacing(1),
                  color: '#C8C8D4',
                  borderColor: '#C8C8D4',
                  background: 'white',
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  justifyContent: 'center',
                }}
              >
                {CmdVars.noRun}
              </Button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button
                onClick={() => runCommand()}
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
                {CmdVars.yesRun}
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

/* Removes first and last characters and then any empty lines
{((JSON.stringify(props.cmd.data, undefined, 2))
    .slice(1,-1))
    .replace(/(^[ \t]*\n)/gm, "")
}
*/

const mapStateToProps = (state: ApplicationState): StateProps => {
  return {
    triggersData: state.triggersData as TriggersProps,
    cmd: state.cmdData as CmdProps,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => {
  return {
    initCmd: () => dispatch(initCmd()),
    command: (
        endpoint: string,
        cmd: string) => dispatch(command(endpoint, cmd)),
    getTableEntries: (
        query: string,
        actionType: SuccessAndFailType,
    ) => dispatch(getTableEntries(query, actionType)),
  };
};

export const Cmd = connect<StateProps, DispatchProps, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(display);
