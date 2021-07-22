import React, {useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';

import {NetworkStatus as Status} from 'minima';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {Status as StatusVars} from '../config/vars';

import {theme, themeStyles} from '../styles';

import StatusBad from '../images/statusBad.svg';
import StatusGood from '../images/statusGood.svg';

import {
  ApplicationState,
  StatusProps,
} from '../store';

interface StateProps {
  statusData: StatusProps
}

type Props = StateProps

type Callback = () => void;

/**
 * Custom hook to check for status
 * @function checkStatus
 * @param {function} callback
 * @param {number} delay
*/
function useInterval(callback: Callback, delay: number) {
  const savedCallback = useRef<Callback>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    /**
     * Runs the callback passed
     * @function tick
    */
    function tick() {
      savedCallback.current ? savedCallback.current() : null;
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, []);
}

const display = (props: Props) => {
  const [statusUpdateTime, setStatusUpdateTime] = useState(0);
  const [data, setData] = useState([] as Status[]);
  const classes = themeStyles();

  const hoursPerYear = 8760;
  const hoursPerMonth = 730; // approx
  const hoursPerWeek = 168;
  const hoursPerDay = 24;

  const years = 'Years';
  const months = 'Months';
  const weeks = 'Weeks';
  const days = 'Days';
  const hours = 'Hours';
  const minutes = 'Minutes';

  const updateInterval = 30000;

  /**
   * Checks foir the last time status was updated
   * @function checkStatus
   * @param {number} lastUpdate
  */
  function checkStatus(lastUpdate: number) {
    const timeNow = Date.now();
    // console.log('checking with', lastUpdate, timeNow);
    if ( (timeNow - lastUpdate) >= updateInterval ) {
      // eek! is Minima down?
      // eslint-disable-next-line max-len
      // console.log('Going down with', timeNow, lastUpdate, timeNow - lastUpdate);
      setData([]);
      setStatusUpdateTime(0);
    };
  }

  useInterval(() => {
    checkStatus(statusUpdateTime);
  }, updateInterval);

  useEffect(() => {
    if ( props.statusData?.data.length ) {
      setStatusUpdateTime(Date.now());
      setData(props.statusData.data);
    } else {
      setData([]);
      setStatusUpdateTime(0);
    }
  }, [props.statusData]);

  return (
    <>
      <Grid
        item
        container
        alignItems="flex-end"
        style={{
          padding: theme.spacing(3),
        }}
        xs={12}
      >
        <Grid
          item
          xs={2}
        >
          <Typography variant="h3">
            {StatusVars.heading}
          </Typography>
        </Grid>

        <Grid
          item
          xs={10}
        >
          { statusUpdateTime === 0 ?
            <StatusBad className={classes.statusIcon}/> :
            <StatusGood className={classes.statusIcon}/>
          }
        </Grid>

        <Grid item container className={classes.pageSummary} xs={12}>
          {
            data.length ?
              props.statusData?.data.map( ( status: Status, index: number ) => {
                // 0 Years 0 Months 0 Weeks 0 Days 3 Hours 47 Minutes
                // console.log('in here', status);

                const upToYears = status.uptime.indexOf(years);
                const upToMonths = status.uptime.indexOf(months);
                const upToWeeks = status.uptime.indexOf(weeks);
                const upToDays = status.uptime.indexOf(days);
                const upToHours = status.uptime.indexOf(hours);
                const upToMinutes = status.uptime.indexOf(minutes);

                const thisYears = status.uptime.slice(0, upToYears).trim();
                const thisMonths = status.uptime.slice(
                    upToYears + years.length, upToMonths)
                    .trim();
                const thisWeeks = status.uptime.slice(
                    upToMonths + months.length, upToWeeks)
                    .trim();
                const thisDays = status.uptime.slice(
                    upToWeeks + weeks.length, upToDays)
                    .trim();
                const thisHours = status.uptime.slice(
                    upToDays + days.length, upToHours)
                    .trim();
                const thisMinutes = status.uptime.slice(
                    upToHours + hours.length, upToMinutes)
                    .trim();

                const totalHours = ( +thisYears * hoursPerYear ) +
                  ( +thisMonths * hoursPerMonth ) +
                  ( +thisWeeks * hoursPerWeek ) +
                  ( +thisDays * hoursPerDay ) +
                  ( +thisHours );

                const upTime =
                '' + totalHours +
                ' ' + hours +
                ' ' + thisMinutes +
                ' ' + minutes;
                const ram = status.ram;
                const lastBlock = status.lastblock;

                return (
                  <React.Fragment key={index}>

                    <Grid
                      item
                      container
                      xs={12}
                    >
                      <Grid item container justifyContent="flex-start" xs={12}>
                        <Typography
                          variant="h6"
                          noWrap={true}
                        >
                          {StatusVars.upTime}
                        </Typography>
                      </Grid>

                      <Grid
                        item
                        container
                        justifyContent="flex-start"
                        style={{
                          marginBottom: theme.spacing(3),
                        }}
                        xs={12}
                      >
                        <Typography
                          variant="body1"
                          noWrap={true}
                        >
                          {upTime}
                        </Typography>
                      </Grid>
                      <Grid item container justifyContent="flex-start" xs={12}>
                        <Typography
                          variant="h6"
                          noWrap={true}
                        >
                          {StatusVars.ram}
                        </Typography>
                      </Grid>

                      <Grid
                        item
                        container
                        justifyContent="flex-start"
                        style={{
                          marginBottom: theme.spacing(3),
                        }}
                        xs={12}
                      >

                        <Typography
                          variant="body1"
                          noWrap={true}
                        >
                          {ram}
                        </Typography>
                      </Grid>
                      <Grid item container justifyContent="flex-start" xs={12}>
                        <Typography
                          variant="h6"
                          noWrap={true}
                        >
                          {StatusVars.block}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        container
                        justifyContent="flex-start"
                        style={{
                          marginBottom: theme.spacing(2),
                        }}
                        xs={12}
                      >
                        <Typography
                          variant="body1"
                          noWrap={true}
                        >
                          {lastBlock}
                        </Typography>
                      </Grid>
                    </Grid>

                  </React.Fragment>
                );
              }) :
              <>
                <Grid
                  item
                  container
                  xs={12}
                >
                  <Grid item container justifyContent="flex-start" xs={12}>
                    <Typography
                      variant="h6"
                      noWrap={true}
                    >
                      {StatusVars.upTime}
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    container
                    justifyContent="flex-start"
                    style={{
                      marginBottom: theme.spacing(3),
                    }}
                    xs={12}
                  >
                    <Typography
                      variant="body1"
                      noWrap={true}
                    >
                      0
                    </Typography>
                  </Grid>
                  <Grid item container justifyContent="flex-start" xs={12}>
                    <Typography
                      variant="h6"
                      noWrap={true}
                    >
                      {StatusVars.ram}
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    container
                    justifyContent="flex-start"
                    style={{
                      marginBottom: theme.spacing(3),
                    }}
                    xs={12}
                  >

                    <Typography
                      variant="body1"
                      noWrap={true}
                    >
                      n/a
                    </Typography>
                  </Grid>
                  <Grid item container justifyContent="flex-start" xs={12}>
                    <Typography
                      variant="h6"
                      noWrap={true}
                    >
                      {StatusVars.block}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    container
                    justifyContent="flex-start"
                    style={{
                      marginBottom: theme.spacing(2),
                    }}
                    xs={12}
                  >
                    <Typography
                      variant="body1"
                      noWrap={true}
                    >
                      n/a
                    </Typography>
                  </Grid>
                </Grid>
              </>
          }
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = (state: ApplicationState): StateProps => {
  const status = state.statusData as StatusProps;
  return {
    statusData: status,
  };
};

export const ListStatus =
connect<StateProps, {}, {}, ApplicationState>(
    mapStateToProps,
)(display);
