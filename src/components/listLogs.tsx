import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import {themeStyles} from '../styles';

import {
  ApplicationState,
  AppDispatch,
  LogsProps,
  Logs as LogsType,
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
  getDbaseEntries: (
    dbase: string,
    sortField: string,
    sortOrder: string,
    limitLow: number,
    offset: number
  ) => void
}

type Props = StateProps & DispatchProps

const list = (props: Props) => {
  const [limitLow, setLimitLow] = useState(0);
  const [numRecords, setNumRecords] = useState(Dbase.pageLimit);
  const [nextDisabled, setNextDisabled] = useState(true);
  const [backDisabled, setBackDisabled] = useState(true);
  const isFirstRun = useRef(true);
  const classes = themeStyles();

  useEffect(() => {
    if ( isFirstRun.current ) {
      isFirstRun.current = false;
      props.getDbaseEntries(
          Dbase.tables.log.name,
          'DATE',
          'DESC',
          limitLow,
          Dbase.pageLimit);
    } else {
      if ( props.logsData.data.length < Dbase.pageLimit - 1 ) {
        setNextDisabled(true);
        if ( limitLow === 0 ) {
          setBackDisabled(true);
        } else {
          setBackDisabled(false);
        }
      } else if ( limitLow === 0 ) {
        setNextDisabled(false);
        setBackDisabled(true);
      } else {
        setNextDisabled(false);
        setBackDisabled(false);
      }
    }
  }, [props.logsData]);

  const getRecords = (lowLimit: number) => {
    setLimitLow(lowLimit);
    setNumRecords(lowLimit + Dbase.pageLimit);
    props.getDbaseEntries(
        Dbase.tables.log.name,
        'DATE',
        'DESC',
        lowLimit,
        Dbase.pageLimit);
  };

  return (

    <>
      <Grid item container alignItems="flex-start" xs={12}>
        <Grid item container justify="flex-start" xs={3}>
          <Typography variant="h5">
            {LogVars.records}: {numRecords / Dbase.pageLimit}
          </Typography>
        </Grid>
        <Grid item container justify="flex-end" xs={9}>
          <Grid item container justify="flex-end" xs={4} lg={1}>
            <Button
              onClick={() => getRecords(limitLow + Dbase.pageLimit)}
              disabled={nextDisabled}
            >
              {LogVars.nextButton}
            </Button>
          </Grid>
          <Grid item container justify="flex-end" xs={4} lg={1}>
            <Button
              onClick={() => getRecords(limitLow - Dbase.pageLimit)}
              disabled={backDisabled}
            >
              {LogVars.backButton}
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid item container alignItems="flex-start" xs={12}>

        <Grid item container xs={12}>


          <Grid
            item
            container
            justify="flex-start"
            xs={3}
            lg={2}
          >
            <Typography variant="h5">
              {LogVars.dateCreated}
            </Typography>
          </Grid>

          <Grid
            item
            container
            justify="flex-start"
            xs={3}
            lg={5}
          >
            <Typography
              variant="h5"
              noWrap={true}
            >
              {LogVars.loggingTypeId}
            </Typography>
          </Grid>

          <Grid
            item
            container
            justify="flex-start"
            xs={3}
            lg={1}
          >
            <Typography variant="h5">
              {LogVars.loggingType}
            </Typography>
          </Grid>

          <Grid
            item
            container
            justify="flex-start"
            xs={3}
            lg={4}
          >
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
                  <Grid
                    item
                    container
                    justify="flex-start"
                    xs={3}
                    lg={2}
                  >
                    <Typography variant="body1">
                      {dateCreated}
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    container
                    justify="flex-start"
                    xs={3}
                    lg={5}
                  >
                    <Typography
                      variant="body1"
                      noWrap={true}
                    >
                      {loggingTypeId}
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    container
                    justify="flex-start"
                    xs={3}
                    lg={1}
                  >
                    <Typography variant="body1">
                      {loggingType}
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    container
                    justify="flex-start"
                    xs={3}
                    lg={4}
                  >
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
    getDbaseEntries: (
        dbase: string,
        sortField: string,
        sortOrder: string,
        limitLow: number,
        offset: number,
    ) => dispatch(getDbaseEntries(
        dbase,
        sortField,
        sortOrder,
        limitLow,
        offset),
    ),
  };
};

const ListLogs = connect<StateProps, DispatchProps, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(list);

export {ListLogs};
