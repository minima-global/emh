import React, {useState, useEffect, useRef, ChangeEvent} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import logIcon from '../images/log.svg';
import expandIcon from '../images/expand.svg';
import closeIcon from '../images/closeDelete.svg';
// import zoomInIcon from '../images/zoomIn.svg';
// import zoomOutIcon from '../images/zoomOut.svg';

// import Chart from 'chart.js/auto';
import {Chart, registerables, ChartType as ChartJSType} from 'chart.js';
// import zoomPlugin from 'chartjs-plugin-zoom';

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
import { AnyObject } from 'yup/lib/object';

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
  const isFirstRun = useRef(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalRecords, setTotalRecords] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [charts, setCharts] = useState([] as any[]);
  let [data, setData] = useState([] as any[]);
  const dataCtx = useRef([] as any);

  // const updateInterval = 3000;

  let navLinkIcon = expandIcon;
  let viewport = '240px';
  if ( props.isFullScreen ) {
    navLinkIcon = closeIcon;
    viewport = '510px';
  }

  const chartnodes = 2;

  const classes = themeStyles();
  // Chart.register(zoomPlugin, ...registerables);

  useEffect(() => {
    if ( isFirstRun.current ) {
      isFirstRun.current = false;

      Chart.register(...registerables);

      const timeNow = Date.now().toString();
      let countQuery = props.chartType.countQuery.replace(/<firstTime>/g, '0');
      countQuery = countQuery.replace(/<secondTime>/g, timeNow);
      let query = props.chartType.query.replace(/<firstTime>/g, '0');
      query = query.replace(/<secondTime>/g, timeNow);

      props.countTableEntries(countQuery, props.chartType.key);
      props.getChartEntries(
          query,
          props.chartType.key,
          props.chartType.countColumn,
          props.chartType.dataColumn);
    } else {
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

      if ( props.chartData.data[key] ) {
        const keys = Object.keys(props.chartData.data[key]);
        const values = Object.values(props.chartData.data[key]);
        // const thisNumCharts = Math.ceil(keys.length / chartnodes);
        const thisArray = [];
        const entries = Object.entries(props.chartData.data[key]);
        for (let i=0; i< keys.length; i += chartnodes) {
          thisArray.push(entries.slice(i, i+ chartnodes));
        }
        data = thisArray;
        console.log('data', data);

        data.forEach((element, index) => {
          console.log('creating chart for', element, dataCtx);
          // eslint-disable-next-line max-len
          const canvas: HTMLCanvasElement = document.getElementById(props.chartType.name+index) as HTMLCanvasElement;
          const ctx = canvas?.getContext('2d');
          console.log('ctx', ctx);
          if ( ctx ) {
            console.log('ever in here?');
            /* const thisChart = new Chart(ctx, {
              type: props.chartType.type as ChartJSType,
              data: {
                labels: keys.map((key: string) => key),
                datasets: [{
                  data: values.map((value: number) => value),
                  backgroundColor: colours,
                }],
              },
              options: props.chartType.options,
            });
            charts.push(thisChart);*/
          }
        });
      }
    }
    return () => {
      charts.forEach((chart: any) => {
        chart.destroy();
      });
    };
  }, [props.chartData]);

  const doSetSearchTerm =
      (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearchTerm(e.target.value);
      };

  const doSearch = () => {
    const timeNow = Date.now().toString();
    let countQuery = props.chartType.countQuery.replace(/<firstTime>/g, '0');
    let query = props.chartType.query.replace(/<firstTime>/g, '0');

    if ( searchTerm ) {
      query = props.chartType.searchQuery.replace(/<searchTerm>/g, searchTerm);
      query = query.replace(/<firstTime>/g, '0');

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

  /*
  const doZoomIn = () => {
    chart.zoom(1.1);
  };

  const doZoomOut = () => {
    chart.zoom(0.9);
  };
  */

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
        break;
      }
      case Misc.time.sixHours.timeString: {
        timeFrom = timeNow - Misc.time.sixHours.timeAmount;
        break;
      }
      case Misc.time.twelveHours.timeString: {
        timeFrom = timeNow - Misc.time.twelveHours.timeAmount;
        break;
      }
      case Misc.time.aDay.timeString: {
        timeFrom = timeNow - Misc.time.aDay.timeAmount;
        break;
      }
      case Misc.time.aWeek.timeString: {
        timeFrom = timeNow - Misc.time.aWeek.timeAmount;
        break;
      }
      case Misc.time.aMonth.timeString: {
        timeFrom = timeNow - Misc.time.aMonth.timeAmount;
        break;
      }
      case Misc.time.threeMonths.timeString: {
        timeFrom = timeNow - Misc.time.threeMonths.timeAmount;
        break;
      }
      case Misc.time.sixMonths.timeString: {
        timeFrom = timeNow - Misc.time.sixMonths.timeAmount;
        break;
      }
      case Misc.time.aYear.timeString: {
        timeFrom = timeNow - Misc.time.aYear.timeAmount;
        break;
      }
    }

    let countQuery =
      props.chartType.countQuery.replace(/<firstTime>/g, timeFrom.toString());
    let query =
      props.chartType.query.replace(/<firstTime>/g, timeFrom.toString());

    if ( searchTerm ) {
      query = props.chartType.searchQuery.replace(/<searchTerm>/g, searchTerm);
      query = query.replace(/<firstTime>/g, timeFrom.toString());

      countQuery =
        props.chartType.searchCountQuery.replace(/<searchTerm>/g, searchTerm);
      countQuery = countQuery.replace(/<firstTime>/g, timeFrom.toString());
    }

    query = query.replace(/<secondTime>/g, timeNow.toString());
    countQuery = countQuery.replace(/<secondTime>/g, timeNow.toString());

    props.countTableEntries(countQuery, props.chartType.key);
    props.getChartEntries(
        query,
        props.chartType.key,
        props.chartType.countColumn,
        props.chartType.dataColumn);
  };

  return (
    <>
      <Grid
        item
        container
        alignItems="flex-start"
        style={{
          padding: theme.spacing(2),
        }}
      >
        <Grid
          item
          container
          alignItems="flex-start"
          xs={4}
        >
          <Typography variant="h3">
            {props.chartType.name}
          </Typography>
        </Grid>
        <Grid item container justify='flex-end' alignItems="center" xs={8}>
          <Grid item container justify='flex-end' xs={6}>
            <NavLink to={props.logNavLink}>
              <IconButton
                aria-label="Logs"
              >
                <img className={classes.footerIcon} src={logIcon}/>
              </IconButton>
            </NavLink>
          </Grid>
          <Grid item container justify='flex-end' xs={6}>
            <NavLink to={props.navLink}>
              <IconButton
                aria-label="chartOrHome"
              >
                <img className={classes.footerIcon} src={navLinkIcon}/>
              </IconButton>
            </NavLink>
          </Grid>
        </Grid>


        <Grid
          item
          container
          alignItems="flex-start"
          justify="flex-start"
          xs={12}
        >
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

        { props.isFullScreen ?
            <>
              <Grid item container justify="flex-start" xs={12}>
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

              <Grid item container justify="flex-start" xs={12}>
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
            {
              data.map( (chart: any, index: number) => {
                console.log('creating canvas ref', index);
                <canvas
                  id={props.chartType.name + index}
                />;
              })
            }
          </div>
        </Grid>
      </Grid>
      <Grid
        item
        container
        alignItems="center"
        justify='flex-start'
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
          justify="center"
          xs={3}>

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
              background: '#001C32',
              backgroundColor: '#001C32',
            }}
          >
            <Typography variant="body2">
            1H
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
              background: '#001C32',
              backgroundColor: '#001C32',
            }}
          >
            <Typography variant="body2">
            6H
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
              background: '#001C32',
              backgroundColor: '#001C32',
            }}
          >
            <Typography variant="body2">
            12H
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
              background: '#001C32',
              backgroundColor: '#001C32',
            }}
          >
            <Typography variant="body2">
            1D
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
              background: '#001C32',
              backgroundColor: '#001C32',
            }}
          >
            <Typography variant="body2">
            7D
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
              background: '#001C32',
              backgroundColor: '#001C32',
            }}
          >
            <Typography variant="body2">
            1M
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
              background: '#001C32',
              backgroundColor: '#001C32',
            }}
          >
            <Typography variant="body2">
            3M
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
              background: '#001C32',
              backgroundColor: '#001C32',
            }}
          >
            <Typography variant="body2">
            6M
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
              background: '#001C32',
              backgroundColor: '#001C32',
              borderRadius: '20px',
            }}
          >
            <Typography variant="body2">
            1Y
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

