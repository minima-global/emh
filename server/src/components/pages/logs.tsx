import React from 'react';
import {connect} from 'react-redux';

import {useTheme} from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {themeStyles} from '../../styles';

import {
  ApplicationState,
  AppDispatch,
  PageTypes,
} from '../../store/types';

import {setActivePage} from '../../store/app/appData/actions';
import {initTx} from '../../store/app/server/actions';

import {
  Log as LogConfig,
} from '../../config';

import {ListLogs} from '../listLogs';

interface DispatchProps {
  setActivePage: (page: PageTypes) => void
  initTx: () => void
}

type Props = DispatchProps

const display = (props: Props) => {
  const theme = useTheme();
  const classes = themeStyles();

  return (

    <Grid className={classes.loggedInContent} item container xs={12}>

      <Grid item container xs={12}>

        <Grid item container justify="flex-start" xs={12}>

          <Typography variant="h2">
            {LogConfig.heading}
          </Typography>

        </Grid>

        <Grid item container justify="flex-start" xs={12}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2000"
            height="4"
          >
            <line x2="2000" stroke="#317AFF" strokeWidth={4} />
          </svg>
        </Grid>

        <Grid item container xs={12}
          style={{
            paddingTop: theme.spacing(2),
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2000"
            height="4"
          >
            <line x2="2000" stroke="#317AFF" strokeWidth={4} />
          </svg>
        </Grid>

        { <ListLogs /> }

      </Grid>

    </Grid>
  );
};

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => {
  return {
    setActivePage: (page: PageTypes) => dispatch(setActivePage(page)),
    initTx: () => dispatch(initTx()),
  };
};

export const Logs = connect<{}, DispatchProps, {}, ApplicationState>(
    null,
    mapDispatchToProps,
)(display);
