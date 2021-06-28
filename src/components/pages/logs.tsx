import React, {useEffect, useState, useRef, ChangeEvent} from 'react';
import {connect} from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import {
  ApplicationState,
  AppDispatch,
  CountProps,
  LogsProps,
  Logs as LogsType,
  LogType,
  LogsActionTypes,
  SuccessAndFailType,
} from '../../store/types';

import {
  countTableEntries,
  getTableEntries,
} from '../../store/app/dbase/actions';

import {theme, themeStyles} from '../../styles';

import {
  Dbase,
  Log as LogVars,
  Search,
} from '../../config';

import pageBack from '../../images/pageBack.svg';
import pageForward from '../../images/pageNext.svg';

interface ThisProps {
  logType: LogType
}

interface StateProps {
  countData: CountProps,
  logsData: LogsProps
}

interface DispatchProps {
  countTableEntries: (
    query: string
  ) => void
  getTableEntries: (
    query: string,
    actionType: SuccessAndFailType,
  ) => void
}

type Props = ThisProps & StateProps & DispatchProps

export const list = (props: Props) => {
  const isFirstRun = useRef(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCountQuery, setSearchCountQuery] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [low, setLimitLow] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [offset, setOffset] = useState(Dbase.pageLimit);
  const [totalRecords, setTotalRecords] = useState(0);
  const [nextDisabled, setNextDisabled] = useState(false);
  const [backDisabled, setBackDisabled] = useState(true);

  const actionType: SuccessAndFailType = {
    success: LogsActionTypes.LOGS_SUCCESS,
    fail: LogsActionTypes.LOGS_FAILURE,
  };

  // SELECT * FROM LOGGING ORDER BY DATE DESC LIMIT 0, 2147483647

  const classes = themeStyles();

  useEffect(() => {
    if ( isFirstRun.current ) {
      isFirstRun.current = false;
      const query = props.logType.query + ' LIMIT ' + low + ', ' + offset;
      props.countTableEntries(props.logType.countQuery);
      props.getTableEntries(query, actionType);
    } else {
      if ( searchCountQuery ) {
        if (props.countData.data[searchCountQuery]) {
          // eslint-disable-next-line max-len
          // console.log('got count data: ', props.countData.data[searchCountQuery]);
          const thisCount = props.countData.data[searchCountQuery];
          if ( thisCount != totalRecords ) {
            setTotalRecords(props.countData.data[searchCountQuery]);
          }
        }
      } else if (props.countData.data[props.logType.countQuery]) {
        // eslint-disable-next-line max-len
        // console.log('got count data: ', props.countData.data[props.logType.countQuery]);
        const thisCount = props.countData.data[props.logType.countQuery];
        if ( thisCount != totalRecords ) {
          setTotalRecords(props.countData.data[props.logType.countQuery]);
        }
      }

      if ( (low + offset) >= totalRecords ) {
        setNextDisabled(true);
        setBackDisabled(false);
      } else if ( low === 0 ) {
        setNextDisabled(false);
        setBackDisabled(true);
      } else {
        setNextDisabled(false);
        setBackDisabled(false);
      }
    }
  }, [props.countData, props.logsData]);

  const doSetSearchTerm =
      (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearchTerm(e.target.value);
      };

  const doSearch = () => {
    setLimitLow(0);
    let countQuery = props.logType.countQuery;
    let query = props.logType.query + ' LIMIT ' + 0 + ', ' + offset;

    if ( searchTerm ) {
      query = props.logType.searchQuery.replace(/<[^>]*>/g, searchTerm);
      countQuery =
        props.logType.searchCountQuery.replace(/<[^>]*>/g, searchTerm);

      /*
      console.log('count query: ', countQuery, props.logType.searchCountQuery);
      console.log('query: ', query, props.logType.searchQuery);
      */

      setSearchCountQuery(countQuery);
      setSearchQuery(query);

      query += ' LIMIT ' + 0 + ', ' + Dbase.pageLimit;
    } else {
      setSearchCountQuery('');
      setSearchQuery('');
    }

    /* console.log('count query: ', countQuery);
    console.log('query: ', query);*/

    props.countTableEntries(countQuery);
    props.getTableEntries(query, actionType);
  };

  const getRecords = (lowLimit: number) => {
    // console.log('getting records', lowLimit, offset, totalRecords);
    if ( lowLimit >= 0) {
      setLimitLow(lowLimit);
      let query = props.logType.query;
      if ( searchQuery ) {
        query = searchQuery;
      }
      query += ' LIMIT ' + lowLimit + ', ' + offset;
      // console.log('getting records', query, totalRecords);
      // console.log(query);
      props.getTableEntries(query, actionType);
    }
  };

  return (

    <Grid
      item
      container
      alignItems="flex-start"
      style={{
        paddingLeft: theme.spacing(8),
        paddingRight: theme.spacing(8),
      }}
      xs={12}
    >
      <Grid
        container
        alignItems="flex-start"
      >

        <Grid item container alignItems="flex-start" xs={12}>
          <Typography variant="h2">
            {props.logType.name}
          </Typography>
        </Grid>

        <Grid item container alignItems="center" xs={12}>
          <Grid item container justify="flex-start" xs={1}>
            <Typography variant="h5">
              {LogVars.records} &nbsp;
              {(low + Dbase.pageLimit) / Dbase.pageLimit}
            </Typography>
          </Grid>
          <Grid
            item
            container
            alignItems="flex-start"
            justify="center"
            xs={10}
          >
            <Grid item container alignItems="center" xs={12}>

              <TextField
                fullWidth
                placeholder={Search.placeHolder}
                size="small"
                name="search"
                type="text"
                onChange={(e) => {
                  doSetSearchTerm(e);
                }}
                onKeyPress= {(e) => {
                  if (e.key === 'Enter') {
                    doSearch();
                  }
                }}
                InputProps={{disableUnderline: true}}
              />
            </Grid>
          </Grid>
          <Grid item container alignItems='center' justify='flex-end' xs={1}>
            <Grid item container justify='flex-end' xs={6}>
              <Button
                aria-label="Page back"
                onClick={() => getRecords(low - Dbase.pageLimit)}
                disabled={backDisabled}
                style={{
                  margin: 0,
                  padding: 0,
                  background: '#F0F0FA',
                }}
              >
                <img className={classes.pageIcon} src={pageBack} />
              </Button>
            </Grid>
            <Grid item container justify='flex-end' xs={6}>
              <Button
                aria-label="Page forward"
                onClick={() => getRecords(low + Dbase.pageLimit)}
                disabled={nextDisabled}
                style={{
                  margin: 0,
                  padding: 0,
                  background: '#F0F0FA',
                }}
              >
                <img className={classes.pageIcon} src={pageForward}/>
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
            { props.logsData?.data?.map( ( log: LogsType, index: number ) => {
              const thisDate = new Date(+log.DATE);
              const dateCreated = thisDate.toString().replace(/ GMT.*$/g, '');
              const loggingType = log.LOGGINGTYPE;
              const action = log.ACTION;
              const thisData = log.DATA;

              // const rowclass = index % 2 ? classes.evenRow : classes.oddRow;

              return (
                <React.Fragment key={index}>

                  <Grid className={classes.row} item container xs={12}>
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
    countData: state.countData as CountProps,
    logsData: state.logsData as LogsProps,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => {
  return {
    countTableEntries: (
        query: string,
    ) => dispatch(countTableEntries(
        query,
    )),
    getTableEntries: (
        query: string,
        actionType: SuccessAndFailType,
    ) => dispatch(getTableEntries(
        query,
        actionType,
    )),
  };
};

const Logs = connect<StateProps, DispatchProps, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(list);

export {Logs};
