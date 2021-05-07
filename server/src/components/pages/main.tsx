import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';

import GoogleFontLoader from 'react-google-font-loader';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import minimaIcon from '../../images/minimaIcon.svg';

import {Content} from '../content';

import {App} from '../../config/strings';

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

            <Grid className={classes.footer} item container xs={12}>

              <Grid item container xs={10}>

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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="27"
                        height="27"
                        viewBox="0 0 27 27"
                      >
                        <g
                          className={classes.footerIcon}
                          transform="translate(11.45 5.678)"
                        >
                          <rect
                            width="3.099"
                            height="9.757"
                            transform="translate(0 4.98)"
                          />
                          <rect
                            width="3.099"
                            height="2.842"
                          />
                        </g>
                      </svg>
                    </IconButton>
                  </NavLink>

                </Grid>

                <Grid
                  item
                  container
                  alignItems="center"
                  justify="center"
                  xs={2}>
                  <Typography variant="h1">
                      &nbsp;
                  </Typography>
                </Grid>

                <Grid
                  item
                  container
                  alignItems="center"
                  justify="center"
                  xs={2}>
                  <Typography variant="h1">
                      &nbsp;
                  </Typography>
                </Grid>

                <Grid
                  item
                  container
                  alignItems="center"
                  justify="center"
                  xs={2}>
                  <Typography variant="h1">
                      &nbsp;
                  </Typography>
                </Grid>

                <Grid
                  item
                  container
                  alignItems="center"
                  justify="center"
                  xs={2}>
                  <Typography variant="h1">
                      &nbsp;
                  </Typography>
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
                      <svg
                        className={classes.footerIcon}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          d="M432 32H80a64.07 64.07 0 00-64 64v320a64.07 64.07 0 0064 64h352a64.07 64.07 0 0064-64V96a64.07 64.07 0 00-64-64zM96 256a16 16 0 01-10-28.49L150.39 176 86 124.49a16 16 0 1120-25l80 64a16 16 0 010 25l-80 64A16 16 0 0196 256zm160 0h-64a16 16 0 010-32h64a16 16 0 010 32z"
                        />
                      </svg>
                    </IconButton>
                  </NavLink>

                </Grid>

              </Grid>

              <Grid
                item
                container
                alignItems="center"
                justify="flex-end"
                xs={2}
              >

                <img className={classes.appIcon} src={minimaIcon} />

              </Grid>

            </Grid>

          </Grid>
        )
      }
    </>
  );
};
