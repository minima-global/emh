import React from 'react';
import {connect} from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import * as Yup from 'yup';
import {useFormik} from 'formik';

import {themeStyles} from '../../styles';

import {
  Dbase,
  GeneralError,
  Triggers as TriggerVars,
} from '../../config';

import {addTrigger} from '../../store/app/blockchain/actions';

import {ListTriggers} from '../listTriggers';

import {
  ApplicationState,
  AppDispatch,
  TriggersProps,
} from '../../store/types';

const triggerSchema = Yup.object().shape({
  endpoint: Yup.string()
      .required(GeneralError.required),
  command: Yup.string()
      .required(GeneralError.required),
  setParams: Yup.string()
      .required(GeneralError.required),
  params: Yup.string()
      .required(GeneralError.required),
});

interface StateProps {
  triggers: TriggersProps
}

interface DispatchProps {
  addTrigger: (
      table: string,
      endpoint: string,
      command: string,
      setParams: string,
      params: string,
  ) => void
}

type Props = StateProps & DispatchProps

const display = (props: Props) => {
  const classes = themeStyles();
  const formik = useFormik({
    initialValues: {
      endpoint: '',
      command: '',
      setParams: '',
      params: '',
    },
    enableReinitialize: true,
    validationSchema: triggerSchema,
    onSubmit: (values: any) => {
      props.addTrigger(
          Dbase.tables.
              trigger.name,
          values.endpoint,
          values.command,
          values.setParams,
          values.params,
      );
    },
  });

  return (

    <Grid item container alignItems='flex-start' xs={12}>

      <Grid item container xs={12}>

        <Grid item container justify="flex-start" xs={12}>

          <Typography variant="h2">
            {TriggerVars.heading}
          </Typography>

        </Grid>

        <Grid item container justify="flex-start" xs={12}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2000"
            height="4"
          >
            <line x2="2000" stroke="#317AFF" strokeWidth={4} />
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
              <label htmlFor="endpoint">{TriggerVars.endpoint}</label>
            </Grid>
            <Grid item container xs={8} lg={10}>
              <TextField
                fullWidth
                size="small"
                name="endpoint"
                type="text"
                value={formik.values.endpoint}
                onChange={formik.handleChange}
                InputProps={{disableUnderline: true}}
              />
            </Grid>
            {formik.errors.endpoint && formik.touched.endpoint ? (
              <>
                <Grid item container xs={4} lg={2}>
                  <Typography variant="body1">
                    &nbsp;
                  </Typography>
                </Grid>
                <Grid
                  className={classes.formError}
                  item container
                  xs={8}
                  lg={10}
                >
                  {formik.errors.endpoint}
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
              <label htmlFor="command">{TriggerVars.command}</label>
            </Grid>
            <Grid item container xs={8} lg={10}>
              <TextField
                fullWidth
                size="small"
                name="command"
                type="text"
                value={formik.values.command}
                onChange={formik.handleChange}
                InputProps={{disableUnderline: true}}
              />
            </Grid>
            {formik.errors.command && formik.touched.command ? (
              <>
                <Grid item container xs={4} lg={2}>
                  <Typography variant="body1">
                    &nbsp;
                  </Typography>
                </Grid>
                <Grid
                  className={classes.formError}
                  item container
                  xs={8}
                  lg={10}
                >
                  {formik.errors.command}
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
              <label htmlFor="setParams">{TriggerVars.setParams}</label>
            </Grid>
            <Grid item container xs={8} lg={10}>
              <TextField
                fullWidth
                size="small"
                name="setParams"
                type="text"
                value={formik.values.setParams}
                onChange={formik.handleChange}
                InputProps={{disableUnderline: true}}
              />
            </Grid>
            {formik.errors.setParams && formik.touched.setParams ? (
              <>
                <Grid item container xs={4} lg={2}>
                  <Typography variant="body1">
                    &nbsp;
                  </Typography>
                </Grid>
                <Grid
                  className={classes.formError}
                  item container
                  xs={8}
                  lg={10}
                >
                  {formik.errors.setParams}
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
              <label htmlFor="params">{TriggerVars.params}</label>
            </Grid>
            <Grid item container xs={8} lg={10}>
              <TextField
                fullWidth
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
                <Grid item container xs={4} lg={2}>
                  <Typography variant="body1">
                    &nbsp;
                  </Typography>
                </Grid>
                <Grid
                  className={classes.formError}
                  item container
                  xs={8}
                  lg={10}
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
                {TriggerVars.triggerButton}
              </Button>
            </Grid>

          </Grid>

        </form>

        <Grid item container justify="flex-start" xs={12}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2000"
            height="4"
          >
            <line x2="2000" stroke="#317AFF" strokeWidth={4} />
          </svg>
        </Grid>

        { <ListTriggers /> }

      </Grid>

    </Grid>
  );
};

const mapStateToProps = (state: ApplicationState): StateProps => {
  return {
    triggers: state.triggersData as TriggersProps,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => {
  return {
    addTrigger: (
        table: string,
        endpoint: string,
        command: string,
        setParams: string,
        params: string,
    ) => dispatch(addTrigger(table, endpoint, command, setParams, params)),
  };
};

export const Triggers =
  connect<StateProps, DispatchProps, {}, ApplicationState>(
      mapStateToProps,
      mapDispatchToProps,
  )(display);
