import React from 'react';
import {NavLink} from 'react-router-dom';

import GoogleFontLoader from 'react-google-font-loader';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import minimaIcon from '../../images/minimaIcon.svg';

import {Content} from '../content';
import {AppInitandClose} from '../appInitandClose';

import {App, Local} from '../../config';

import {themeStyles} from '../../styles';

// import minimaIcon from '../../images/minimaIcon.svg';
import balanceIcon from '../../images/balance.png';
import sendIcon from '../../images/send.png';
import tokenIcon from '../../images/token.png';

export const Main = () => {
  const classes = themeStyles();

  return (

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

          <img className={classes.headerIcon} src={minimaIcon} />

        </Grid>

        <Grid
          item
          container
          alignItems="center"
          justify="center"
          xs={4}
        >

          <Typography variant="h1">
            {App.appName}
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
                  &nbsp;
          </Typography>

        </Grid>

      </Grid>

      <Grid className={classes.content} item container xs={12}>
        <Content/>
      </Grid>

      <Grid className={classes.footer} item container xs={12}>

        <Grid item container xs={12}>

          <Grid
            item
            container
            alignItems="center"
            justify="center"
            xs={2}
          >

            <NavLink to={Local.home} className={classes.iconLink}>
              <IconButton
                aria-label="Home"
              >
                <img className={classes.footerIcon} src={balanceIcon}/>
              </IconButton>
            </NavLink>

          </Grid>

          <Grid
            item
            container
            alignItems="center"
            justify="center"
            xs={2}
          >

            <NavLink to={Local.send} className={classes.iconLink}>
              <IconButton
                aria-label="send"
              >
                <img className={classes.footerIcon} src={sendIcon}/>
              </IconButton>
            </NavLink>

          </Grid>

          <Grid
            item
            container
            alignItems="center"
            justify="center"
            xs={2}
          >

            <NavLink to={Local.token} className={classes.iconLink}>
              <IconButton
                aria-label="Tokens"
              >
                <img className={classes.footerIcon} src={tokenIcon}/>
              </IconButton>
            </NavLink>

          </Grid>

          <Grid
            item
            container
            alignItems="center"
            justify="center"
            xs={6}
          >

            <Typography variant="caption">
              &nbsp;
            </Typography>
          </Grid>

        </Grid>

        <Grid
          item
          container
          alignItems="center"
          justify="center"
          xs={12}
        >
          <Typography variant="caption">
            {App.catchLine} {App.copyright}
          </Typography>

        </Grid>

        <AppInitandClose/>

      </Grid>

    </Grid>
  );
};
