import React, {useEffect, useState, useRef} from 'react';

import Grid from '@material-ui/core/Grid';

import Chart from 'chart.js/auto';

import {theme} from '../styles';

import {
  ChartValues,
  ChartData,
} from '../store/types';

import {
  Chart as ChartVars,
} from '../config';

interface ChartProps {
  title: string
  chartData: ChartData
  viewport: string
}

type Props = ChartProps

export const DisplayChart = (props: Props) => {
  // const classes = themeStyles();
  // eslint-disable-next-line no-unused-vars
  const [chartHeight, setChartHeight] = useState(0);
  const dataCtx = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let chart: any;
    const keys = Object.keys(props.chartData);
    if ( keys.length ) {
      const values = Object.values(props.chartData);
      setChartHeight(keys.length * ChartVars.gridHeight);
      const ctx: HTMLCanvasElement | null = dataCtx.current;
      if ( ctx ) {
        chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: keys.map((key: string) => key),
            datasets: [{
              data: values.map((value: ChartValues) => value.count),
              backgroundColor: values.map((value: ChartValues) => value.colour),
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
                  color: values.map((value: ChartValues) => value.colour),
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
  }, [props.chartData]);

  return (

    <>
      <Grid
        item
        container
        alignItems="flex-start"
        style={{
          padding: theme.spacing(2),
        }}
        xs={12}
      >

        <Grid
          item
          container
          alignItems="flex-start"
          style={{
            marginTop: theme.spacing(1),
            width: '100%',
            maxHeight: props.viewport,
            overflow: 'auto',
          }}
          xs={12}
        >
          <div
            style={{
              height: chartHeight,
              width: '100%',
              paddingRight: theme.spacing(1),
            }}
          >
            <canvas
              id={props.title}
              ref={dataCtx}
            />
          </div>
        </Grid>
      </Grid>
    </>
  );
};

