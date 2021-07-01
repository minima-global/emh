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
import zoomInIcon from '../images/zoomIn.svg';
import zoomOutIcon from '../images/zoomOut.svg';

import Chart from 'chart.js/auto';

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
  Chart as ChartVars,
  colours,
  Search,
} from '../config';

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
  // eslint-disable-next-line no-unused-vars
  const [searchQuery, setSearchQuery] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [totalRecords, setTotalRecords] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [chartHeight, setChartHeight] = useState(0);
  const dataCtx = useRef<HTMLCanvasElement>(null);

  let navLinkIcon = expandIcon;
  let viewport = '280px';
  if ( props.isFullScreen ) {
    navLinkIcon = closeIcon;
    viewport = '550px';
  }

  const classes = themeStyles();

  useEffect(() => {
    let chart: any;
    if ( isFirstRun.current ) {
      isFirstRun.current = false;

      const timeNow = Date.now().toString();
      let countQuery = props.chartType.countQuery.replace(/<firstTime>/g, '0');
      countQuery = countQuery.replace(/<secondTime>/g, timeNow);
      let query = props.chartType.query.replace(/<firstTime>/g, '0');
      query = query.replace(/<secondTime>/g, timeNow);

      setSearchQuery(query);

      props.countTableEntries(countQuery, props.chartType.key);
      props.getChartEntries(
          query,
          props.chartType.key,
          props.chartType.countColumn,
          props.chartType.dataColumn);
    } else {
      const key = props.chartType.key;
      // console.log('count', props.countData.data);
      // console.log('data', props.chartData);
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
        setChartHeight(
            ChartVars.axisOffset + keys.length * ChartVars.gridHeight);
        const ctx: HTMLCanvasElement | null = dataCtx.current;
        if ( ctx ) {
          chart = new Chart(ctx, {
            type: props.chartType.type,
            data: {
              labels: keys.map((key: string) => key),
              datasets: [{
                data: values.map((value: number) => value),
                backgroundColor: colours,
              }],
            },
            options: props.chartType.options,
          });
        }
      }
    }
    return () => {
      chart ? chart.destroy() : null;
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
      // query = props.chartType.searchQuery.replace(/<[^>]*>/g, searchTerm);
      query = props.chartType.searchQuery.replace(/<searchTerm>/g, searchTerm);
      query = query.replace(/<firstTime>/g, '0');

      countQuery =
        props.chartType.searchCountQuery.replace(/<searchTerm>/g, searchTerm);
      countQuery = countQuery.replace(/<firstTime>/g, '0');
    }

    query = query.replace(/<secondTime>/g, timeNow);
    countQuery = countQuery.replace(/<secondTime>/g, timeNow);

    setSearchQuery(query);
    props.countTableEntries(countQuery, props.chartType.key);
    props.getChartEntries(
        query,
        props.chartType.key,
        props.chartType.countColumn,
        props.chartType.dataColumn);
  };

  const doQuery = (span: string) => {
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
    countQuery = countQuery.replace(/<secondTime>/g, timeNow.toString());
    props.countTableEntries(countQuery, props.chartType.key);
    let query =
      props.chartType.query.replace(/<firstTime>/g, timeFrom.toString());
    query = query.replace(/<secondTime>/g, timeNow.toString());

    /*
    console.log('time count', countQuery);
    console.log('time', query);
    */

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
        <Grid
          item
          container
          alignItems="flex-start"
          justify="flex-start"
          xs={4}
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
        <Grid item container justify='flex-end' alignItems="center" xs={4}>
          <Grid item container justify='flex-end' xs={3}>
            <IconButton
              aria-label="Zoom In"
            >
              <img className={classes.footerIcon} src={zoomInIcon}/>
            </IconButton>
          </Grid>
          <Grid item container justify='flex-end' xs={3}>
            <IconButton
              aria-label="Zoom Out"
            >
              <img className={classes.footerIcon} src={zoomOutIcon}/>
            </IconButton>
          </Grid>
          <Grid item container justify='flex-end' xs={3}>
            <NavLink to={props.logNavLink}>
              <IconButton
                aria-label="Logs"
              >
                <img className={classes.footerIcon} src={logIcon}/>
              </IconButton>
            </NavLink>
          </Grid>
          <Grid item container justify='flex-end' xs={3}>
            <NavLink to={props.navLink}>
              <IconButton
                aria-label="chartOrHome"
              >
                <img className={classes.footerIcon} src={navLinkIcon}/>
              </IconButton>
            </NavLink>
          </Grid>
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
                  {ChartVars.totals} {props.chartType.name} = {totalRecords}
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
            overflow: 'auto',
          }}
          xs={12}
        >
          <div
            style={{
              height: chartHeight,
              width: '100%',
              paddingRight: theme.spacing(1),
            }}
          >
            <canvas
              id={props.chartType.name}
              ref={dataCtx}
            />
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
            onClick={() => doQuery(Misc.time.anHour.timeString)}
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
            onClick={() => doQuery(Misc.time.sixHours.timeString)}
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
            onClick={() => doQuery(Misc.time.twelveHours.timeString)}
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
            onClick={() => doQuery(Misc.time.aDay.timeString)}
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
            onClick={() => doQuery(Misc.time.aWeek.timeString)}
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
            onClick={() => doQuery(Misc.time.aMonth.timeString)}
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
            onClick={() => doQuery(Misc.time.threeMonths.timeString)}
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
            onClick={() => doQuery(Misc.time.sixMonths.timeString)}
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
            onClick={() => doQuery(Misc.time.aYear.timeString)}
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

