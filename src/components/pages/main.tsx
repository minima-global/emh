import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';

import GoogleFontLoader from 'react-google-font-loader';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import megIcon from '../../images/megLogoLockupWhite.svg';
import minimaIcon from '../../images/minimaIcon.svg';
import homeIcon from '../../images/megNavDashboardGrey.svg';
import terminal from '../../images/megNavRunApiGrey.svg';
import trigger from '../../images/megNavApiGrey.svg';
import url from '../../images/megNavMinimaGrey.svg';
import info from '../../images/megNavLogGrey.svg';

import {Content} from '../content';

import {App} from '../../config/vars';

import {theme, themeStyles} from '../../styles';

import {Local, Paths} from '../../config/paths';
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

            <Grid
              item
              container
              className={classes.header}
              xs={12}
            >
              <Grid
                item
                container
                style={{
                  paddingLeft: theme.spacing(8),
                  paddingRight: theme.spacing(8),
                }}
                xs={12}
              >
                <Grid
                  item
                  container
                  alignItems="center"
                  justify="flex-start"
                  xs={6}
                >
                  <img className={classes.megIcon} src={megIcon} />
                  <Typography variant="body2">
                    &nbsp;&nbsp; {App.appName}
                  </Typography>
                </Grid>

                <Grid
                  item
                  container
                  alignItems="center"
                  justify="flex-end"
                  xs={6}
                >
                  <Typography variant="body2">
                    {App.catchLine} &nbsp;&nbsp;
                  </Typography>
                  <img className={classes.minimaIcon} src={minimaIcon} />
                </Grid>
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
                  justify="flex-end"
                  xs={1}
                >
                  <Typography variant="body2">
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
                  <Grid
                    item
                    container
                    alignItems="center"
                    justify="center"
                    xs={12}
                  >
                    <NavLink to={Local.home} className={classes.iconLink}>
                      <IconButton
                        aria-label="Home"
                      >
                        <img className={classes.footerIcon} src={homeIcon}/>
                      </IconButton>
                    </NavLink>
                  </Grid>
                  <Grid
                    item
                    container
                    alignItems="center"
                    justify="center"
                    xs={12}
                  >
                    <Typography variant="body2">
                      {Paths.home}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid
                  item
                  container
                  alignItems="center"
                  justify="center"
                  xs={2}
                >
                  <Grid
                    item
                    container
                    alignItems="center"
                    justify="center"
                    xs={12}
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
                    xs={12}
                  >
                    <Typography variant="body2">
                      {Paths.logs}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid
                  item
                  container
                  alignItems="center"
                  justify="center"
                  xs={2}
                >
                  <Grid
                    item
                    container
                    alignItems="center"
                    justify="center"
                    xs={12}
                  >
                    <NavLink to={Local.urls} className={classes.iconLink}>
                      <IconButton
                        aria-label="Address"
                      >
                        <img className={classes.footerIcon} src={url}/>
                      </IconButton>
                    </NavLink>
                  </Grid>
                  <Grid
                    item
                    container
                    alignItems="center"
                    justify="center"
                    xs={12}
                  >
                    <Typography variant="body2">
                      {Paths.urls}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid
                  item
                  container
                  alignItems="center"
                  justify="center"
                  xs={2}
                >
                  <Grid
                    item
                    container
                    alignItems="center"
                    justify="center"
                    xs={12}
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
                    xs={12}
                  >
                    <Typography variant="body2">
                      {Paths.triggers}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid
                  item
                  container
                  alignItems="center"
                  justify="center"
                  xs={2}
                >
                  <Grid
                    item
                    container
                    alignItems="center"
                    justify="center"
                    xs={12}
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
                    xs={12}
                  >
                    <Typography variant="body2">
                      {Paths.cmd}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid
                  item
                  container
                  alignItems="center"
                  justify="flex-end"
                  xs={1}
                >
                  <Typography variant="body2">
                    &nbsp;
                  </Typography>
                </Grid>

              </Grid>

            </Grid>

          </Grid>
        )
      }
    </>
  );
};
