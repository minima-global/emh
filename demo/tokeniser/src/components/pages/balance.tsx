import React from 'react'
import { connect } from 'react-redux'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import { Misc, Balance as BalancesVars } from '../../config'

import { themeStyles } from '../../styles'

import {
  ApplicationState,
  BalanceProps,
  Balance as BalanceType
} from '../../store'

interface BalanceStateProps {
  balanceData: BalanceProps
}

type Props = BalanceStateProps

const display = (props: Props) => {

  const classes = themeStyles()

  //console.log(props.balanceData)

  return (
    <Grid container alignItems="flex-start">

      <Grid item container justify="flex-start" xs={12}>
        <Typography variant="h2">
          {BalancesVars.heading}
        </Typography>
      </Grid>

      <Grid item container justify="flex-start" xs={2}>
        <Typography variant="h3">
          &nbsp;
        </Typography>
      </Grid>
      <Grid item container justify="flex-end" xs={3}>
        <Typography variant="h3">
          {BalancesVars.sendable}
        </Typography>
      </Grid>
      <Grid item container justify="flex-end" xs={3}>
        <Typography variant="h3">
          {BalancesVars.amount}
        </Typography>
      </Grid>
      <Grid item container justify="flex-end" xs={2}>
        <Typography variant="h3">
          {BalancesVars.unconfirmed}
        </Typography>
      </Grid>
      <Grid item container justify="flex-end" xs={2}>
        <Typography variant="h3">
          {BalancesVars.mempool}
        </Typography>
      </Grid>

      <Grid item container justify="flex-start" xs={12}>
        <svg
           xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 2000 4"
        >
          <line x2="2000" stroke="#001c32" strokeWidth={4} />
        </svg>
      </Grid>

      {
        props.balanceData.data.map( ( balance: BalanceType, index: number ) => {

          //console.log(balance)
          const sendable = +balance.sendable
          const amount = +balance.confirmed
          const unconfirmed = +balance.unconfirmed
          const mempool = +balance.mempool

          const thisSendable = sendable.toFixed(Misc.sendableDecimals)
          const thisAmount = amount.toFixed(Misc.confirmedDecimals)
          const thisUnconfirmed = unconfirmed.toFixed(Misc.unconfirmedDecimals)
          const thisMempool = mempool.toFixed(Misc.mempoolDecimals)

          const rowclass = index % 2 ? classes.evenRow : classes.oddRow

          return (
            <React.Fragment key={index}>

              <Grid className={rowclass} item container xs={12}>

                <Grid item container justify="flex-start" xs={2}>
                 <Typography variant="body1">
                   {balance.token}
                 </Typography>
                </Grid>
                <Grid item container justify="flex-end" xs={3}>
                 <Typography variant="body2">
                   {thisSendable}
                 </Typography>
                </Grid>
                <Grid item container justify="flex-end" xs={3}>
                 <Typography variant="body2">
                   {thisAmount}
                 </Typography>
                </Grid>
                <Grid item container justify="flex-end" xs={2}>
                  <Typography variant="body2">
                    {thisUnconfirmed}
                  </Typography>
                </Grid>
                <Grid item container justify="flex-end" xs={2}>
                  <Typography variant="body2">
                    {thisMempool}
                  </Typography>
                </Grid>

              </Grid>

            </React.Fragment>
          )
        })
      }
    </Grid>
  )
}

const mapStateToProps = (state: ApplicationState): BalanceStateProps => {

  const balances = state.balance as BalanceProps
  return {
    balanceData: balances
  }
}

export const Balance = connect<BalanceStateProps, {}, {}, ApplicationState>(
  mapStateToProps
)(display)
