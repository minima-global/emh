import React from 'react';
import {connect} from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {Status as StatusVars} from '../config';

import {theme, themeStyles} from '../styles';

import {
  ApplicationState,
  StatusProps,
  Status,
} from '../store';

interface StateProps {
  statusData: StatusProps
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
          marginLeft: theme.spacing(2),
        }}
        xs={12}
      >

        <Typography variant="h3">
          {StatusVars.heading}
        </Typography>

        <Grid item container className={classes.formSummary} xs={12}>
          {
            props.statusData?.data.map( ( status: Status, index: number ) => {
              const upTime = status.uptime;
              const ram = status.ram;
              const lastBlock = status.lastblock;

              return (
                <React.Fragment key={index}>

                  <Grid
                    item
                    container
                    xs={12}
                  >
                    <Grid item container justify="flex-start" xs={12}>
                      <Typography
                        variant="body1"
                        noWrap={true}
                      >
                        {StatusVars.upTime}: {upTime}
                      </Typography>
                    </Grid>
                    <Grid item container justify="flex-start" xs={12}>
                      <Typography
                        variant="body1"
                        noWrap={true}
                      >
                        {StatusVars.ram}: {ram}
                      </Typography>
                    </Grid>
                    <Grid item container justify="flex-start" xs={12}>
                      <Typography
                        variant="body1"
                        noWrap={true}
                      >
                        {StatusVars.block}: {lastBlock}
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
  const statuss = state.statusData as StatusProps;
  return {
    statusData: statuss,
  };
};

export const ListStatus =
connect<StateProps, {}, {}, ApplicationState>(
    mapStateToProps,
)(display);
