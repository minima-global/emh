import React, {useEffect, useState, useRef} from 'react';
import {connect} from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import {
  ApplicationState,
  AppDispatch,
  LogsProps,
  Logs as LogsType,
} from '../../store/types';

import {getTableEntries} from '../../store/app/dbase/actions';

import {theme, themeStyles} from '../../styles';

import {
  Dbase,
} from '../../config';

import {
  Log as LogVars,
} from '../../config';

interface ThisProps {
  heading: string
  filterType?: string,
  filterAction?: string,
  filterRegex?: string,
}

interface StateProps {
  logsData: LogsProps
}

interface DispatchProps {
  getTableEntries: (
    table: string,
    query: string,
  ) => void
}

type Props = ThisProps & StateProps & DispatchProps

export const list = (props: Props) => {
  const {
    heading,
    filterType = '',
    filterAction = '',
    filterRegex = '',
    logsData,
    getTableEntries,
  } = props;
  const isFirstRun = useRef(true);
  const [low, setLimitLow] = useState(0);
  const [numRecords, setNumRecords] = useState(Dbase.pageLimit);
  const [nextDisabled, setNextDisabled] = useState(true);
  const [backDisabled, setBackDisabled] = useState(true);

  // SELECT * FROM LOGGING ORDER BY DATE DESC LIMIT 0, 2147483647
  let query =
    'SELECT * FROM ' +
    Dbase.tables.log.name +
    ' ORDER BY DATE DESC ' +
    ' LIMIT ' + low + ', ' +
    numRecords;
  if ( filterType ) {
    query =
      'SELECT * FROM ' +
      Dbase.tables.log.name +
      ' WHERE ' + Dbase.tables.log.columns[2] +
      ' IN (\'' + props.filterType + '\')' +
      ' AND ' + Dbase.tables.log.columns[3] +
      ' IN (\'' + filterAction + '\')' +
      ' And ' + Dbase.tables.log.columns[4] +
      ' REGEXP \'' + filterRegex + '\'' +
      ' ORDER BY DATE DESC ' +
      ' LIMIT ' + low + ', ' +
      numRecords;
  }

  const classes = themeStyles();

  useEffect(() => {
    if ( isFirstRun.current ) {
      isFirstRun.current = false;

      getTableEntries(Dbase.tables.log.name, query);
    } else {
      if ( logsData?.data.length ) {
        const thisData: LogsProps = {
          data: [],
        };

        if ( thisData.data.length < Dbase.pageLimit - 1 ) {
          setNextDisabled(true);
          if ( low === 0 ) {
            setBackDisabled(true);
          } else {
            setBackDisabled(false);
          }
        } else if ( low === 0 ) {
          setNextDisabled(false);
          setBackDisabled(true);
        } else {
          setNextDisabled(false);
          setBackDisabled(false);
        }
      }
    }
  }, [logsData]);

  const getRecords = (lowLimit: number) => {
    setLimitLow(lowLimit);
    setNumRecords(lowLimit + Dbase.pageLimit);
    getTableEntries(Dbase.tables.log.name, query);
  };

  return (

    <Grid
      container
      alignItems="flex-start"
    >
      <Grid
        container
        alignItems="flex-start"
      >

        <Grid item container alignItems="flex-start" xs={12}>
          <Typography variant="h2">
            {heading}
          </Typography>
        </Grid>

        <Grid item container alignItems="flex-start" xs={12}>
          <Grid item container justify="flex-start" xs={3}>
            <Typography variant="h5">
              {LogVars.records} {numRecords / Dbase.pageLimit}
            </Typography>
          </Grid>
          <Grid item container justify="flex-end" xs={9}>
            <Grid item container justify="flex-end" xs={4} lg={1}>
              <Button
                onClick={() => getRecords(low + Dbase.pageLimit)}
                disabled={nextDisabled}
                style={{
                  marginRight: theme.spacing(0.5),
                }}
              >
                {LogVars.nextButton}
              </Button>
            </Grid>
            <Grid item container justify="flex-end" xs={4} lg={1}>
              <Button
                onClick={() => getRecords(low - Dbase.pageLimit)}
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
              <Typography variant="h6">
                {LogVars.dateCreated}
              </Typography>
            </Grid>

            <Grid
              item
              container
              justify="flex-start"
              xs={2}
              lg={1}
            >
              <Typography variant="h6">
                {LogVars.loggingType}
              </Typography>
            </Grid>

            <Grid
              item
              container
              justify="flex-start"
              xs={2}
              lg={1}
            >
              <Typography
                variant="h6"
                noWrap={true}
              >
                {LogVars.action}
              </Typography>
            </Grid>

            <Grid
              item
              container
              justify="flex-start"
              xs={5}
              lg={8}
            >
              <Typography variant="h6">
                {LogVars.data}
              </Typography>
            </Grid>

          </Grid>

          <Grid
            className={classes.formSummary}
            item
            container
            justify="flex-start"
            xs={12}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 4000 20"
            >
              <line x2="4000" stroke="#001C32" width="100%" height="100%"/>
            </svg>
          </Grid>

          <Grid item container className={classes.formSummary} xs={12}>
            { logsData?.data?.map( ( log: LogsType, index: number ) => {
              const thisDate = new Date(+log.DATE);
              const dateCreated = thisDate.toString().replace(/ GMT.*$/g, '');
              const loggingType = log.LOGGINGTYPE;
              const action = log.ACTION;
              const thisData = log.DATA;

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
                      xs={2}
                      lg={1}
                    >
                      <Typography
                        variant="body1"
                        noWrap={true}
                      >
                        {loggingType}
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      container
                      justify="flex-start"
                      xs={2}
                      lg={1}
                    >
                      <Typography variant="body1">
                        {action}
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      container
                      justify="flex-start"
                      xs={5}
                      lg={8}
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
    getTableEntries: (
        table: string,
        query: string,
    ) => dispatch(getTableEntries(
        table,
        query,
    )),
  };
};

const Logs = connect<StateProps, DispatchProps, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(list);

export {Logs};
