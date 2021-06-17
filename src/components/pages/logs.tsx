import React, {useEffect, useState, useRef} from 'react';
import {connect} from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {
  ApplicationState,
  AppDispatch,
  LogsProps,
} from '../../store/types';

import {getLogData} from '../../utils/getLogData';
import {getDbaseEntries} from '../../store/app/dbase/actions';

import {
  Dbase,
} from '../../config';

import {
  Log as LogVars,
} from '../../config';

import {ListLogs} from '../listLogs';

interface ThisProps {
  heading: string
  limitLow?: number,
  offset?: number,
  filterType?: string,
  filterAction?: string,
  filterRegex?: string,
}

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

type Props = ThisProps & StateProps & DispatchProps

export const list = (props: Props) => {
  const isFirstRun = useRef(true);
  const [data, setData] = useState({} as LogsProps);

  const {
    heading,
    limitLow = 0,
    offset = Dbase.pageLimit,
    filterType = '',
    filterAction = '',
    filterRegex = '',
    logsData,
    getDbaseEntries,
  } = props;

  useEffect(() => {
    if ( isFirstRun.current ) {
      isFirstRun.current = false;

      getDbaseEntries(
          Dbase.tables.log.name,
          'DATE',
          'DESC',
          limitLow,
          offset);
    } else {
      if ( logsData?.data.length ) {
        if ( filterType ) {
          const thisLogsData =
          getLogData(
              logsData,
              filterType,
              filterAction,
              filterRegex,
          );
          setData(thisLogsData);
        } else {
          setData(logsData);
        }
      }
    }
  }, [logsData]);

  return (

    <Grid container alignItems='flex-start'>

      <Grid item container xs={12}>

        <Grid item container justify="flex-start" xs={12}>

          <Typography variant="h2">
            {LogVars.heading}
          </Typography>

        </Grid>

        { <ListLogs /> }

      </Grid>

    </Grid>
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

const Logs = connect<StateProps, DispatchProps, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(list);

export {Logs};
