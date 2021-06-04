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
  GeneralError,
  Tokens as TokenVars,
} from '../../config';

// eslint-disable-next-line max-len
// 127.0.0.1:9004/api/EMH/?command=tokenCreate&name=AnotherTest&amount=1&description="Another Test Token"&script="RETURN TRUE"&icon=""&proof=""


import {
  ApplicationState,
  AppDispatch,
  TxProps,
  NewToken,
} from '../../store/types';

import {createToken} from '../../store/app/EMH/actions';

const tokenSchema = Yup.object().shape({
  name: Yup.string()
      .required(GeneralError.required)
      .max(255, GeneralError.lengthError255),
  amount: Yup.number()
      .required(GeneralError.required),
  description: Yup.string()
      .required(GeneralError.required)
      .max(255, GeneralError.lengthError255),
  icon: Yup.string()
      .url(TokenVars.urlError)
      .max(255, GeneralError.lengthError255),
  proof: Yup.string()
      .url(TokenVars.urlError)
      .max(255, GeneralError.lengthError255),
});

interface StateProps {
  tx: TxProps
}

interface DispatchProps {
  createToken: (token: NewToken) => void
}

type Props = StateProps & DispatchProps

const display = (props: Props) => {
  const classes = themeStyles();
  const formik = useFormik({
    initialValues: {
      name: '',
      amount: 0,
      description: '',
      icon: '',
      proof: '',
    },
    enableReinitialize: true,
    validationSchema: tokenSchema,
    onSubmit: (values: any) => {
      const tokenInfo: NewToken = {
        name: values.name,
        amount: values.amount,
        description: values.description,
        script: 'RETURN TRUE',
        icon: values.icon,
        proof: values.proof,
      };
      props.createToken(tokenInfo);
    },
  });

  return (

    <Grid item container alignItems='flex-start' xs={12}>

      <Grid item container xs={12}>

        <Grid item container justify="flex-start" xs={12}>

          <Typography variant="h2">
            {TokenVars.heading}
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
              <label htmlFor="name">{TokenVars.tokenName}</label>
            </Grid>
            <Grid item container xs={8} lg={10}>
              <TextField
                fullWidth
                size="small"
                name="name"
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                InputProps={{disableUnderline: true}}
              />
            </Grid>
            {formik.errors.name && formik.touched.name ? (
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
                  {formik.errors.name}
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
              <label htmlFor="amount">{TokenVars.amount}</label>
            </Grid>
            <Grid item container xs={8} lg={10}>
              <TextField
                fullWidth
                size="small"
                name="amount"
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                InputProps={{disableUnderline: true}}
              />
            </Grid>
            {formik.errors.amount && formik.touched.amount ? (
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
                  {formik.errors.amount}
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
              <label htmlFor="icon">{TokenVars.icon}</label>
            </Grid>
            <Grid item container xs={8} lg={10}>
              <TextField
                fullWidth
                size="small"
                name="icon"
                type="text"
                value={formik.values.icon}
                onChange={formik.handleChange}
                InputProps={{disableUnderline: true}}
              />
            </Grid>
            {formik.errors.icon && formik.touched.icon ? (
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
                  {formik.errors.icon}
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
              <label htmlFor="proof">{TokenVars.proof}</label>
            </Grid>
            <Grid item container xs={8} lg={10}>
              <TextField
                fullWidth
                size="small"
                name="url"
                type="text"
                value={formik.values.proof}
                onChange={formik.handleChange}
                InputProps={{disableUnderline: true}}
              />
            </Grid>
            {formik.errors.proof && formik.touched.proof ? (
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
                  {formik.errors.proof}
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
                {TokenVars.tokenButton}
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

      </Grid>

    </Grid>
  );
};

const mapStateToProps = (state: ApplicationState): StateProps => {
  return {
    tx: state.tx as TxProps,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => {
  return {
    createToken: (token: NewToken) => dispatch(createToken(token)),
  };
};

export const Token = connect<StateProps, DispatchProps, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(display);
