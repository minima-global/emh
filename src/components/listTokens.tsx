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
  TokenIdProps,
  TokenId as TokensType,
  TxData,
} from '../store/types';

import {initTx} from '../store/app/blockchain/actions';
import {deleteRow, getDbaseEntries} from '../store/app/dbase/actions';

import {
  Dbase,
  SQL,
  Tokens as TokenVars,
} from '../config';

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
      // SELECT * FROM TOKEN LIMIT 0, 2147483647
      props.getDbaseEntries(Dbase.tables.token.name);
    } else {
      if ( props.tokensData.data.length != isDisabled.length ) {
        for (let i = 0; i < props.tokensData.data.length; i++ ) {
          isDisabled[i] = false;
        }
      }

      const txSummary: string = props.tx.summary;
      if ( txSummary != summary ) {
        setSummary(txSummary);

        if ( (txSummary === SQL.insertSuccess ) ||
             (txSummary === SQL.deleteSuccess ) ) {
          props.getDbaseEntries(Dbase.tables.token.name);
        }
      }
    }
  }, [props.tokensData, props.tx]);

  const deleteToken = (token: TokensType, index: number) => {
    isDisabled[index] = true;
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

          <Grid item container justify="flex-start" xs={5}>
            <Typography variant="h5">
              {TokenVars.tokenId}
            </Typography>
          </Grid>
          <Grid item container justify="flex-start" xs={5}>
            <Typography variant="h5">
              {TokenVars.url}
            </Typography>
          </Grid>
          <Grid item container justify="flex-end" xs={2}>
            <Typography variant="h5">
              &nbsp;
            </Typography>
          </Grid>

        </Grid>

        <Grid item container className={classes.formSummary} xs={12}>
          { props.tokensData?.data.map(
              ( token: TokensType, index: number ) => {
                const id = token.TOKENID;
                const url = token.URL;

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
                          {id}
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
                          onClick={() => deleteToken(token, index)}
                          disabled={isDisabled[index]}
                          style={{
                            marginTop: theme.spacing(0.5),
                            background: 'linear-gradient(#FF0000, #FF0000)',
                          }}
                        >
                          { largeScreen ?
                        TokenVars.deleteButton:
                        TokenVars.smallDeleteButton
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
    getDbaseEntries: (dbase: string) => dispatch(getDbaseEntries(dbase)),
  };
};

const ListTokens = connect<StateProps, DispatchProps, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(list);

export {ListTokens};
