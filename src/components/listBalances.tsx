import React, {useState, ChangeEvent} from 'react';
import {connect} from 'react-redux';

import SparkMD5 from 'spark-md5';

import {Token as Balance} from 'minima';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Avatar from '@material-ui/core/Avatar';

import {
  Misc,
  Search,
  Balances as BalanceVars,
} from '../config/vars';

import {theme, themeStyles} from '../styles';

import {
  ApplicationState,
  BalanceProps,
} from '../store';

import SearchIcon from '../images/search.svg';

interface StateProps {
  balanceData: BalanceProps
}

type Props = StateProps

const display = (props: Props) => {
  const [searchTerm, setSearchTerm] = useState('');

  const classes = themeStyles();

  const doSetSearchTerm =
      (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearchTerm(e.target.value);
      };

  const doSearch = () => {
    if ( searchTerm ) {
      // do something
    }
  };

  return (
    <>
      <Grid
        item
        container
        alignItems="flex-start"
        style={{
          padding: theme.spacing(2),
        }}
        xs={12}
      >

        <Grid
          item
          xs={3}
        >
          <Typography variant="h3">
            {BalanceVars.heading}
          </Typography>
        </Grid>

        <Grid
          item
          xs={9}
        >

          <TextField
            fullWidth
            placeholder={Search.placeHolder}
            size="small"
            name="search"
            type="text"
            variant='outlined'
            onChange={(e) => {
              doSetSearchTerm(e);
            }}
            onKeyPress= {(e) => {
              if (e.key === 'Enter') {
                doSearch();
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon className={classes.searchIcon} />
                </InputAdornment>),
            }}
          />
        </Grid>

        <Grid
          item
          container
          alignItems="flex-start"
          style={{
            marginTop: theme.spacing(1),
            width: '100%',
            maxHeight: '220px',
            overflow: 'auto',
          }}
          xs={12}
        >
          {
            props.balanceData?.data.map(
                ( balance: Balance, index: number ) => {
                  const sendable = +balance.sendable;
                  const thisSendable = sendable.toFixed(Misc.sendableDecimals);
                  const tokenId =
                    balance.tokenid === '0x00' ?
                      '0x00' : balance.tokenid.substring(0, 20) + '...';

                  return (
                    <React.Fragment key={index}>

                      <Grid
                        item
                        container
                        alignItems='center'
                        xs={1}
                      >
                        {balance.icon?
                          <Avatar
                            alt='Token Icon'
                            src={balance.icon} /> :
                          <Avatar
                            alt='Token Icon'
                            src={'https://www.gravatar.com/avatar/' + SparkMD5.hash(balance.tokenid) + '?d=identicon'} />
                        }
                      </Grid>
                      <Grid
                        item
                        container
                        justifyContent="flex-start"
                        xs={11}
                      >
                        <Grid item xs={12}>
                          <Typography
                            variant="h6"
                            noWrap={true}
                          >
                            {balance.token}
                          </Typography>
                        </Grid>

                        <Grid
                          item
                          xs={12}
                        >
                          <Typography
                            variant="body1"
                            noWrap={true}
                          >
                            {tokenId}
                          </Typography>
                        </Grid>

                        <Grid
                          item
                          style={{
                            marginBottom: theme.spacing(3),
                          }}
                          xs={12}>

                          <Typography
                            variant="body2"
                            noWrap={true}
                          >
                            {thisSendable}
                          </Typography>
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
  const balances = state.balanceData as BalanceProps;
  return {
    balanceData: balances,
  };
};

export const ListBalances =
connect<StateProps, {}, {}, ApplicationState>(
    mapStateToProps,
)(display);
