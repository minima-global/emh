import React, {useState, ChangeEvent} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';

import token from '../images/token.png';

import {theme, themeStyles} from '../styles';

import {
  ApplicationState,
  AppDispatch,
  ChartSummary,
} from '../store/types';

import {getDbaseEntries} from '../store/app/dbase/actions';

import {
  Chart,
  Search,
} from '../config';

interface SummaryProps {
  heading: string
  chartData: ChartSummary
  isFullScreen: boolean
  navLink: string
}

interface DispatchProps {
  getDbaseEntries: (
    dbase: string,
    sortField: string,
    sortOrder: string
  ) => void
}

type Props = SummaryProps & DispatchProps

const summary = (props: Props) => {
  const [searchTerm, setSearchTerm] = useState('');

  const classes = themeStyles();

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
          {props.heading}
        </Typography>
      </Grid>
      <Grid
        item
        container
        alignItems="flex-start"
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
      <Grid
        item
        container
        alignItems="flex-start"
        xs={4}
      >
        <Grid
          item
          container
          alignItems="flex-start"
          xs={1}
        >
          <Typography variant="h3">
              &nbsp;
          </Typography>
        </Grid>
        <Grid
          item
          container
          alignItems="flex-start"
          xs={1}
        >
          <Typography variant="h3">
              &nbsp;
          </Typography>
        </Grid>
        <Grid
          item
          container
          alignItems="flex-start"
          xs={1}
        >
          <Typography variant="h3">
              &nbsp;
          </Typography>
        </Grid>
        <Grid
          item
          container
          alignItems="flex-start"
          xs={1}
        >
          <NavLink to={props.navLink}>
            <IconButton
              aria-label="Tokens"
            >
              <img className={classes.footerIcon} src={token}/>
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
                {Chart.totals} {props.heading} = {props.chartData.total}
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
    getDbaseEntries: (
        dbase: string,
        sortField: string,
        sortOrder: string) =>
      dispatch(getDbaseEntries(
          dbase,
          sortField,
          sortOrder),
      ),
  };
};

const DataSummary = connect<{}, DispatchProps, {}, ApplicationState>(
    null,
    mapDispatchToProps,
)(summary);

export {DataSummary};
