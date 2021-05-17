import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import {themeStyles} from '../styles';

import {
  ApplicationState,
  AppDispatch,
  ActionTypes,
  AddressProps,
  Address as AddressType,
  AddressActionTypes,
  TxData,
} from '../store/types';

import {
  initTx,
  deleteRow,
  getDbaseEntries,
} from '../store/app/blockchain/actions';

import {
  Dbase,
  SQL,
  Addresses as AddressVars,
} from '../config';

interface StateProps {
  tx: TxData
  addressData: AddressProps
}

interface DispatchProps {
  initTx: () => void
  deleteRow: (
    table: string,
    column: string,
    value: string) => void
  getDbaseEntries: (
      dbase: string,
      succcessAction: ActionTypes,
      failAction: ActionTypes
  ) => void
}

type Props = StateProps & DispatchProps

const list = (props: Props) => {
  const [summary, setSummary] = useState('');
  const isFirstRun = useRef(true);
  const [isDisabled, setIsDisabled] = useState([] as boolean[]);

  const classes = themeStyles();

  useEffect(() => {
    if ( isFirstRun.current ) {
      isFirstRun.current = false;
      props.initTx();
      props.getDbaseEntries(
          Dbase.tables.call.name,
          AddressActionTypes.ADDRESS_SUCCESS,
          AddressActionTypes.ADDRESS_FAILURE,
      );
    } else {
      if ( props.addressData.data.length != isDisabled.length ) {
        for (let i = 0; i < props.addressData.data.length; i++ ) {
          isDisabled[i] = false;
        }
      }

      const txSummary: string = props.tx.summary;
      if ( txSummary != summary ) {
        setSummary(txSummary);
        if ( (txSummary === SQL.insertSuccess ) ||
             (txSummary === SQL.deleteSuccess ) ) {
          props.getDbaseEntries(
              Dbase.tables.call.name,
              AddressActionTypes.ADDRESS_SUCCESS,
              AddressActionTypes.ADDRESS_FAILURE,
          );
        }
      }
    }
  }, [props.addressData, props.tx]);

  const deleteAddress = (call: AddressType, index: number) => {
    isDisabled[index] = true;
    props.initTx();
    props.deleteRow(
        Dbase.tables.call.name,
        Dbase.tables.call.key,
        call.ADDRESS,
    );
  };

  return (

    <>
      <Grid item container alignItems="flex-start" xs={12}>

        <Grid item container xs={12}>

          <Grid item container justify="flex-start" xs={5}>
            <Typography variant="h5">
              {AddressVars.address}
            </Typography>
          </Grid>
          <Grid item container justify="flex-start" xs={5}>
            <Typography variant="h5">
              {AddressVars.url}
            </Typography>
          </Grid>
          <Grid item container justify="flex-end" xs={2}>
            <Typography variant="h5">
              &nbsp;
            </Typography>
          </Grid>

        </Grid>

        <Grid item container className={classes.formSummary} xs={12}>
          { props.addressData.data.map(
              ( call: AddressType, index: number ) => {
                const address = call.ADDRESS;
                const url = call.URL;

                const rowclass = index % 2 ? classes.evenRow : classes.oddRow;

                return (
                  <React.Fragment key={index}>

                    <Grid className={rowclass} item container xs={12}>

                      <Grid item container justify="flex-start" xs={5}>
                        <Typography variant="body1">
                          {address}
                        </Typography>
                      </Grid>
                      <Grid item container justify="flex-start" xs={5}>
                        <Typography variant="body1">
                          {url}
                        </Typography>
                      </Grid>
                      <Grid item container justify="flex-end" xs={2}>
                        <Button
                          onClick={() => deleteAddress(call, index)}
                          disabled={isDisabled[index]}
                          style={{
                            background: 'linear-gradient(#FF0000, #FF0000)',
                          }}
                        >
                          {AddressVars.deleteButton}
                        </Button>
                      </Grid>

                    </Grid>

                  </React.Fragment>
                );
              })}
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = (state: ApplicationState): StateProps => {
  return {
    tx: state.tx.data as TxData,
    addressData: state.addressData as AddressProps,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => {
  return {
    initTx: () => dispatch(initTx()),
    deleteRow: (
        table: string,
        column: string,
        value: string) => dispatch(deleteRow(table, column, value)),
    getDbaseEntries: (
        dbase: string,
        succcessAction: ActionTypes,
        failAction: ActionTypes,
    ) => dispatch(getDbaseEntries(dbase, succcessAction, failAction)),
  };
};

const ListAddresses = connect<StateProps, DispatchProps, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(list);

export {ListAddresses};
