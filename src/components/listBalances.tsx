import React from 'react';
import {connect} from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {Misc, Balances as BalanceVars} from '../config';

import {themeStyles} from '../styles';

import {
  ApplicationState,
  BalanceProps,
  Balance,
} from '../store';

interface StateProps {
  balanceData: BalanceProps
}

type Props = StateProps

const display = (props: Props) => {
  const classes = themeStyles();

  return (
    <>
      <Grid item container alignItems="flex-start" xs={12}>

        <Grid
          item
          container
          justify="flex-start"
          xs={2}
        >
          <Typography
            variant="h5"
            noWrap={true}
          >
            &nbsp;
          </Typography>
        </Grid>

        <Grid
          item
          container
          justify="flex-end"
          xs={3}
        >
          <Typography
            variant="h5"
            noWrap={true}
          >
            {BalanceVars.sendable}
          </Typography>
        </Grid>

        <Grid
          item
          container
          justify="flex-end"
          xs={3}
        >
          <Typography
            variant="h5"
            noWrap={true}
          >
            {BalanceVars.amount}
          </Typography>
        </Grid>

        <Grid
          item
          container
          justify="flex-end"
          xs={2}
        >
          <Typography
            variant="h5"
            noWrap={true}
          >
            {BalanceVars.unconfirmed}
          </Typography>
        </Grid>

        <Grid
          item
          container
          justify="flex-end"
          xs={2}
        >
          <Typography
            variant="h5"
            noWrap={true}
          >
            {BalanceVars.mempool}
          </Typography>
        </Grid>

        <Grid item container className={classes.formSummary} xs={12}>
          {
            props.balanceData.data.map( ( balance: Balance, index: number ) => {
              const sendable = +balance.sendable;
              const amount = +balance.confirmed;
              const unconfirmed = +balance.unconfirmed;
              const mempool = +balance.mempool;

              const thisSendable = sendable.toFixed(Misc.sendableDecimals);
              const thisAmount = amount.toFixed(Misc.confirmedDecimals);
              const thisUnconfirmed =
                unconfirmed.toFixed(Misc.unconfirmedDecimals);
              const thisMempool = mempool.toFixed(Misc.mempoolDecimals);

              const rowclass = index % 2 ? classes.evenRow : classes.oddRow;

              return (
                <React.Fragment key={index}>

                  <Grid className={rowclass} item container xs={12}>

                    <Grid item container justify="flex-start" xs={2}>
                      <Typography
                        variant="body1"
                        noWrap={true}
                      >
                        {balance.token}
                      </Typography>
                    </Grid>
                    <Grid item container justify="flex-end" xs={3}>
                      <Typography
                        variant="body1"
                        noWrap={true}
                      >
                        {thisSendable}
                      </Typography>
                    </Grid>
                    <Grid item container justify="flex-end" xs={3}>
                      <Typography
                        variant="body1"
                        noWrap={true}
                      >
                        {thisAmount}
                      </Typography>
                    </Grid>
                    <Grid item container justify="flex-end" xs={2}>
                      <Typography
                        variant="body1"
                        noWrap={true}
                      >
                        {thisUnconfirmed}
                      </Typography>
                    </Grid>
                    <Grid item container justify="flex-end" xs={2}>
                      <Typography
                        variant="body1"
                        noWrap={true}
                      >
                        {thisMempool}
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
