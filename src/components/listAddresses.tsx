import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import useMediaQuery from '@material-ui/core/useMediaQuery';

// import {theme, themeStyles} from '../styles';
import {themeStyles} from '../styles';

import {
  ApplicationState,
  AppDispatch,
  AddressProps,
  Address as AddressType,
  AddressActionTypes,
  TxData,
  SuccessAndFailType,
} from '../store/types';

import {initTx} from '../store/app/blockchain/actions';
import {deleteRow, getTableEntries} from '../store/app/dbase/actions';

import CloseIcon from '../images/closeDelete.svg';

import {
  Dbase,
  SQL,
  Addresses as AddressVars,
} from '../config/vars';

interface StateProps {
  tx: TxData
  addressData: AddressProps
}

interface DispatchProps {
  initTx: () => void
  deleteRow: (
    table: string,
    columns: Array<string>,
    key: Array<string>) => void
  getTableEntries: (
    query: string,
    actionType: SuccessAndFailType,
  ) => void
}

type Props = StateProps & DispatchProps

const list = (props: Props) => {
  const [summary, setSummary] = useState('');
  const isFirstRun = useRef(true);

  const classes = themeStyles();

  const actionType: SuccessAndFailType = {
    success: AddressActionTypes.ADDRESS_SUCCESS,
    fail: AddressActionTypes.ADDRESS_FAILURE,
  };

  const query = 'SELECT * FROM ' + Dbase.tables.address.name;

  useEffect(() => {
    if ( isFirstRun.current ) {
      isFirstRun.current = false;
      props.initTx();
      // SELECT * FROM ADDRESS LIMIT 0, 2147483647
      props.getTableEntries(query, actionType);
    } else {
      const txSummary: string = props.tx.summary;
      if ( txSummary != summary ) {
        setSummary(txSummary);
        if ( (txSummary === SQL.insertSuccess ) ||
             (txSummary === SQL.deleteSuccess ) ) {
          props.getTableEntries(query, actionType);
        }
      }
    }
  }, [props.addressData, props.tx]);

  const deleteAddress = (address: AddressType, index: number) => {
    props.initTx();
    props.deleteRow(
        Dbase.tables.address.name,
        Dbase.tables.address.key.name,
        [address.ADDRESS, address.URL],
    );
  };

  return (

    <>
      <Grid item container alignItems="flex-start" xs={12}>

        <Grid item container xs={12}>

          <Grid item container justifyContent="flex-start" xs={7}>
            <Typography variant="h5">
              {AddressVars.address}
            </Typography>
          </Grid>
          <Grid item container justifyContent="flex-start" xs={4}>
            <Typography variant="h5">
              {AddressVars.url}
            </Typography>
          </Grid>
          <Grid item container justifyContent="flex-end" xs={1}>
            <Typography variant="h5">
              &nbsp;
            </Typography>
          </Grid>

        </Grid>

        <Grid
          className={classes.formSummary}
          item
          container
          justifyContent="flex-start"
          xs={12}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 4000 20"
          >
            <line x2="4000" stroke="#001C32" width="100%" height="100%"/>
          </svg>
        </Grid>

        <Grid item container className={classes.formSummary} xs={12}>
          { props.addressData?.data.map(
              ( call: AddressType, index: number ) => {
                const address = call.ADDRESS;
                const url = call.URL;

                // eslint-disable-next-line max-len
                // const rowclass = index % 2 ? classes.evenRow : classes.oddRow;

                return (
                  <React.Fragment key={index}>

                    <Grid className={classes.row} item container xs={12}>

                      <Grid
                        item
                        container
                        alignItems='center'
                        justifyContent="flex-start"
                        xs={7}
                      >
                        <Typography
                          variant="body1"
                          noWrap={true}
                        >
                          {address}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        container
                        alignItems='center'
                        justifyContent="flex-start"
                        xs={4}
                      >
                        <Typography
                          variant="body1"
                          noWrap={true}
                        >
                          {url}
                        </Typography>
                      </Grid>
                      <Grid item container justifyContent="flex-end" xs={1}>
                        <Button
                          onClick={() => deleteAddress(call, index)}
                          style={{
                            margin: 0,
                            padding: 0,
                            background: '#F0F0FA',
                            justifyContent: 'flex-end',
                          }}
                        >
                          <CloseIcon className={classes.deleteIcon} />
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
        columns: Array<string>,
        key: Array<string>) => dispatch(deleteRow(table, columns, key)),
    getTableEntries: (
        query: string,
        actionType: SuccessAndFailType,
    ) => dispatch(getTableEntries(query, actionType)),
  };
};

const ListAddresses = connect<StateProps, DispatchProps, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(list);

export {ListAddresses};
