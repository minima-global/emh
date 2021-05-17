import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {themeStyles} from '../styles';

import {
  ApplicationState,
  AppDispatch,
  ActionTypes,
  LogsProps,
  Logs as LogsType,
  LogsActionTypes,
} from '../store/types';

import {getDbaseEntries} from '../store/app/blockchain/actions';

import {
  Dbase,
  Log as LogVars,
} from '../config';

interface StateProps {
  logsData: LogsProps
}

interface DispatchProps {
  getDbaseEntries: (dbase: string) => void
}

type Props = StateProps & DispatchProps

const list = (props: Props) => {
  const classes = themeStyles();

  useEffect(() => {
    props.getDbaseEntries(Dbase.tables.log.name);
  }, []);

  return (

    <>
      <Grid item container alignItems="flex-start" xs={12}>

        <Grid item container xs={12}>

          <Grid item container justify="flex-start" xs={3}>
            <Typography variant="h5">
              {LogVars.dateCreated}
            </Typography>
          </Grid>
          <Grid item container justify="flex-start" xs={3}>
            <Typography
              variant="h5"
              noWrap={true}
            >
              {LogVars.loggingTypeId}
            </Typography>
          </Grid>
          <Grid item container justify="flex-start" xs={3}>
            <Typography variant="h5">
              {LogVars.loggingType}
            </Typography>
          </Grid>
          <Grid item container justify="flex-start" xs={3}>
            <Typography variant="h5">
              {LogVars.data}
            </Typography>
          </Grid>

        </Grid>

        <Grid item container className={classes.formSummary} xs={12}>
          { props.logsData.data.map( ( log: LogsType, index: number ) => {
            const thisDate = new Date(+log.DATE);
            const dateCreated = thisDate.toString().replace(/ GMT.*$/g, '');
            const loggingType = log.LOGGINGTYPE;
            const thisData = log.DATA;
            const loggingTypeId = log.LOGGINGTYPEID;

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
                    <Typography
                      variant="body1"
                      noWrap={true}
                    >
                      {loggingTypeId}
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
    getDbaseEntries: (dbase: string) => dispatch(getDbaseEntries(dbase)),
  };
};

const ListLogs = connect<StateProps, DispatchProps, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(list);

export {ListLogs};
