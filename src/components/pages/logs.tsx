import React, {useEffect, useState, ChangeEvent} from 'react';
import {connect} from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import {
  ApplicationState,
  AppDispatch,
  LogsProps,
  Logs as LogsType,
  LogType,
  LogsActionTypes,
  SuccessAndFailType,
} from '../../store/types';

import {getTableEntries} from '../../store/app/dbase/actions';

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
  logsData: LogsProps
}

interface DispatchProps {
  getTableEntries: (
    query: string,
    actionType: SuccessAndFailType,
  ) => void
}

type Props = ThisProps & StateProps & DispatchProps

export const list = (props: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [low, setLimitLow] = useState(0);
  const [numRecords, setNumRecords] = useState(Dbase.pageLimit);
  // const [nextDisabled, setNextDisabled] = useState(true);
  // const [backDisabled, setBackDisabled] = useState(true);

  const actionType: SuccessAndFailType = {
    success: LogsActionTypes.LOGS_SUCCESS,
    fail: LogsActionTypes.LOGS_FAILURE,
  };

  // SELECT * FROM LOGGING ORDER BY DATE DESC LIMIT 0, 2147483647
  const query = props.logType.query + ' LIMIT ' + low + ', ' + numRecords;

  const classes = themeStyles();

  useEffect(() => {
    props.getTableEntries(query, actionType);
  }, []);

  const doSetSearchTerm =
      (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearchTerm(e.target.value);
      };

  const doSearch = () => {
    console.log('seartch term: ', searchTerm);
  };

  const getRecords = (lowLimit: number) => {
    console.log('getting records', lowLimit);
    if ( lowLimit >= 0 ) {
      setLimitLow(lowLimit);
      setNumRecords(lowLimit + Dbase.pageLimit);
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

        <Grid item container alignItems="flex-start" xs={12}>
          <Grid item container justify="flex-start" xs={1}>
            <Typography variant="h5">
              {LogVars.records} {numRecords / Dbase.pageLimit}
            </Typography>
          </Grid>
          <Grid
            item
            container
            alignItems="flex-start"
            justify="center"
            xs={10}
          >
            <Grid item container xs={12}>

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
    logsData: state.logsData as LogsProps,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => {
  return {
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
