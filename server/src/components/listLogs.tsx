import React, {useEffect, useRef} from 'react';
import {connect} from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {themeStyles} from '../styles';

import {
  ApplicationState,
  AppDispatch,
  LogsProps,
  Logs as LogsType,
} from '../store/types';

import {getLogs} from '../store/app/server/actions';

import {
  Log as LogConfig,
} from '../config';

interface StateProps {
  logsData: LogsProps
}

interface DispatchProps {
  getLogs: () => void
}

type Props = StateProps & DispatchProps

const list = (props: Props) => {
  const isFirstRun = useRef(true);

  const classes = themeStyles();

  useEffect(() => {
    if ( isFirstRun.current ) {
      isFirstRun.current = false;
      props.getLogs();
    }
  }, [props.logsData]);

  return (

    <>
      <Grid item container alignItems="flex-start" xs={12}>

        <Grid item container xs={12}>

          <Grid item container justify="flex-start" xs={3}>
            <Typography variant="h5">
              {LogConfig.dateCreated}
            </Typography>
          </Grid>
          <Grid item container justify="flex-start" xs={3}>
            <Typography variant="h5">
              {LogConfig.loggingType}
            </Typography>
          </Grid>
          <Grid item container justify="flex-start" xs={3}>
            <Typography variant="h5">
              {LogConfig.data}
            </Typography>
          </Grid>
          <Grid item container justify="flex-start" xs={3}>
            <Typography
              variant="h5"
              noWrap={true}
            >
              {LogConfig.loggingTypeId}
            </Typography>
          </Grid>

        </Grid>

        <Grid item container className={classes.formSummary} xs={12}>
          { props.logsData.data.map( ( log: LogsType, index: number ) => {
            const dateCreated = log.date;
            const loggingType = log.loggingtype;
            const thisData = log.data;
            const loggingTypeId = log.loggingtypeid;

            const rowclass = index % 2 ? classes.evenRow : classes.oddRow;

            return (
              <React.Fragment key={index}>

                <Grid className={rowclass} item container xs={12}>

                  <Grid item container justify="flex-start" xs={3}>
                    <Typography variant="body1">
                      {dateCreated}
                    </Typography>
                  </Grid>
                  <Grid item container justify="flex-start" xs={3}>
                    <Typography variant="body1">
                      {loggingType}
                    </Typography>
                  </Grid>
                  <Grid item container justify="flex-start" xs={3}>
                    <Typography
                      variant="body1"
                      noWrap={true}
                    >
                      {thisData}
                    </Typography>
                  </Grid>
                  <Grid item container justify="flex-start" xs={3}>
                    <Typography
                      variant="body1"
                      noWrap={true}
                    >
                      {loggingTypeId}
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
  return {
    logsData: state.logsData as LogsProps,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => {
  return {
    getLogs: () => dispatch(getLogs()),
  };
};

const ListLogs = connect<StateProps, DispatchProps, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(list);

export {ListLogs};
