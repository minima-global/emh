import React, {useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';

import Select from 'react-select'

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import * as Yup from 'yup';
import {useFormik} from 'formik';

import {themeStyles} from '../../styles';

import {
  GeneralError,
  Wallet as WalletVars,
} from '../../config';

import {
  ApplicationState,
  AppDispatch,
  BalanceProps,
  AddressProps,
  TxProps,
  NewSend,
  SelectOptionType
} from '../../store/types';

import {initTx, send, addresses} from '../../store/app/EMH/actions';

const tokenSchema = Yup.object().shape({
  token: Yup.object()
    .required(`${GeneralError.required}`)
    .nullable(),
  amount: Yup.number()
      .required(GeneralError.required),
  address: Yup.string()
      .required(GeneralError.required)
      .max(255, GeneralError.lengthError255),
  statevars: Yup.string()
      .max(255, GeneralError.lengthError255)
});

interface StateProps {
  balanceData: BalanceProps
  addressData: AddressProps
  tx: TxProps
}

interface DispatchProps {
  initTx: () => void
  send: (token: NewSend) => void
  addresses: () => void
}

type Props = StateProps & DispatchProps

const display = (props: Props) => {

  const isFirstRun = useRef(true);
  const [tokens, setTokens] = useState([] as SelectOptionType[])
  const [thisToken, setThisToken] = useState({} as SelectOptionType)

  const [addresses, setAddresses] = useState([] as SelectOptionType[])
  const [thisAddress, setThisAddress] = useState({} as SelectOptionType)

  const classes = themeStyles();

  useEffect(() => {

    if ( isFirstRun.current ) {
      isFirstRun.current = false;
      props.initTx();
      props.addresses();
    } else {    

      props.addressData.data.forEach(address => {

        const addressOption: SelectOptionType = {
          value: address.miniaddress,
          label: address.miniaddress
        }
        addresses.push(addressOption);
      });
      setThisAddress(addresses[Math.floor(Math.random() * addresses.length)]);

      props.balanceData.data.forEach(balance => {

        const tokenOption: SelectOptionType = {
          value: balance.tokenid,
          label: balance.token
        }
        tokens.push(tokenOption);
      });
    }

  }, [props.balanceData, props.addressData])

  const formik = useFormik({
    initialValues: {
      token: null,
      amount: 1,
      address: '',
      statevars: ''
    },
    enableReinitialize: true,
    validationSchema: tokenSchema,
    onSubmit: (values: any) => {
      const tokenInfo: NewSend = {
        amount: values.amount,
        address: values.address,
        tokenid: values.token.value,
        statevars: values.statevars
      };

      // console.log('sending: ', tokenInfo);
      props.send(tokenInfo);
    },
  });

  const doSetToken = (token: SelectOptionType | null | undefined) => {

    if ( token ) {

      setThisToken(token)
    }
  }

  const doSetAddress = (address: SelectOptionType | null | undefined) => {

    if ( address ) {

      setThisAddress(address)
    }
  }

  return (

    <Grid item container alignItems='flex-start' xs={12}>

      <Grid item container xs={12}>

        <Grid item container justify="flex-start" xs={12}>

          <Typography variant="h2">
            {WalletVars.heading}
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

        <Grid item container justify="flex-start" xs={12}>

          <Typography variant="h3">
            {WalletVars.receiveHeading}
          </Typography>

        </Grid>

        <Grid className={classes.formFields} item container xs={12}>
          <Grid
            item
            container
            className={classes.formLabel}
            justify="flex-start"
            alignItems="center"
            xs={4}
            lg={2}
          >
            <label htmlFor="myAddress">{WalletVars.receiveAddress}</label>
          </Grid>
          <Grid item container xs={10}>
            <div style={{width: '100%'}}>
              <Select
                className={classes.select}
                size="small"
                value={thisAddress}
                onChange={selectedOption => {
                  doSetAddress(selectedOption)
                }}
                options={addresses}
                name="myAddress"
              />
            </div>
          </Grid>
        </Grid>

        <Grid className={classes.formFields} item container xs={12}>

          <Grid
            item
            container
            className={classes.formLabel}
            justify="flex-start"
            alignItems="center"
            xs={4}
            lg={2}
          >
            <label htmlFor="currentAddress">{WalletVars.currentAddress}</label>
          </Grid>        

          <Grid item container xs={8} lg={10}>

            <TextField
              disabled={true}
              fullWidth
              size="small"
              name="currentAddress"
              type="text"
              value={thisAddress.value}
            />

          </Grid>

        </Grid>

        <Grid item container justify="flex-start" xs={12}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 4000 20"
          >
            <line x2="4000" stroke="#001C32" width="100%" height="100%"/>
          </svg>
        </Grid>

        <Grid item container justify="flex-start" xs={12}>

          <Typography variant="h3">
            {WalletVars.sendHeading}
          </Typography>

        </Grid>

        <form onSubmit={formik.handleSubmit} className={classes.formSubmit}>

          <Grid className={classes.formFields} item container xs={12}>

            <Grid
              item
              container
              className={classes.formLabel}
              justify="flex-start"
              alignItems="center"
              xs={4}
              lg={2}
            >
              <label htmlFor="token">{WalletVars.token}</label>
            </Grid>
            <Grid item container xs={8} lg={10}>
              <div style={{width: '100%'}}>
                <Select
                  className={classes.select}
                  size="small"
                  value={thisToken}
                  onChange={selectedOption => {
                    doSetToken(selectedOption)
                    const thisValue = selectedOption ? selectedOption : {}
                    formik.setFieldValue("token", thisValue)
                  }}
                  options={tokens}
                  name="token"
                />
              </div>
            </Grid>
            {formik.errors.token && formik.touched.token ? (
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
                  {formik.errors.token}
                </Grid>
              </>
              ) : null
            }
          </Grid>

          <Grid className={classes.formFields} item container xs={12}>

            <Grid
              item
              container
              className={classes.formLabel}
              justify="flex-start"
              alignItems="center"
              xs={4}
              lg={2}
            >
              <label htmlFor="amount">{WalletVars.amount}</label>
            </Grid>
            <Grid item container xs={8} lg={10}>
              <TextField
                fullWidth
                size="small"
                name="amount"
                type="text"
                value={formik.values.amount}
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

          <Grid className={classes.formFields} item container xs={12}>

            <Grid
              item
              container
              className={classes.formLabel}
              justify="flex-start"
              alignItems="center"
              xs={4}
              lg={2}
            >
              <label htmlFor="amount">{WalletVars.address}</label>
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

          <Grid className={classes.formFields} item container xs={12}>

            <Grid
              item
              container
              className={classes.formLabel}
              justify="flex-start"
              alignItems="center"
              xs={4}
              lg={2}
            >
              <label htmlFor="statevars">{WalletVars.statevars}</label>
            </Grid>
            <Grid item container xs={8} lg={10}>
              <TextField
                fullWidth
                size="small"
                name="statevars"
                type="text"
                value={formik.values.statevars}
                onChange={formik.handleChange}
                InputProps={{disableUnderline: true}}
              />
            </Grid>
            {formik.errors.statevars && formik.touched.statevars ? (
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
                  {formik.errors.statevars}
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
                {WalletVars.sendButton}
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

        {props.tx.data.summary}

      </Grid>

    </Grid>
  );
};

const mapStateToProps = (state: ApplicationState): StateProps => {
  const balances = state.balance as BalanceProps
  const addresses = state.address as AddressProps
  return {
    balanceData: balances,
    addressData: addresses,
    tx: state.tx as TxProps,
  }
};

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => {
  return {
    initTx: () => dispatch(initTx()),
    send: (token: NewSend) => dispatch(send(token)),
    addresses: () => dispatch(addresses()),
  };
};

export const Wallet = connect<StateProps, DispatchProps, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(display);
