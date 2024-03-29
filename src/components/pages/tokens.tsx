import React from 'react';
import {connect} from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

import * as Yup from 'yup';
import {useFormik} from 'formik';

import {themeStyles} from '../../styles';

import {
  Dbase,
  GeneralError,
  Tokens as TokenVars,
} from '../../config/vars';

import {addRow} from '../../store/app/dbase/actions';

import {ListTokens} from '../listTokens';

import {
  ApplicationState,
  AppDispatch,
} from '../../store/types';

const tokenSchema = Yup.object().shape({
  tokenId: Yup.string()
      .required(GeneralError.required)
      .min(4, TokenVars.tokenLengthError)
      .max(130, TokenVars.tokenLengthError),
  url: Yup.string()
      .url(TokenVars.urlError)
      .max(255, GeneralError.lengthError255),
});

interface DispatchProps {
  addRow: (
    table: string,
    columns: Array<string>,
    values: Array<string>,
  ) => void
}

type Props = DispatchProps

const display = (props: Props) => {
  const classes = themeStyles();
  const formik = useFormik({
    initialValues: {
      tokenId: '',
      url: '',
    },
    enableReinitialize: true,
    validationSchema: tokenSchema,
    onSubmit: (values: any) => {
      props.addRow(
          Dbase.tables.token.name,
          Dbase.tables.token.columns,
          [values.tokenId, values.url],
      );
    },
  });

  return (

    <Grid
      container
      alignItems='flex-start'
    >
      <Grid item container xs={12}>

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
                <label htmlFor="tokenId">{TokenVars.tokenId}</label>
              </Grid>
              <Grid item container className={classes.formEntry} xs={8} lg={10}>
                <TextField
                  fullWidth
                  size="small"
                  name="tokenId"
                  type="text"
                  value={formik.values.tokenId}
                  onChange={formik.handleChange}
                  InputProps={{disableUnderline: true}}
                />
              </Grid>
              {formik.errors.tokenId && formik.touched.tokenId ? (
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
                    {formik.errors.tokenId}
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
                <label htmlFor="url">{TokenVars.url}</label>
              </Grid>
              <Grid item container className={classes.formEntry} xs={8} lg={10}>
                <TextField
                  fullWidth
                  size="small"
                  name="url"
                  type="text"
                  value={formik.values.url}
                  onChange={formik.handleChange}
                  InputProps={{disableUnderline: true}}
                />
              </Grid>
              {formik.errors.url && formik.touched.url ? (
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
                    {formik.errors.url}
                  </Grid>
                </>
                ) : null
              }
            </Grid>

            <Grid item container xs={12}>

              <Grid item container xs={11}>
                <Typography variant="h2">
                  &nbsp;
                </Typography>
              </Grid>

              <Grid
                className={classes.formButton}
                item
                container
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
                  {TokenVars.tokenButton}
                </Button>
              </Grid>

            </Grid>

          </form>
        </Paper>

        { <ListTokens /> }

      </Grid>

    </Grid>
  );
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

export const Tokens = connect<{}, DispatchProps, {}, ApplicationState>(
    null,
    mapDispatchToProps,
)(display);
