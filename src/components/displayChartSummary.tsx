import React, {useState, useEffect, useRef, ChangeEvent} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';

import logIcon from '../images/log.svg';
import expandIcon from '../images/expand.svg';
import closeIcon from '../images/closeDelete.svg';
import zoomInIcon from '../images/zoomIn.svg';
import zoomOutIcon from '../images/zoomOut.svg';

import {themeStyles} from '../styles';

import {
  ApplicationState,
  AppDispatch,
  ChartProps,
  ChartType,
  CountProps,
} from '../store/types';

import {countTableEntries, getChartEntries} from '../store/app/dbase/actions';

import {
  Chart,
  Search,
} from '../config';

interface SummaryProps {
  chartType: ChartType
  isFullScreen: boolean
  navLink: string
  logNavLink: string
}

interface StateProps {
  countData: CountProps,
  chartsData: ChartProps
}

interface DispatchProps {
  countTableEntries: (
    query: string
  ) => void
  getChartEntries: (
    query: string,
    chartName: string,
    filterRegex: string
  ) => void
}

type Props = SummaryProps & StateProps & DispatchProps

const summary = (props: Props) => {
  const isFirstRun = useRef(true);
  const [searchTerm, setSearchTerm] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCountQuery, setSearchCountQuery] = useState('');
  const [totalRecords, setTotalRecords] = useState(0);

  const classes = themeStyles();

  useEffect(() => {
    if ( isFirstRun.current ) {
      isFirstRun.current = false;
      props.countTableEntries(props.chartType.countQuery);
      props.getChartEntries(
          props.chartType.query, props.chartType.name, props.chartType.regex);
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
      } else if (props.countData.data[props.chartType.countQuery]) {
        // eslint-disable-next-line max-len
        // console.log('got count data: ', props.countData.data[props.chartType.countQuery]);
        const thisCount = props.countData.data[props.chartType.countQuery];
        if ( thisCount != totalRecords ) {
          setTotalRecords(props.countData.data[props.chartType.countQuery]);
        }
      }
    }
  }, [props.countData]);

  const navLinkIcon = props.isFullScreen ? closeIcon : expandIcon;

  const doSetSearchTerm =
      (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearchTerm(e.target.value);
      };

  const doSearch = () => {
    let countQuery = props.chartType.countQuery;
    let query = props.chartType.query;

    if ( searchTerm ) {
      query = props.chartType.searchQuery.replace(/<[^>]*>/g, searchTerm);
      countQuery =
        props.chartType.searchCountQuery.replace(/<[^>]*>/g, searchTerm);

      /*
      console.log('count query:', countQuery, props.chartType.searchCountQuery);
      console.log('query: ', query, props.chartType.searchQuery);
      */

      setSearchCountQuery(countQuery);
      setSearchQuery(query);
    } else {
      setSearchCountQuery('');
      setSearchQuery('');
    }

    /* console.log('count query: ', countQuery);
    console.log('query: ', query);*/

    props.countTableEntries(countQuery);
    props.getChartEntries(
        query, props.chartType.name, props.chartType.regex);
  };

  return (
    <Grid
      container
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
        alignItems="center"
        justify="flex-start"
        xs={4}
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
                <line x2="4000" stroke="#001C32" width="100%" height="100%"/>
              </svg>
            </Grid>

            <Grid
              item
              container
              alignItems="flex-start"
              xs={12}
            >
              <Typography variant="h3">
                {Chart.totals} {props.chartType.name} = {totalRecords}
              </Typography>
            </Grid>

            <Grid item container justify="flex-start" xs={12}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 4000 20"
              >
                <line x2="4000" stroke="#001C32" width="100%" height="100%"/>
              </svg>
            </Grid>
          </> :
          null
      }
    </Grid>
  );
};

/*
{Chart.totals} {props.chartType.name} = {
  Object.values(props.chartData)
      .reduce( function(acc: number, chartData: number) {
        return acc + chartData;
      }, 0)
}
*/

const mapStateToProps = (state: ApplicationState): StateProps => {
  return {
    countData: state.countData as CountProps,
    chartsData: state.chartsData as ChartProps,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => {
  return {
    countTableEntries: (
        query: string,
    ) => dispatch(countTableEntries(
        query,
    )),
    getChartEntries: (
        query: string,
        chartName: string,
        filterRegex: string,
    ) =>
      dispatch(getChartEntries(query, chartName, filterRegex)),
  };
};

const DisplayChartSummary =
  connect<StateProps, DispatchProps, {}, ApplicationState>(
      mapStateToProps,
      mapDispatchToProps,
  )(summary);

export {DisplayChartSummary};
