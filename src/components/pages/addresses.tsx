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
  GeneralError,
  Addresses as AddressVars,
  Dbase,
} from '../../config';

import {addRow} from '../../store/app/dbase/actions';

import {ListAddresses} from '../listAddresses';

import {
  ApplicationState,
  AppDispatch,
  AddressProps,
} from '../../store/types';

const callSchema = Yup.object().shape({
  address: Yup.string()
      .required(GeneralError.required)
      .length(34, AddressVars.mxLengthError)
      .matches(/^Mx[a-zA-Z0-9]+$/, AddressVars.mxFormatError),
  url: Yup.string()
      .url(AddressVars.urlError)
      .max(255, GeneralError.lengthError255),
});

interface StateProps {
  address: AddressProps
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
  const classes = themeStyles();
  const formik = useFormik({
    initialValues: {
      address: '',
      url: '',
    },
    enableReinitialize: true,
    validationSchema: callSchema,
    onSubmit: (values: any) => {
      props.addRow(
          Dbase.tables.address.name,
          Dbase.tables.address.columns,
          [values.address, values.url],
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
                justify="flex-start"
                alignItems="center"
                xs={4}
                lg={2}
              >
                <label htmlFor="address">{AddressVars.address}</label>
              </Grid>
              <Grid item container xs={8} lg={10}>
                <TextField
                  fullWidth
                  size="small"
                  name="address"
                  type="text"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  InputProps={{disableUnderline: true}}
                />
              </Grid>
              {formik.errors.address && formik.touched.address ? (
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
                    {formik.errors.address}
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
                <label htmlFor="url">{AddressVars.url}</label>
              </Grid>
              <Grid item container xs={8} lg={10}>
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

              <Grid item container xs={10}>
                <Typography variant="h2">
                  &nbsp;
                </Typography>
              </Grid>

              <Grid
                className={classes.formButton}
                item
                container
                justify='flex-end'
                xs={2}
              >
                <Button
                  type='submit'
                  color="primary"
                  size='medium'
                  variant="contained"
                >
                  {AddressVars.callButton}
                </Button>
              </Grid>

            </Grid>

          </form>
        </Paper>

        { <ListAddresses /> }

      </Grid>

    </Grid>
  );
};

const mapStateToProps = (state: ApplicationState): StateProps => {
  return {
    address: state.addressData as AddressProps,
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

export const Addresses =
connect<StateProps, DispatchProps, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(display);
