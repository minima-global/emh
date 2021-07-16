import React, {useState, ChangeEvent} from 'react';
import {connect} from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';

import * as Yup from 'yup';
import {useFormik} from 'formik';

import {theme, themeStyles} from '../../styles';

import {
  Dbase,
  GeneralError,
  Triggers as TriggerVars,
} from '../../config/vars';

import {addRow} from '../../store/app/dbase/actions';

import {ListTriggers} from '../listTriggers';

import {
  ApplicationState,
  AppDispatch,
  TriggersProps,
} from '../../store/types';

const triggerSchema = Yup.object().shape({
  endpoint: Yup.string()
      .required(GeneralError.required)
      .max(255, GeneralError.lengthError255),
  command: Yup.string()
      .required(GeneralError.required)
      .max(255, GeneralError.lengthError255),
  format: Yup.string()
      .max(255, GeneralError.lengthError255),
  setParams: Yup.string()
      .max(255, GeneralError.lengthError255),
  params: Yup.string()
      .max(255, GeneralError.lengthError255),
  public: Yup.boolean(),
});

interface StateProps {
  triggers: TriggersProps
}

interface DispatchProps {
  addRow: (
    table: string,
    columns: Array<string>,
    values: Array<string>,
  ) => void
}

type Props = StateProps & DispatchProps

const display = (props: Props) => {
  const [iterateChecked, setIterateChecked] = useState(false);

  const classes = themeStyles();

  const formik = useFormik({
    initialValues: {
      endpoint: '',
      command: '',
      format: '',
      setParams: '',
      params: '',
      public: false,
    },
    enableReinitialize: true,
    validationSchema: triggerSchema,
    onSubmit: (values: any) => {
      const isPublic = iterateChecked ? 1 : 0;
      props.addRow(
          Dbase.tables.trigger.name,
          Dbase.tables.trigger.columns,
          [
            values.endpoint,
            values.command,
            values.format,
            values.setParams,
            values.params,
            isPublic]);
    },
  });

  const handleIterate = (event: ChangeEvent<HTMLInputElement>) => {
    setIterateChecked(event.target.checked);
  };

  return (

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
            {TriggerVars.heading}
          </Typography>

        </Grid>

        <Paper elevation={5} className={classes.triggerForm}>

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
                <label htmlFor="endpoint">{TriggerVars.endpoint}</label>
              </Grid>
              <Grid item container className={classes.formEntry} xs={8} lg={10}>
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
                justifyContent="flex-start"
                alignItems="center"
                xs={4}
                lg={2}
              >
                <label htmlFor="command">{TriggerVars.command}</label>
              </Grid>
              <Grid item container className={classes.formEntry} xs={8} lg={10}>
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
                justifyContent="flex-start"
                alignItems="center"
                xs={4}
                lg={2}
              >
                <label htmlFor="format">{TriggerVars.format}</label>
              </Grid>
              <Grid item container className={classes.formEntry} xs={8} lg={10}>
                <TextField
                  fullWidth
                  size="small"
                  name="format"
                  type="text"
                  value={formik.values.format}
                  onChange={formik.handleChange}
                  InputProps={{disableUnderline: true}}
                />
              </Grid>
              {formik.errors.format && formik.touched.format ? (
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
                    {formik.errors.format}
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
                <label htmlFor="setParams">{TriggerVars.setParams}</label>
              </Grid>
              <Grid item container className={classes.formEntry} xs={8} lg={10}>
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
                justifyContent="flex-start"
                alignItems="center"
                xs={4}
                lg={2}
              >
                <label htmlFor="params">{TriggerVars.params}</label>
              </Grid>
              <Grid item container className={classes.formEntry} xs={8} lg={10}>
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
              <Grid
                item
                container
                className={classes.formLabel}
                justifyContent="flex-start"
                alignItems="center"
                xs={4}
                lg={2}
              >
                <label htmlFor="public">{TriggerVars.public}</label>
              </Grid>
              <Grid item container className={classes.formEntry} xs={7} lg={9}>
                <Switch
                  size='medium'
                  color="primary"
                  name="public"
                  checked={iterateChecked}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    handleIterate(event);
                    formik.handleChange(event);
                  }}
                  inputProps={{'aria-label': 'primary checkbox'}}
                />
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
                  style={{
                    color: 'white',
                  }}
                >
                  {TriggerVars.triggerButton}
                </Button>

              </Grid>
            </Grid>

          </form>

        </Paper>

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
    addRow: (
        table: string,
        columns: Array<string>,
        values: Array<string>,
    ) => dispatch(addRow(table, columns, values)),
  };
};

export const Triggers =
  connect<StateProps, DispatchProps, {}, ApplicationState>(
      mapStateToProps,
      mapDispatchToProps,
  )(display);
