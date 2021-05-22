import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import {theme, themeStyles} from '../styles';

import {
  ApplicationState,
  AppDispatch,
  AddressProps,
  Address as AddressType,
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
    columns: Array<string>,
    key: Array<string>) => void
  getDbaseEntries: (dbase: string) => void
}

type Props = StateProps & DispatchProps

const list = (props: Props) => {
  const [summary, setSummary] = useState('');
  const isFirstRun = useRef(true);
  // eslint-disable-next-line no-unused-vars
  const [isDisabled, setIsDisabled] = useState([] as boolean[]);

  const classes = themeStyles();
  const largeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  useEffect(() => {
    if ( isFirstRun.current ) {
      isFirstRun.current = false;
      props.initTx();
      props.getDbaseEntries(Dbase.tables.address.name);
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
          props.getDbaseEntries(Dbase.tables.address.name);
        }
      }
    }
  }, [props.addressData, props.tx]);

  const deleteAddress = (address: AddressType, index: number) => {
    isDisabled[index] = true;
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

                      <Grid
                        item
                        container
                        alignItems='center'
                        justify="flex-start"
                        xs={5}
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
                        justify="flex-start"
                        xs={5}
                      >
                        <Typography
                          variant="body1"
                          noWrap={true}
                        >
                          {url}
                        </Typography>
                      </Grid>
                      <Grid item container justify="flex-end" xs={2}>
                        <Button
                          onClick={() => deleteAddress(call, index)}
                          disabled={isDisabled[index]}
                          style={{
                            marginTop: theme.spacing(0.5),
                            background: 'linear-gradient(#FF0000, #FF0000)',
                          }}
                        >
                          { largeScreen ?
                            AddressVars.deleteButton:
                            AddressVars.smallDeleteButton
                          }
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
    getDbaseEntries: (dbase: string) => dispatch(getDbaseEntries(dbase)),
  };
};

const ListAddresses = connect<StateProps, DispatchProps, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(list);

export {ListAddresses};
