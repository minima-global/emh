import React from 'react';
import {connect} from 'react-redux';

import SparkMD5 from 'spark-md5';

import {Token as Balance} from 'minima';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {Misc, Balances as BalanceVars} from '../config/vars';

import {theme, themeStyles} from '../styles';

import {
  ApplicationState,
  BalanceProps,
} from '../store';

interface StateProps {
  balanceData: BalanceProps
}

type Props = StateProps

const display = (props: Props) => {
  const classes = themeStyles();

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
        <Typography variant="h3">
          {BalanceVars.heading}
        </Typography>

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

                  return (
                    <React.Fragment key={index}>

                      <Grid
                        item
                        container
                        alignItems="flex-start"
                        justify="flex-start"
                        xs={1}
                      >
                        {balance.icon?
                            <img
                              className={classes.balanceIcon}
                              src={balance.icon} /> :
                            <img
                              className={classes.balanceIcon}
                              src={'https://www.gravatar.com/avatar/' + SparkMD5.hash(balance.tokenid) + '?d=identicon'} />
                        }
                      </Grid>
                      <Grid
                        item
                        container
                        justify="flex-start"
                        xs={11}
                      >
                        <Grid item container justify="flex-start" xs={12}>
                          <Typography
                            variant="h6"
                            noWrap={true}
                          >
                            {balance.token}
                          </Typography>
                        </Grid>

                        <Grid
                          item
                          container
                          alignItems='center'
                          justify="flex-start"
                          xs={12}
                        >
                          <Typography
                            variant="body1"
                            noWrap={true}
                          >
                            {balance.tokenid}
                          </Typography>
                        </Grid>

                        <Grid
                          item
                          container
                          justify="flex-start"
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
