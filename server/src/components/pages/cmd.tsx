import React from 'react';
import {connect} from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import * as Yup from 'yup';
import {useFormik} from 'formik';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import {themeStyles} from '../../styles';

import {
  ApplicationState,
  AppDispatch,
  CmdProps,
} from '../../store/types';

import {command} from '../../store/app/blockchain/actions';

import {
  GeneralError,
  Cmd as CmdConfig,
} from '../../config';

const cmdSchema = Yup.object().shape({
  cmd: Yup.string()
      .required(`${GeneralError.required}`),
});

interface StateProps {
  cmd: CmdProps
}

interface DispatchProps {
  command: (cmd: string) => void
}

type Props = StateProps & DispatchProps

const display = (props: Props) => {
  const classes = themeStyles();
  const formik = useFormik({
    initialValues: {
      cmd: '',
    },
    enableReinitialize: true,
    validationSchema: cmdSchema,
    onSubmit: (values: any) => {
      props.command(values.cmd);
    },
  });

  return (
    <Grid className={classes.loggedInContent} item container xs={12}>

      <Grid item container xs={12}>

        <Grid item container justify="flex-start" xs={12}>

          <Typography variant="h2">
            {CmdConfig.heading}
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
              xs={2}
            >
              <label htmlFor="amount">{CmdConfig.cmd}</label>
            </Grid>
            <Grid item container xs={10}>
              <TextField
                fullWidth
                size="small"
                name="cmd"
                type="text"
                value={formik.values.cmd}
                onChange={formik.handleChange}
                InputProps={{disableUnderline: true}}
              />
            </Grid>
            <Grid item container className={classes.formError} xs={12}>
              {formik.errors.cmd && formik.touched.cmd ? (
                <div>{formik.errors.cmd}</div>
              ) : null}
            </Grid>

          </Grid>

          <Grid item container xs={12}>

            <Grid item container xs={2}>
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
                {CmdConfig.cmdButton}
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
    cmd: state.cmdData as CmdProps,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => {
  return {
    command: (cmd: string) => dispatch(command(cmd)),
  };
};

export const Cmd = connect<StateProps, DispatchProps, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(display);
