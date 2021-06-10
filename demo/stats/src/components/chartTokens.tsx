import React, {useEffect, useState, useRef} from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';

import Chart from 'chart.js/auto';

import {theme} from '../styles';

import {
  ChartValues,
  ChartData,
} from './types';

import {
  Chart as ChartVars,
  Tokens as TokenVars,
} from '../config';

const getRandomColour = () => {
  const letters = '0123456789ABCDEF'.split('');
  let color = '#';
  for (let i = 0; i < 6; i++ ) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const getRandomColourForEachAddress = (count: number) => {
  const data =[];
  for (let i = 0; i < count; i++) {
    data.push(getRandomColour());
  }
  return data;
};

export const ChartTokens = () => {
  // const classes = themeStyles();
  // eslint-disable-next-line no-unused-vars
  const [tokens, setTokens] = useState({} as ChartData);
  const [chartHeight, setChartHeight] = useState(0);
  const isFirstRun = useRef(true);
  const tokenCtx = useRef<HTMLCanvasElement>(null);

  useEffect( () => {
    let chart: any;
    if ( isFirstRun.current ) {
      isFirstRun.current = false;
      getTokenInfo();
      setInterval(() => {
        getTokenInfo();
      }, 30000);
    } else {
      setChartHeight(Object.keys(tokens).length * ChartVars.gridHeight);
      const ctx = tokenCtx.current;
      if ( ctx ) {
        chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: Object.keys(tokens).map((key: string) => key),
            datasets: [{
              data:
                Object.values(
                    tokens).map((value: ChartValues) => value.count),
              backgroundColor:
                getRandomColourForEachAddress(Object.keys(tokens).length),
              barThickness: ChartVars.barThickness,
              maxBarThickness: ChartVars.barThickness + 2,
            }],
          },
          options: {
            plugins: {
              legend: {
                display: false,
              },
            },
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            scales: {
              y: {
                grid: {
                  display: false,
                },
                ticks: {
                  mirror: true,
                  labelOffset: ChartVars.labelOffset * -1,
                  z: 1,
                },
              },
              x: {
                position: 'top',
                grid: {
                  display: false,
                },
              },
            },
          },
        });
      }
    }
    return () => {
      chart ? chart.destroy() : null;
    };
  }, [tokens]);

  const getTokenInfo = async () => {
    const apiResponse = await fetch('http://127.0.0.1:3000/', {
      method: 'GET',
    });
    if (apiResponse.ok) {
      const thisJson = await apiResponse.json();
      setTokens(thisJson);
    }
  };

  return (

    <>
      <Grid
        item
        container
        alignItems="flex-start"
        justify='flex-start'
        style={{
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(2),
          paddingTop: theme.spacing(2),
        }}
        xs={12}
      >
        <Typography variant="h3">
          {TokenVars.chartHeading}
        </Typography>
      </Grid>
      <Grid
        item
        container
        alignItems="flex-start"
        justify='flex-start'
        style={{
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(2),
          paddingBottom: theme.spacing(2),
        }}
        xs={12}
      >
        <div
          style={{
            height: chartHeight,
            width: '100%',
          }}
        >
          <canvas
            id='chartToken'
            ref={tokenCtx}
          />
        </div>
      </Grid>
    </>
  );
};

