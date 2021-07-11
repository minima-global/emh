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
  TokenIdProps,
  TokenId as TokensType,
  TokenIdActionTypes,
  TxData,
  SuccessAndFailType,
} from '../store/types';

import {initTx} from '../store/app/blockchain/actions';
import {deleteRow, getTableEntries} from '../store/app/dbase/actions';

import {
  Dbase,
  SQL,
  Tokens as TokenVars,
} from '../config/vars';

import CloseIcon from '../images/closeDelete.svg';

interface StateProps {
  tx: TxData
  tokensData: TokenIdProps
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

  const actionType: SuccessAndFailType = {
    success: TokenIdActionTypes.TOKENID_SUCCESS,
    fail: TokenIdActionTypes.TOKENID_FAILURE,
  };

  const query = 'SELECT * FROM ' + Dbase.tables.token.name;

  const classes = themeStyles();

  useEffect(() => {
    if ( isFirstRun.current ) {
      isFirstRun.current = false;
      props.initTx();
      // SELECT * FROM TOKEN LIMIT 0, 2147483647
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
  }, [props.tokensData, props.tx]);

  const deleteToken = (token: TokensType, index: number) => {
    props.initTx();
    props.deleteRow(
        Dbase.tables.token.name,
        Dbase.tables.token.key.name,
        [token.TOKENID, token.URL],
    );
  };

  return (

    <>
      <Grid item container alignItems="flex-start" xs={12}>

        <Grid item container xs={12}>

          <Grid item container justify="flex-start" xs={8}>
            <Typography variant="h5">
              {TokenVars.tokenId}
            </Typography>
          </Grid>
          <Grid item container justify="flex-start" xs={3}>
            <Typography variant="h5">
              {TokenVars.url}
            </Typography>
          </Grid>
          <Grid item container justify="flex-end" xs={1}>
            <Typography variant="h5">
              &nbsp;
            </Typography>
          </Grid>

        </Grid>

        <Grid
          className={classes.formSummary}
          item
          container
          justify="flex-start"
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
          { props.tokensData?.data.map(
              ( token: TokensType, index: number ) => {
                const id = token.TOKENID;
                const url = token.URL;

                // eslint-disable-next-line max-len
                // const rowclass = index % 2 ? classes.evenRow : classes.oddRow;

                return (
                  <React.Fragment key={index}>

                    <Grid className={classes.row} item container xs={12}>

                      <Grid
                        item
                        container
                        alignItems='center'
                        justify="flex-start"
                        xs={8}
                      >
                        <Typography
                          variant="body1"
                          noWrap={true}
                        >
                          {id}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        container
                        alignItems='center'
                        justify="flex-start"
                        xs={3}
                      >
                        <Typography
                          variant="body1"
                          noWrap={true}
                        >
                          {url}
                        </Typography>
                      </Grid>
                      <Grid item container justify="flex-end" xs={1}>
                        <Button
                          onClick={() => deleteToken(token, index)}
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
    tokensData: state.tokenIdsData as TokenIdProps,
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

const ListTokens = connect<StateProps, DispatchProps, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(list);

export {ListTokens};
