/* eslint-disable no-unused-vars */
import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';

import
MUIDataTable,
{Responsive, FilterType, SelectableRows} from 'mui-datatables';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core/styles';

import {themeStyles} from '../styles';

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
  const [selectableRows, setSelectableRows] =
      useState('none' as SelectableRows);
  const [searchBtn, setSearchBtn] = useState(true);
  const [downloadBtn, setDownloadBtn] = useState(true);
  const [printBtn, setPrintBtn] = useState(true);
  const [viewColumnBtn, setViewColumnBtn] = useState(false);
  const [filterBtn, setFilterBtn] = useState(true);
  const columns =
    [
      {
        name: LogVars.dateCreated,
        options: {
          filter: true,
          sort: true,
          customBodyRender:
            // eslint-disable-next-line react/display-name
            (value: any, _tableMeta: any, _updateValue: any) => {
              return (
                <Typography variant="body1" noWrap={true}>
                  {value}
                </Typography>
              );
            },
        },
      },
      {
        name: LogVars.loggingTypeId,
        options: {
          filter: false,
          sort: false,
          customBodyRender:
            // eslint-disable-next-line react/display-name
            (value: any, _tableMeta: any, _updateValue: any) => {
              return (
                <Typography variant="body1" noWrap={true}>
                  {value}
                </Typography>
              );
            },
        },
      },
      {
        name: LogVars.loggingType,
        options: {
          filter: true,
          sort: true,
          customBodyRender:
            // eslint-disable-next-line react/display-name
            (value: any, _tableMeta: any, _updateValue: any) => {
              return (
                <Typography variant="body1" noWrap={true}>
                  {value}
                </Typography>
              );
            },
        },
      },
      {
        name: LogVars.data,
        options: {
          filter: false,
          sort: false,
          customBodyRender:
            // eslint-disable-next-line react/display-name
            (value: any, _tableMeta: any, _updateValue: any) => {
              return (
                <Typography variant="body1" noWrap={true}>
                  {value}
                </Typography>
              );
            },
        },
      },
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
    selectableRows: selectableRows,
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
        MUIDataTableHeadCell: {
          root: {
            'lineHeight': '1.5',
            'fontSize': '1.4em',
            'fontWeight': 400,
            'fontFamily': '"Manrope", "Roboto", "Arial", "sans-serif"',
            'color': '#AAAABE',
          },
        },
        MUIDataTable: {
          root: {
            'backgroundColor': 'white',
            'width': '100%',
          },
          paper: {
            boxShadow: 'none',
          },
        },
        MUIDataTableBodyCell: {
          root: {
            'backgroundColor': 'white',
          },
        },
        MuiButton: {
          label: {
            'lineHeight': '1.5',
            'fontSize': '1.4em',
            'fontWeight': 400,
            'fontFamily': '"Manrope", "Roboto", "Arial", "sans-serif"',
            'color': '#AAAABE',
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
        <MuiThemeProvider theme={getMuiTheme()}>
          <MUIDataTable
            title=''
            data={data}
            columns={columns}
            options={options}
          />
        </MuiThemeProvider>
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
