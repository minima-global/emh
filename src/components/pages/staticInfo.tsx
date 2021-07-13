import React, {useEffect, useState, useRef} from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {
  InfoProps,
  PageTypes,
} from '../../store/types';

import {theme, themeStyles} from '../../styles';

import {About, Help, Contact} from '../../config/vars';

interface StaticInfoProps {
  page: PageTypes
}

type Props = StaticInfoProps

export const Info = (props: Props) => {
  const [pageData, setPageData] = useState<InfoProps>({title: About.heading,
    data: About.info});
  const isFirstRun = useRef(true);
  const classes = themeStyles();

  useEffect(() => {
    if ( isFirstRun.current ) {
      isFirstRun.current = false;

      switch (props.page) {
        case PageTypes.ABOUT:

          setPageData({title: About.heading, data: About.info});
          break;

        case PageTypes.HELP:

          setPageData({title: Help.heading, data: Help.info});
          break;

        case PageTypes.CONTACT:

          setPageData({title: Contact.heading, data: Contact.info});
          break;

        default:

          setPageData({title: About.heading, data: About.info});
          break;
      }
    }
  }, [props.page]);

  return (
    <Grid
      container
      alignItems="flex-start"
      style={{
        marginLeft: theme.spacing(8),
        marginRight: theme.spacing(8),
      }}>

      <Grid item container xs={12}>

        <Grid item container justifyContent="flex-start" xs={12}>
          <Typography variant="h2">
            {pageData.title}
          </Typography>
        </Grid>

        <Grid item container justifyContent="flex-start" xs={12}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 4000 20"
          >
            <line x2="4000" stroke="#001C32" width="100%" height="100%"/>
          </svg>
        </Grid>

        <Grid item container className={classes.formSummary} xs={12}>
          { pageData.data.map( (data: string, i: number ) => {
            return (

              <React.Fragment key={i}>

                <Grid item container xs={12}>
                  <Typography variant="body1">
                    {data}
                  </Typography>
                </Grid>
              </React.Fragment>
            );
          })}
        </Grid>

      </Grid>

    </Grid>
  );
};
