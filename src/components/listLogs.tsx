/* eslint-disable no-unused-vars */
import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';

import MUIDataTable, {Responsive, FilterType} from 'mui-datatables';

import Grid from '@material-ui/core/Grid';
import {
  createMuiTheme,
  MuiThemeProvider,
  withStyles,
} from '@material-ui/core/styles';

import {theme, themeStyles} from '../styles';

import {
  ApplicationState,
  AppDispatch,
  LogsProps,
  Logs as LogsType,
} from '../store/types';

import {getDbaseEntries} from '../store/app/dbase/actions';

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
  const isFirstRun = useRef(true);

  const [responsive, setResponsive] = useState('simple' as Responsive);
  const [filterType, setFilterType] = useState('checkbox' as FilterType);
  const [searchBtn, setSearchBtn] = useState(true);
  const [downloadBtn, setDownloadBtn] = useState(true);
  const [printBtn, setPrintBtn] = useState(true);
  const [viewColumnBtn, setViewColumnBtn] = useState(true);
  const [filterBtn, setFilterBtn] = useState(true);
  const columns =
    [
      LogVars.dateCreated,
      LogVars.loggingTypeId,
      LogVars.loggingType,
      LogVars.data,
    ];
  const [data, setData] = useState([] as any[]);
  const options = {
    search: searchBtn,
    download: downloadBtn,
    print: printBtn,
    viewColumns: viewColumnBtn,
    filter: filterBtn,
    filterType: filterType,
    resizableColumns: true,
    draggableColumns: {
      enabled: true,
    },
    responsive,
  };

  const classes = themeStyles();

  useEffect(() => {
    if ( isFirstRun.current ) {
      isFirstRun.current = false;
      props.getDbaseEntries(
          Dbase.tables.log.name,
          'DATE',
          'DESC',
          0,
          Dbase.maxLimit);
    } else {
      const logsData: any[] = [];
      props.logsData?.data.forEach( ( log: LogsType, index: number ) => {
        const thisDate = new Date(+log.DATE);
        const dateCreated = thisDate.toString().replace(/ GMT.*$/g, '');
        const loggingType = log.LOGGINGTYPE;
        const thisData = log.DATA;
        const loggingTypeId = log.LOGGINGTYPEID;
        const rowData: any[] =
          [dateCreated, loggingTypeId, loggingType, thisData];
        logsData.push(rowData);
        console.log('pushing data', rowData);
      });
      setData(logsData);
    }
  }, [props.logsData]);

  const getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTable: {
          root: {
            backgroundColor: 'white',
          },
          paper: {
            boxShadow: 'none',
          },
        },
        MUIDataTableBodyCell: {
          root: {
            backgroundColor: 'white',
          },
        },
      },
    });

  /*
  const getRecords = (lowLimit: number) => {
    props.getDbaseEntries(
        Dbase.tables.log.name,
        'DATE',
        'DESC',
        lowLimit,
        Dbase.pageLimit);
  };
  */

  return (

    <>
      <Grid
        item container
        alignItems='flex-start'
        xs={12}
      >
        <div
          style={{
            width: '100%',
          }}
        >
          <MuiThemeProvider theme={getMuiTheme()}>
            <MUIDataTable
              title=''
              data={data}
              columns={columns}
              options={options}
            />
          </MuiThemeProvider>
        </div>
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
