import React, {useState, ChangeEvent} from 'react';
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
  ChartData,
  ChartValues,
  SuccessAndFailType,
} from '../store/types';

import {getTableEntries} from '../store/app/dbase/actions';

import {
  Chart,
  Search,
} from '../config';

interface SummaryProps {
  heading: string
  chartData: ChartData
  isFullScreen: boolean
  navLink: string
  logNavLink: string
}

interface DispatchProps {
  getTableEntries: (
    query: string,
    actionType: SuccessAndFailType,
  ) => void
}

type Props = SummaryProps & DispatchProps

const summary = (props: Props) => {
  const [searchTerm, setSearchTerm] = useState('');

  const classes = themeStyles();

  const navLinkIcon = props.isFullScreen ? closeIcon : expandIcon;

  const doSetSearchTerm =
      (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearchTerm(e.target.value);
      };

  const doSearch = () => {
    console.log('seartch term: ', searchTerm);
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
          {props.heading}
        </Typography>
      </Grid>
      <Grid
        item
        container
        alignItems="flex-start"
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
      <Grid item container justify='flex-end' xs={4}>
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
                {Chart.totals} {props.heading} = {
                  Object.values(props.chartData)
                      .reduce( function(acc: number, chartData: ChartValues) {
                        return acc + chartData.count;
                      }, 0)
                }
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

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => {
  return {
    getTableEntries: (
        query: string,
        actionType: SuccessAndFailType,
    ) =>
      dispatch(getTableEntries(query, actionType),
      ),
  };
};

const DisplayChartSummary = connect<{}, DispatchProps, {}, ApplicationState>(
    null,
    mapDispatchToProps,
)(summary);

export {DisplayChartSummary};
