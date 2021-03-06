import React, {useEffect, useState, useRef} from 'react';
import {connect} from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import * as Yup from 'yup';
import {useFormik} from 'formik';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from 'react-select';

import {themeStyles} from '../../styles';

import {
  ApplicationState,
  AppDispatch,
  CmdProps,
  TriggersProps,
} from '../../store/types';

import {command, getDbaseEntries} from '../../store/app/blockchain/actions';

import {
  Dbase,
  GeneralError,
  Cmd as CmdVars,
} from '../../config';

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
  command: (endpoint: string, cmd: string) => void
  getDbaseEntries: (dbase: string) => void,
}

type Props = StateProps & DispatchProps

type SelectOptionType = {
  value: number
  label: string
}

const display = (props: Props) => {
  const isFirstRun = useRef(true);
  const [triggers, setTriggers] = useState([] as SelectOptionType[]);
  const [thisTrigger, setThisTrigger] = useState({} as SelectOptionType);
  const [paramsDisabled, setParamsDisabled] = useState(false);
  const [params, setParams] = useState('');

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
      if ( props.triggersData.data[values.trigger.value].SETPARAMS ) {
        command =
          command + ' ' +
          props.triggersData.data[values.trigger.value].SETPARAMS + ' ' +
          values.params;
      } else {
        command =
          command + ' ' +
          values.params;
      }
      // console.log(command);
      props.command(endpoint, command.trim());
    },
  });

  useEffect(() => {
    if ( isFirstRun.current ) {
      isFirstRun.current = false;
      props.getDbaseEntries(Dbase.tables.trigger.name);
    } else {
      props.triggersData.data.forEach((trigger, index) => {
        const thisTrigger: SelectOptionType = {
          value: index,
          label: trigger.ENDPOINT,
        };
        triggers.push(thisTrigger);
      });
    }
  }, [props.triggersData]);

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

  return (
    <Grid item container alignItems='flex-start' xs={12}>

      <Grid item container xs={12}>

        <Grid item container justify="flex-start" xs={12}>

          <Typography variant="h2">
            {CmdVars.heading}
          </Typography>

        </Grid>

        <Grid item container justify="flex-start" xs={12}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 4000 20"
          >
            <line x2="4000" stroke="#001C32" width="100%" height="100%"/>
          </svg>
        </Grid>

        <form onSubmit={formik.handleSubmit} className={classes.formSubmit}>
          <Grid item container xs={12}>

            <Grid
              item
              container
              className={classes.formLabel}
              justify="flex-start"
              alignItems="center"
              xs={4}
              lg={2}
            >
              <label htmlFor="trigger">{CmdVars.trigger}</label>
            </Grid>
            <Grid item container xs={8} lg={10}>
              <div style={{width: '100%'}}>
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
              justify="flex-start"
              alignItems="center"
              xs={4}
              lg={2}
            >
              <label htmlFor="params">{CmdVars.params}</label>
            </Grid>
            <Grid item container xs={8} lg={10}>
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

            <Grid item container xs={4} lg={2}>
              <Typography variant="h2">
                &nbsp;
              </Typography>
            </Grid>

            <Grid className={classes.formButton} item container xs={2}>
              <Button
                type='submit'
                color="primary"
                size='medium'
                variant="contained"
              >
                {CmdVars.cmdButton}
              </Button>
            </Grid>

          </Grid>

        </form>

        <Grid item container justify="flex-start" xs={12}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 4000 20"
          >
            <line x2="4000" stroke="#001C32" width="100%" height="100%"/>
          </svg>
        </Grid>

        <div>
          <pre>
            {(((JSON.stringify(props.cmd.data, undefined, 2))
                .slice(1, -1))
                .replace(/(^[ \t]*\n)/gm, ''))
                .replace(/\\n/g, '\n')
            }
          </pre>
        </div>

      </Grid>
    </Grid>
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
    command: (
        endpoint: string,
        cmd: string) => dispatch(command(endpoint, cmd)),
    getDbaseEntries: (dbase: string) => dispatch(getDbaseEntries(dbase)),
  };
};

export const Cmd = connect<StateProps, DispatchProps, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(display);
