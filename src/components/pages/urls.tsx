import React, {useState} from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// import {theme, themeStyles} from '../../styles';
import {theme} from '../../styles';

import {Addresses} from './addresses';
import {Tokens} from './tokens';

import {
  URL,
} from '../../config';

export const URLs = () => {
  const [isAddress, setIsAddress] = useState(true);
  const [addressColour, setAddressColour] = useState(URL.liveColour);
  const [tokenColour, setTokenColour] = useState(URL.notLiveColour);
  const [addressTextColour, setAddressTextColour] =
    useState(URL.liveTextColour);
  const [tokenTextColour, setTokenTextColour] = useState(URL.notLiveTextColour);

  const setPage = (isAddress: boolean) => {
    if ( isAddress ) {
      setIsAddress(true);
      setAddressColour(URL.liveColour);
      setAddressTextColour(URL.liveTextColour);
      setTokenColour(URL.notLiveColour);
      setTokenTextColour(URL.notLiveTextColour);
    } else {
      setIsAddress(false);
      setAddressColour(URL.notLiveColour);
      setAddressTextColour(URL.notLiveTextColour);
      setTokenColour(URL.liveColour);
      setTokenTextColour(URL.liveTextColour);
    }
  };

  // const classes = themeStyles();
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

        <Grid
          item
          container
          style={{
            paddingRight: theme.spacing(1),
          }}
          xs={6}>
          <Button
            onClick={() => setPage(true)}
            size='medium'
            variant="contained"
            style={{
              padding: theme.spacing(2),
              textTransform: 'none',
              color: addressTextColour,
              background: 'white',
              backgroundColor: addressColour,
              width: '100%',
              borderRadius: '10px',
              justifyContent: 'center',
            }}
          >
            {URL.addressButton}
          </Button>
        </Grid>

        <Grid
          item
          container
          style={{
            paddingLeft: theme.spacing(1),
          }}
          xs={6}>
          <Button
            onClick={() => setPage(false)}
            size='medium'
            variant="contained"
            style={{
              padding: theme.spacing(2),
              textTransform: 'none',
              color: tokenTextColour,
              background: 'white',
              backgroundColor: tokenColour,
              width: '100%',
              borderRadius: '10px',
              justifyContent: 'center',
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
