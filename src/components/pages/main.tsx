import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';

import GoogleFontLoader from 'react-google-font-loader';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import MegIcon from '../../images/megLogoLockupWhite.svg';
import MinimaIcon from '../../images/minimaIcon.svg';
import HomeIcon from '../../images/megNavDashboardGrey.svg';
import TerminalIcon from '../../images/megNavRunApiGrey.svg';
// import trigger from '../../images/megNavApiGrey.svg';
import TriggerIcon from '../../images/megNavIconsURLtoMinGrey.svg';
import UrlIcon from '../../images/megNavMinimaGrey.svg';
// import info from '../../images/megNavLogGrey.svg';
import InfoIcon from '../../images/megNavLogGrey.svg';

import {Content} from '../content';

import {App} from '../../config/vars';

import {theme, themeStyles} from '../../styles';

import {Local, Paths} from '../../config/paths';
import {AppInit} from '../appInit';

export const Main = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activePage, setActivePage] = useState(Local.home);
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
              container
              className={classes.header}
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
                  <MegIcon className={classes.megIcon} />
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
                  <MinimaIcon className={classes.minimaIcon} />
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
                    <NavLink
                      to={Local.home}
                      className={classes.iconLink}
                      onClick={() => setActivePage(Local.home)}
                    >
                      <IconButton
                        aria-label="Home"
                      >
                        <HomeIcon
                          className=
                            {activePage == Local.home?
                              classes.activeFooterIcon : classes.footerIcon}
                        />
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
                    <Typography
                      variant="body2"
                      style={{
                        color: `${activePage == Local.home?
                          '#317AFF': '#C8C8D4'}`,
                      }}
                    >
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
                    <NavLink
                      to={Local.logs}
                      className={classes.iconLink}
                      onClick={() => setActivePage(Local.logs)}
                    >
                      <IconButton
                        aria-label="Logs"
                      >
                        <InfoIcon
                          className=
                            {activePage == Local.logs?
                              classes.activeFooterIcon : classes.footerIcon}
                        />
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
                    <Typography
                      variant="body2"
                      style={{
                        color: `${activePage == Local.logs?
                          '#317AFF': '#C8C8D4'}`,
                      }}
                    >
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
                    <NavLink
                      to={Local.urls}
                      className={classes.iconLink}
                      onClick={() => setActivePage(Local.urls)}
                    >
                      <IconButton
                        aria-label="Address"
                      >
                        <UrlIcon
                          className=
                            {activePage == Local.urls?
                              classes.activeFooterIcon : classes.footerIcon}
                        />
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
                    <Typography
                      variant="body2"
                      style={{
                        color: `${activePage == Local.urls?
                          '#317AFF': '#C8C8D4'}`,
                      }}
                    >
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
                    <NavLink
                      to={Local.triggers}
                      className={classes.iconLink}
                      onClick={() => setActivePage(Local.triggers)}
                    >
                      <IconButton
                        aria-label="Triggers"
                      >
                        <TriggerIcon
                          className=
                            {activePage == Local.triggers?
                              classes.activeFooterIcon : classes.footerIcon}
                        />
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
                    <Typography
                      variant="body2"
                      style={{
                        color: `${activePage == Local.triggers?
                          '#317AFF': '#C8C8D4'}`,
                      }}
                    >
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
                    <NavLink
                      to={Local.cmd}
                      className={classes.iconLink}
                      onClick={() => setActivePage(Local.cmd)}
                    >
                      <IconButton
                        aria-label="Cmd"
                      >
                        <TerminalIcon
                          className=
                            {activePage == Local.cmd?
                              classes.activeFooterIcon : classes.footerIcon}
                        />
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
                    <Typography
                      variant="body2"
                      style={{
                        color: `${activePage == Local.cmd?
                          '#317AFF': '#C8C8D4'}`,
                      }}
                    >
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
