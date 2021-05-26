import React from 'react';
import {connect} from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {Misc, Balances as BalanceVars} from '../config';

import {theme, themeStyles} from '../styles';

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

      <Grid
        item
        container
        alignItems="flex-start"
        style={{
          marginRight: theme.spacing(2),
        }}
        xs={12}
      >


        <Typography variant="h3">
          {BalanceVars.heading}
        </Typography>

        <Grid item container className={classes.formSummary} xs={12}>
          {
            props.balanceData?.data.map(
                ( balance: Balance, index: number ) => {
                  const sendable = +balance.sendable;
                  const thisSendable = sendable.toFixed(Misc.sendableDecimals);
                  const rowclass = index % 2 ? classes.evenRow : classes.oddRow;

                  return (
                    <React.Fragment key={index}>

                      <Grid className={rowclass} item container xs={12}>
                        <Grid item container justify="flex-start" xs={6}>
                          <Typography
                            variant="body1"
                            noWrap={true}
                          >
                            {balance.token}
                          </Typography>
                        </Grid>
                        <Grid item container justify="flex-end" xs={6}>
                          <Typography
                            variant="body1"
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
