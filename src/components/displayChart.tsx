import React, {useState, useEffect, useRef, ChangeEvent} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';

import LogIcon from '../images/logButton.svg';
import ExpandIcon from '../images/expand.svg';
import CloseIcon from '../images/closeDelete.svg';

import PageBack from '../images/pageBack.svg';
import PageForward from '../images/pageForward.svg';

import SearchIcon from '../images/magnifying.svg';
import SearchDelete from '../images/crossSearchBar.svg';

// import zoomInIcon from '../images/zoomIn.svg';
// import zoomOutIcon from '../images/zoomOut.svg';

// import Chart from 'chart.js/auto';
import {Chart, registerables, ChartType as ChartJSType} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';

import {theme, themeStyles} from '../styles';

import {
  ApplicationState,
  AppDispatch,
  ChartType,
  CountProps,
  ChartProps as ChartTypeProps,
} from '../store/types';

import {countTableEntries, getChartEntries} from '../store/app/dbase/actions';

import {
  Misc,
  Search,
} from '../config/vars';

import {colours} from '../config/colours';

interface ChartProps {
  chartType: ChartType
  isFullScreen: boolean
  navLink: string
  logNavLink: string
}

interface StateProps {
  countData: CountProps,
  chartData: ChartTypeProps
}

interface DispatchProps {
  countTableEntries: (
    query: string,
    key: string
  ) => void
  getChartEntries: (
    query: string,
    key: string,
    countKey: string,
    dataKey: string
  ) => void
}

type Props = ChartProps & StateProps & DispatchProps;

export const chart = (props: Props) => {
  let [searchTerm, setSearchTerm] = useState('');
  const [lastUpdateHash, setLastUpdateHash] = useState('');

  const [totalRecords, setTotalRecords] = useState(0);
  const [page, setPage] = useState(0);
  const [thisPage, setThisPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [nextDisabled, setNextDisabled] = useState(false);
  const [backDisabled, setBackDisabled] = useState(true);
  const [activeTime, setActiveTime] = useState(Misc.time.all.timeString);
  const [timeFrom, setTimeFrom] = useState('0');

  // eslint-disable-next-line no-unused-vars
  const [charts, setCharts] = useState([] as any[]);
  const [data, setData] = useState([] as any[]);
  const dataCtx = useRef<HTMLCanvasElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const setPageRef = useRef<HTMLInputElement>(null);

  // const updateInterval = 3000;

  const classes = themeStyles();

  let NavLinkIcon = ExpandIcon;
  let viewport = '208px';
  let chartNodes = props.chartType.nodes;
  if ( props.isFullScreen ) {
    NavLinkIcon = CloseIcon;
    chartNodes = props.chartType.nodesFullScreen;
    viewport = '494px';
  }

  // initialise
  useEffect(() => {
    // Chart.register(...registerables);
    Chart.register(zoomPlugin, ...registerables);
  }, []);

  useEffect(() => {
    // const thisTime = Date.now();
    const key = props.chartType.key;
    if (props.countData.data[key]) {
      // eslint-disable-next-line max-len
      // console.log('got count data: ', props.countData.data[props.chartType.countQuery]);
      const thisCount = props.countData.data[key];
      if ( thisCount != totalRecords ) {
        setTotalRecords(props.countData.data[key]);
      }
    }
  }, [props.countData]);

  useEffect(() => {
    // const thisTime = Date.now();
    const key = props.chartType.key;
    if ( ( props.chartData.data[key] ) &&
         ( props.chartData.data[key].hash != lastUpdateHash) ) {
      // console.log('got data', props.chartData.data[key]);
      const keys = Object.keys(props.chartData.data[key].data);
      const values = Object.values(props.chartData.data[key].data);
      // const thisNumCharts = Math.ceil(keys.length / chartNodes);
      let thisArray: any[] = [];
      const thisData = [];
      // const entries = Object.entries(props.chartData.data[key]);
      for (let i=0; i< keys.length; i += chartNodes) {
        thisArray.push(keys.slice(i, i+ chartNodes));
        thisArray.push(values.slice(i, i+ chartNodes));
        thisData.push(thisArray);
        thisArray = [];
      }
      setData(thisData);
      setTotalPages(thisData.length);
      setPage(1);
      setLastUpdateHash(props.chartData.data[key].hash );
    }
  }, [props.chartData]);

  useEffect(() => {
    // const thisTime = Date.now();
    if ( page && data.length ) {
      const ctx: HTMLCanvasElement | null = dataCtx.current;
      if ( ctx ) {
        const thisChart = new Chart(ctx, {
          type: props.chartType.type as ChartJSType,
          data: {
            labels: data[page - 1][0],
            datasets: [{
              data: data[page - 1][1],
              backgroundColor: colours,
            }],
          },
          options: props.chartType.options,
        });
        charts.push(thisChart);
      }

      if ( page === 1 && data.length === 1) {
        setBackDisabled(true);
        setNextDisabled(true);
      } else if ( page === 1 && page < data.length) {
        setBackDisabled(true);
        setNextDisabled(false);
      } else if ( page >= data.length ) {
        setNextDisabled(true);
        setBackDisabled(false);
      } else {
        setNextDisabled(false);
        setBackDisabled(false);
      }

      // console.log(props.chartType.name, page, totalPages, data.length);
    }
    return () => {
      charts.forEach((chart: any) => {
        chart.destroy();
      });
    };
  }, [data, page]);

  useEffect(() => {
    // console.log('setting time', timeFrom);
    doQuery();
  }, [timeFrom]);

  const doQuery = () => {
    const timeNow = Date.now().toString();
    let countQuery =
      props.chartType.countQuery.replace(/<firstTime>/g, timeFrom);
    let query = props.chartType.query.replace(/<firstTime>/g, timeFrom);

    if ( searchTerm ) {
      query = props.chartType.searchQuery.replace(/<searchTerm>/g, searchTerm);
      query = query.replace(/<firstTime>/g, timeFrom);

      countQuery =
        props.chartType.searchCountQuery.replace(/<searchTerm>/g, searchTerm);
      countQuery = countQuery.replace(/<firstTime>/g, '0');
    }

    query = query.replace(/<secondTime>/g, timeNow);
    countQuery = countQuery.replace(/<secondTime>/g, timeNow);

    props.countTableEntries(countQuery, props.chartType.key);
    props.getChartEntries(
        query,
        props.chartType.key,
        props.chartType.countColumn,
        props.chartType.dataColumn);
  };

  const doSetSearchTerm =
      (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearchTerm(e.target.value);
      };

  const clearSearch = () => {
    searchTerm = '';
    (searchRef.current as HTMLInputElement).value = '';
    doQuery();
  };

  /*
  const resetZoom = () => {
    chart.resetZoom();
  };
  */

  const doTime = (span: string) => {
    let timeFrom = 0;
    const timeNow = Date.now();
    switch (span) {
      case Misc.time.anHour.timeString: {
        timeFrom = timeNow - Misc.time.anHour.timeAmount;
        setActiveTime(Misc.time.anHour.timeString);
        break;
      }
      case Misc.time.sixHours.timeString: {
        timeFrom = timeNow - Misc.time.sixHours.timeAmount;
        setActiveTime(Misc.time.sixHours.timeString);
        break;
      }
      case Misc.time.twelveHours.timeString: {
        timeFrom = timeNow - Misc.time.twelveHours.timeAmount;
        setActiveTime(Misc.time.twelveHours.timeString);
        break;
      }
      case Misc.time.aDay.timeString: {
        timeFrom = timeNow - Misc.time.aDay.timeAmount;
        setActiveTime(Misc.time.aDay.timeString);
        break;
      }
      case Misc.time.aWeek.timeString: {
        timeFrom = timeNow - Misc.time.aWeek.timeAmount;
        setActiveTime(Misc.time.aWeek.timeString);
        break;
      }
      case Misc.time.aMonth.timeString: {
        timeFrom = timeNow - Misc.time.aMonth.timeAmount;
        setActiveTime(Misc.time.aMonth.timeString);
        break;
      }
      case Misc.time.threeMonths.timeString: {
        timeFrom = timeNow - Misc.time.threeMonths.timeAmount;
        setActiveTime(Misc.time.threeMonths.timeString);
        break;
      }
      case Misc.time.sixMonths.timeString: {
        timeFrom = timeNow - Misc.time.sixMonths.timeAmount;
        setActiveTime(Misc.time.sixMonths.timeString);
        break;
      }
      case Misc.time.aYear.timeString: {
        timeFrom = timeNow - Misc.time.aYear.timeAmount;
        setActiveTime(Misc.time.aYear.timeString);
        break;
      }
      case Misc.time.all.timeString: {
        timeFrom = timeNow - Misc.time.all.timeAmount;
        setActiveTime(Misc.time.all.timeString);
        break;
      }
    }

    setTimeFrom(timeFrom.toString());
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
    if ( page >= 1 && page <= (data.length)) {
      // console.log('yup setting page', page);
      setPage(page);
      (setPageRef.current as HTMLInputElement).value = page.toString();
    } else if ( page < 1 ) {
      setPage(1);
      (setPageRef.current as HTMLInputElement).value = '1';
    } else {
      setPage(data.length);
      (setPageRef.current as HTMLInputElement).value =
        data.length.toString();
    }
  };

  return (
    <>
      <Grid
        container
        alignItems="flex-start"
        style={{
          padding: theme.spacing(3),
        }}
      >
        <Grid container className={classes.chartTitle}>
          <Grid
            item
            container
            alignItems="flex-end"
            xs={7}
          >
            <Typography variant="h3">
              {props.chartType.name}
            </Typography>
          </Grid>

          <Grid item container alignItems='center' xs={5}>

            <Grid
              item
              container
              alignItems='center'
              xs={8}
            >

              <Grid item>
                <Typography variant="body1">
                    Page
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  aria-label="Page back"
                  onClick={() => setPageNumber(page - 1)}
                  disabled={backDisabled}
                  classes={{
                    disabled: classes.buttonDisabled,
                  }}
                  style={{
                    margin: 0,
                    padding: 0,
                    paddingLeft: theme.spacing(0.5),
                    background: '#FFFFFF',
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
                  InputProps={{
                    disableUnderline: true,
                  }}
                />
              </Grid>
              <Grid item>
                <Button
                  aria-label="Page forward"
                  onClick={() => setPageNumber(page + 1)}
                  disabled={nextDisabled}
                  style={{
                    margin: 0,
                    padding: 0,
                    paddingRight: theme.spacing(0.5),
                    background: '#FFFFFF',
                    opacity: `${nextDisabled ? 0.3:1}`,
                  }}
                >
                  <PageForward className={classes.chartIcon} />
                </Button>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                    of {totalPages}
                </Typography>
              </Grid>
            </Grid>
            <Grid item container justifyContent='flex-end' xs={4}>
              <Grid item xs={6}>
                <NavLink to={props.logNavLink}>
                  <IconButton
                    aria-label="Logs"
                  >
                    <LogIcon className={classes.chartIcon} />
                  </IconButton>
                </NavLink>
              </Grid>
              <Grid item container justifyContent='flex-end' xs>
                <NavLink to={props.navLink}>
                  <IconButton
                    aria-label="chartOrHome"
                  >
                    <NavLinkIcon className={classes.chartIcon} />
                  </IconButton>
                </NavLink>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
        >
          <TextField
            fullWidth
            placeholder={Search.placeHolder}
            inputRef={searchRef}
            size="small"
            name="search"
            type="text"
            variant='outlined'
            onChange={(e) => {
              doSetSearchTerm(e);
            }}
            onKeyPress= {(e) => {
              if (e.key === 'Enter') {
                doQuery();
              }
            }}
            InputProps={{
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

        { props.isFullScreen ?
            <>
              <Grid
                item
                container
                alignItems="flex-start"
                xs={12}
              >
                <Typography variant="h3">
                  Total {props.chartType.name} = {totalRecords}
                </Typography>
              </Grid>

              <Grid item container justifyContent="flex-start" xs={12}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 4000 20"
                >

                  <line
                    x2="4000"
                    stroke="#001C32"
                    width="100%"
                    height="100%" />

                </svg>
              </Grid>
            </> :
            null
        }
        <Grid
          item
          container
          alignItems="flex-start"
          style={{
            marginTop: theme.spacing(1),
            width: '100%',
            height: viewport,
          }}
          xs={12}
        >
          <div
            style={{
              height: viewport,
              width: '100%',
              paddingRight: theme.spacing(1),
            }}
          >
            <canvas
              id={props.chartType.key}
              ref={dataCtx}
            />
          </div>
        </Grid>
      </Grid>
      <Grid
        item
        container
        alignItems="center"
        justifyContent='flex-start'
        xs={12}
        style={{
          background: '#001C32',
          backgroundColor: '#001C32',
          borderBottomLeftRadius: '20px',
          borderBottomRightRadius: '20px',
        }}
      >
        <Grid
          item
          container
          alignItems="center"
          justifyContent="flex-start"
          xs={2}
          style={{
            paddingLeft: theme.spacing(2),
          }}>

          <Typography variant="body2">
            Time
          </Typography>

        </Grid>

        <Grid item container xs={1}>

          <Button
            onClick={() => doTime(Misc.time.anHour.timeString)}
            size='medium'
            variant='outlined'
            color='primary'
            style={{
              background:
                `${activeTime == Misc.time.anHour.timeString ?
                  '#003B69' : '#001C32'}`,
            }}
          >
            <Typography variant="body2">
              {Misc.time.anHour.timeString}
            </Typography>
          </Button>
        </Grid>

        <Grid item container xs={1}>

          <Button
            onClick={() => doTime(Misc.time.sixHours.timeString)}
            size='medium'
            variant='outlined'
            color='primary'
            style={{
              background:
                `${activeTime == Misc.time.sixHours.timeString ?
                  '#003B69' : '#001C32'}`,
            }}
          >
            <Typography variant="body2">
              {Misc.time.sixHours.timeString}
            </Typography>
          </Button>
        </Grid>

        <Grid item container xs={1}>

          <Button
            onClick={() => doTime(Misc.time.twelveHours.timeString)}
            size='medium'
            variant='outlined'
            color='primary'
            style={{
              background:
                `${activeTime == Misc.time.twelveHours.timeString ?
                  '#003B69' : '#001C32'}`,
            }}
          >
            <Typography variant="body2">
              {Misc.time.twelveHours.timeString}
            </Typography>
          </Button>
        </Grid>

        <Grid item container xs={1}>

          <Button
            onClick={() => doTime(Misc.time.aDay.timeString)}
            size='medium'
            variant='outlined'
            color='primary'
            style={{
              background:
                `${activeTime == Misc.time.aDay.timeString ?
                  '#003B69' : '#001C32'}`,
            }}
          >
            <Typography variant="body2">
              {Misc.time.aDay.timeString}
            </Typography>
          </Button>
        </Grid>

        <Grid item container xs={1}>

          <Button
            onClick={() => doTime(Misc.time.aWeek.timeString)}
            size='medium'
            variant='outlined'
            color='primary'
            style={{
              background:
                `${activeTime == Misc.time.aWeek.timeString ?
                  '#003B69' : '#001C32'}`,
            }}
          >
            <Typography variant="body2">
              {Misc.time.aWeek.timeString}
            </Typography>
          </Button>
        </Grid>

        <Grid item container xs={1}>

          <Button
            onClick={() => doTime(Misc.time.aMonth.timeString)}
            size='medium'
            variant='outlined'
            color='primary'
            style={{
              background:
                `${activeTime == Misc.time.aMonth.timeString ?
                  '#003B69' : '#001C32'}`,
            }}
          >
            <Typography variant="body2">
              {Misc.time.aMonth.timeString}
            </Typography>
          </Button>
        </Grid>

        <Grid item container xs={1}>

          <Button
            onClick={() => doTime(Misc.time.threeMonths.timeString)}
            size='medium'
            variant='outlined'
            color='primary'
            style={{
              background:
                `${activeTime == Misc.time.threeMonths.timeString ?
                  '#003B69' : '#001C32'}`,
            }}
          >
            <Typography variant="body2">
              {Misc.time.threeMonths.timeString}
            </Typography>
          </Button>
        </Grid>

        <Grid item container xs={1}>

          <Button
            onClick={() => doTime(Misc.time.sixMonths.timeString)}
            size='medium'
            variant='outlined'
            color='primary'
            style={{
              background:
                `${activeTime == Misc.time.sixMonths.timeString ?
                  '#003B69' : '#001C32'}`,
            }}
          >
            <Typography variant="body2">
              {Misc.time.sixMonths.timeString}
            </Typography>
          </Button>
        </Grid>

        <Grid item container xs={1}>

          <Button
            onClick={() => doTime(Misc.time.aYear.timeString)}
            size='medium'
            variant='outlined'
            color='primary'
            style={{
              background:
                `${activeTime == Misc.time.aYear.timeString ?
                  '#003B69' : '#001C32'}`,
            }}
          >
            <Typography variant="body2">
              {Misc.time.aYear.timeString}
            </Typography>
          </Button>
        </Grid>

        <Grid item container xs={1}>

          <Button
            onClick={() => doTime(Misc.time.all.timeString)}
            size='medium'
            variant='outlined'
            color='primary'
            style={{
              background:
                `${activeTime == Misc.time.all.timeString ?
                  '#003B69' : '#001C32'}`,
              borderBottomRightRadius: '20px',
            }}
          >
            <Typography variant="body2">
              {Misc.time.all.timeString}
            </Typography>
          </Button>
        </Grid>

      </Grid>
    </>
  );
};

const mapStateToProps = (state: ApplicationState): StateProps => {
  return {
    countData: state.countData as CountProps,
    chartData: state.chartsData as ChartTypeProps,
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
    getChartEntries: (
        query: string,
        key: string,
        countKey: string,
        dataKey: string,
    ) =>
      dispatch(getChartEntries(query, key, countKey, dataKey)),
  };
};

const DisplayChart =
  connect<StateProps, DispatchProps, {}, ApplicationState>(
      mapStateToProps,
      mapDispatchToProps,
  )(chart);

export {DisplayChart};

