import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';

import GoogleFontLoader from 'react-google-font-loader';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import minimaIcon from '../../images/minimaIcon.svg';
import terminal from '../../images/terminal.png';
import token from '../../images/token.png';
import trigger from '../../images/trigger.png';
import address from '../../images/address.png';
import info from '../../images/info.png';

import {Content} from '../content';

import {App} from '../../config/vars';

import {themeStyles} from '../../styles';

import {Home, Local} from '../../config';
import {AppInit} from '../appInit';

export const Main = () => {
  const [isLoading, setIsLoading] = useState(true);
  const classes = themeStyles();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (

    <>

      { isLoading?

        <AppInit/> :

        (
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
                  {Home.heading}
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

                  <NavLink to={Local.logs} className={classes.iconLink}>
                    <IconButton
                      aria-label="Logs"
                    >
                      <img className={classes.footerIcon} src={info}/>
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

                  <NavLink to={Local.addresses} className={classes.iconLink}>
                    <IconButton
                      aria-label="Address"
                    >
                      <img className={classes.footerIcon} src={address}/>
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

                  <NavLink to={Local.tokens} className={classes.iconLink}>
                    <IconButton
                      aria-label="Tokens"
                    >
                      <img className={classes.footerIcon} src={token}/>
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

                  <NavLink to={Local.triggers} className={classes.iconLink}>
                    <IconButton
                      aria-label="Triggers"
                    >
                      <img className={classes.footerIcon} src={trigger}/>
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

                  <NavLink to={Local.cmd} className={classes.iconLink}>
                    <IconButton
                      aria-label="Cmd"
                    >
                      <img className={classes.footerIcon} src={terminal}/>
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

            </Grid>

          </Grid>
        )
      }
    </>
  );
};
