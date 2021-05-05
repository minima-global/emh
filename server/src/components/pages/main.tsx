import React from 'react';
import {connect} from 'react-redux';

import GoogleFontLoader from 'react-google-font-loader';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import minimaIcon from '../../images/minimaIcon.svg';

import {Content} from '../content';

import {App} from '../../config/strings';

import {
  ApplicationState,
  AppDispatch,
  AppData,
  PageTypes,
} from '../../store';

import {setActivePage} from '../../store/app/appData/actions';
import {initTx} from '../../store/app/server/actions';

import {themeStyles} from '../../styles';

import {Home} from '../../config';

interface StateProps {
  appData: AppData
}

interface DispatchProps {
  initTx: () => void
  setActivePage: (page: PageTypes) => void
}

type Props = StateProps & DispatchProps

const display = (props: Props) => {
  const classes = themeStyles();

  return (

    <>

      <Grid className={classes.root}>

        <GoogleFontLoader
          fonts={[
            {
              font: 'Manrope',
              weights: [300, 400, 500, 600, 700],
            },
            {
              font: 'Roboto',
              weights: [300, 400, 500, 600, 700],
            },
          ]}
        />
        <Grid item container className={classes.header} xs={12}>

          <Grid
            item
            container
            alignItems="center"
            justify="flex-start"
            xs={4}
          >

            <Typography variant="caption">
              {App.catchLine}<br />
              {App.copyright}
            </Typography>

          </Grid>

          <Grid
            item
            container
            alignItems="center"
            justify="center"
            xs={4}
          >

            <Typography variant="h1">
              {Home.heading}
            </Typography>

          </Grid>

          <Grid
            item
            container
            alignItems="center"
            justify="flex-end"
            xs={4}
          >

            <Typography variant="caption">
              &nbsp;
            </Typography>

          </Grid>

        </Grid>

        <Grid item container xs={12}>
          <Content/>
        </Grid>

        <Grid item container className={classes.footer} xs={12}>

          <Grid
            item
            container
            alignItems="center"
            justify="flex-start"
            xs={6}
          >

            <Typography variant="caption">
              &nbsp;
            </Typography>

          </Grid>

          <Grid
            item
            container
            alignItems="center"
            justify="flex-end"
            xs={6}
          >

            <img className={classes.appIcon} src={minimaIcon} />

          </Grid>

        </Grid>

      </Grid>

    </>
  );
};

const mapStateToProps = (state: ApplicationState): StateProps => {
  return {
    appData: state.appData.data,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => {
  return {
    initTx: () => dispatch(initTx()),
    setActivePage: (page: PageTypes) => dispatch(setActivePage(page)),
  };
};

export const Main = connect<StateProps, DispatchProps, {}, ApplicationState>(
    mapStateToProps,
    mapDispatchToProps,
)(display);
