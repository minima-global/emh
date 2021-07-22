import React, {useEffect, useState, useRef, ChangeEvent} from 'react';
import {connect} from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import SearchIcon from '../../images/magnifying.svg';
import SearchDelete from '../../images/crossSearchBar.svg';

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
} from '../../config/vars';

import PageBack from '../../images/pageBack.svg';
import PageForward from '../../images/pageForward.svg';

interface ThisProps {
  logType: LogType
}

interface StateProps {
  countData: CountProps,
  logsData: LogsProps
}

interface DispatchProps {
  countTableEntries: (
    query: string,
    key: string
  ) => void
  getTableEntries: (
    query: string,
    actionType: SuccessAndFailType,
  ) => void
}

type Props = ThisProps & StateProps & DispatchProps

export const list = (props: Props) => {
  let [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [low, setLimitLow] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [offset, setOffset] = useState(Dbase.pageLimit);
  const [totalRecords, setTotalRecords] = useState(0);
  let [page, setPage] = useState(0);
  const [thisPage, setThisPage] = useState(0);
  const [nextDisabled, setNextDisabled] = useState(false);
  const [backDisabled, setBackDisabled] = useState(true);

  const searchRef = useRef<HTMLInputElement>(null);
  const setPageRef = useRef<HTMLInputElement>(null);

  const actionType: SuccessAndFailType = {
    success: LogsActionTypes.LOGS_SUCCESS,
    fail: LogsActionTypes.LOGS_FAILURE,
  };

  // SELECT * FROM LOGGING ORDER BY DATE DESC LIMIT 0, 2147483647

  const classes = themeStyles();

  // initialise
  useEffect(() => {
    const query = props.logType.query + ' LIMIT ' + low + ', ' + offset;
    props.countTableEntries(props.logType.countQuery, props.logType.key);
    props.getTableEntries(query, actionType);
    setPage(1);
  }, []);

  useEffect(() => {
    if (props.countData.data[props.logType.key]) {
    // eslint-disable-next-line max-len
      // console.log('got count data: ', props.countData.data[props.logType.key]);
      const thisCount = props.countData.data[props.logType.key];
      if ( thisCount != totalRecords ) {
        setTotalRecords(props.countData.data[props.logType.key]);
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
  }, [props.logsData, props.countData]);

  const doSetSearchTerm =
      (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearchTerm(e.target.value);
      };

  const doSearch = () => {
    setLimitLow(0);
    let countQuery = props.logType.countQuery;
    let query = props.logType.query;

    if ( searchTerm ) {
      countQuery =
        props.logType.searchCountQuery.replace(/<[^>]*>/g, searchTerm);
      query = props.logType.searchQuery.replace(/<[^>]*>/g, searchTerm);
      setSearchQuery(query);
    } else {
      setSearchQuery('');
    }

    page = 1;
    (setPageRef.current as HTMLInputElement).value = page.toString();
    query += ' LIMIT ' + 0 + ', ' + offset;
    // console.log('query is', query, page);
    props.countTableEntries(countQuery, props.logType.key);
    props.getTableEntries(query, actionType);
  };

  const clearSearch = () => {
    searchTerm = '';
    (searchRef.current as HTMLInputElement).value = '';
    doSearch();
  };

  const getRecords = (lowLimit: number) => {
    // console.log('getting records', lowLimit, offset, totalRecords);
    if ( lowLimit >= 0) {
      const thisPage = Math.ceil((lowLimit + Dbase.pageLimit)/ Dbase.pageLimit);
      setPage(thisPage);
      (setPageRef.current as HTMLInputElement).value = thisPage.toString();
      setLimitLow(lowLimit);
      let query = props.logType.query;
      if ( searchQuery ) {
        query = searchQuery;
      }
      query += ' LIMIT ' + lowLimit + ', ' + offset;
      // console.log('search query', searchQuery, searchTerm);
      // console.log('getting records', query, totalRecords);
      // console.log(query);
      props.getTableEntries(query, actionType);
    }
  };

  const setThisPageNumber =
  (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setThisPage(parseInt(e.target.value));
  };

  const doSetPage = () => {
    setPageNumber(thisPage);
  };

  const setPageNumber = (page: number) => {
    // console.log('setting page', page);
    if ( page >= 1 && page <= (Math.ceil(totalRecords / Dbase.pageLimit))) {
      // console.log('yup setting page', page);
      getRecords((page * Dbase.pageLimit) - Dbase.pageLimit);
    } else if ( page < 1 ) {
      getRecords(0);
    } else {
      getRecords(totalRecords - Dbase.pageLimit);
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

        <Grid item container alignItems="center" xs={10}>

          <TextField
            fullWidth
            placeholder={Search.placeHolder}
            inputRef={searchRef}
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
            InputProps={{
              disableUnderline: true,
              endAdornment: (
                <>
                  <InputAdornment
                    position="start"
                    onClick={() => clearSearch()}>
                    <SearchDelete className={classes.searchClearIcon}/>
                  </InputAdornment>
                  <InputAdornment position="end">
                    <svg id="chart" width="1" height="30">

                      <line
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="30"
                        stroke="#aaaabe"
                        strokeWidth='1'
                      />

                    </svg>
                  </InputAdornment>
                  <InputAdornment position="end">
                    <SearchIcon className={classes.searchIcon} />
                  </InputAdornment>
                </>
              ),
            }}
          />
        </Grid>

        <Grid
          item
          container
          alignItems='center'
          justifyContent='flex-end'
          xs={2}
        >

          <Grid item>
            <Typography variant="body1">
                    Page
            </Typography>
          </Grid>
          <Grid item>
            <Button
              aria-label="Page back"
              onClick={() => getRecords(low - Dbase.pageLimit)}
              disabled={backDisabled}
              classes={{
                disabled: classes.buttonDisabled,
              }}
              style={{
                margin: 0,
                padding: 0,
                paddingLeft: theme.spacing(0.5),
                background: '#F0F0FA',
                opacity: `${backDisabled ? 0.3:1}`,
              }}
            >
              <PageBack className={classes.chartIcon} />
            </Button>
          </Grid>
          <Grid item container alignItems='flex-end' xs={3}>
            <TextField
              placeholder={page.toString()}
              inputRef={setPageRef}
              size="small"
              name="page"
              type="text"
              onChange={(e) => {
                setThisPageNumber(e);
              }}
              onKeyPress= {(e) => {
                if (e.key === 'Enter') {
                  doSetPage();
                }
              }}
              inputProps={{
                style: {
                  margin: 0,
                  padding: theme.spacing(0.6),
                  paddingTop: 0,
                  paddingBottom: 0,
                  paddingLeft: theme.spacing(0.5),
                  paddingRight: theme.spacing(0.5),
                },
              }}
              InputProps={{disableUnderline: true}}
            />
          </Grid>
          <Grid item>
            <Button
              aria-label="Page forward"
              onClick={() => getRecords(low + Dbase.pageLimit)}
              disabled={nextDisabled}
              style={{
                margin: 0,
                padding: 0,
                paddingRight: theme.spacing(0.5),
                background: '#F0F0FA',
                opacity: `${nextDisabled ? 0.3:1}`,
              }}
            >
              <PageForward className={classes.chartIcon} />
            </Button>
          </Grid>
          <Grid item>
            <Typography variant="body1">
                of {Math.ceil(totalRecords / Dbase.pageLimit)}
            </Typography>
          </Grid>
        </Grid>

        <Grid item container alignItems="flex-start" xs={12}>

          <Grid item container xs={12}>

            <Grid
              item
              container
              justifyContent="flex-start"
              xs={2}
            >
              <Typography variant="h6">
                {LogVars.dateCreated}
              </Typography>
            </Grid>

            <Grid
              item
              container
              justifyContent="flex-start"
              xs={1}
            >
              <Typography variant="h6">
                {LogVars.loggingType}
              </Typography>
            </Grid>

            <Grid
              item
              container
              justifyContent="flex-start"
              xs={1}
            >
              <Typography
                variant="h6"
              >
                {LogVars.action}
              </Typography>
            </Grid>

            <Grid
              item
              container
              justifyContent="flex-start"
              xs={3}
            >
              <Typography variant="h6">
                {LogVars.data}
              </Typography>
            </Grid>

            <Grid
              item
              container
              justifyContent="flex-start"
              xs={5}
            >
              <Typography variant="h6">
                {LogVars.extra}
              </Typography>
            </Grid>

          </Grid>

          <Grid
            className={classes.pageSummary}
            item
            container
            justifyContent="flex-start"
            xs={12}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 4000 20"
            >
              <line x2="4000" stroke="#001C32" width="100%" height="100%"/>
            </svg>
          </Grid>

          <Grid item container className={classes.pageSummary} xs={12}>
            { props.logsData?.data?.map( ( log: LogsType, index: number ) => {
              const thisDate = new Date(+log.DATE);
              const dateCreated = thisDate.toString().replace(/ GMT.*$/g, '');
              const loggingType = log.LOGGINGTYPE;
              const action = log.ACTION;
              const thisData = log.DATA;
              const thisExtra = log.EXTRA;

              // const rowclass = index % 2 ? classes.evenRow : classes.oddRow;

              return (
                <React.Fragment key={index}>

                  <Grid className={classes.row} item container xs={12}>
                    <Grid
                      item
                      container
                      justifyContent="flex-start"
                      xs={2}
                    >
                      <Typography variant="body1">
                        {dateCreated}
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      container
                      justifyContent="flex-start"
                      xs={1}
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
                      justifyContent="flex-start"
                      xs={1}
                    >
                      <Typography variant="body1">
                        {action}
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      container
                      justifyContent="flex-start"
                      xs={3}
                    >
                      <Typography
                        variant="body1"
                        noWrap={true}
                      >
                        {thisData}
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      container
                      justifyContent="flex-start"
                      xs={5}
                    >
                      <Typography
                        variant="body1"
                        noWrap={true}
                      >
                        {thisExtra}
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
        key: string,
    ) => dispatch(countTableEntries(
        query,
        key,
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
