import React, {useState} from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import {theme, themeStyles} from '../../styles';

import {Addresses} from './addresses';
import {Tokens} from './tokens';

import {
  URL,
} from '../../config';

export const URLs = () => {
  const [isAddress, setIsAddress] = useState(true);
  const [addressColour, setAddressColour] = useState(URL.liveColour);
  const [tokenColour, setTokenColour] = useState(URL.notLiveColour);

  const setPage = (isAddress: boolean) => {
    if ( isAddress ) {
      setIsAddress(true);
      setAddressColour(URL.liveColour);
      setTokenColour(URL.notLiveColour);
    } else {
      setIsAddress(false);
      setAddressColour(URL.notLiveColour);
      setTokenColour(URL.liveColour);
    }
  };

  const classes = themeStyles();
  return (

    <Grid
      container
      alignItems='flex-start'
      style={{
        marginLeft: theme.spacing(8),
        marginRight: theme.spacing(8),
      }}>

      <Grid item container xs={12}>

        <Grid item container justify="flex-start" xs={12}>

          <Typography variant="h2">
            {URL.heading}
          </Typography>

        </Grid>

        <Grid item container className={classes.formLabel} xs={6}>
          <Button
            onClick={() => setPage(true)}
            color="primary"
            size='medium'
            variant="contained"
            disableElevation={true}
            style={{
              textTransform: 'none',
              backgroundColor: addressColour,
              width: '100%',
              borderRadius: 0,
              justifyContent: 'flex-start',
            }}
          >
            {URL.addressButton}
          </Button>
        </Grid>

        <Grid item container className={classes.formLabel} xs={6}>
          <Button
            onClick={() => setPage(false)}
            color="primary"
            size='medium'
            variant="contained"
            disableElevation={true}
            style={{
              textTransform: 'none',
              backgroundColor: tokenColour,
              width: '100%',
              borderRadius: 0,
              justifyContent: 'flex-end',
            }}
          >
            {URL.tokenButton}
          </Button>
        </Grid>

        <Grid container alignItems='flex-start'>

          { isAddress ?

            <Addresses /> :
            <Tokens />
          }
        </Grid>


      </Grid>

    </Grid>
  );
};
