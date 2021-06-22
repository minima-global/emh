import React, {useEffect, useState, useRef} from 'react';

import Grid from '@material-ui/core/Grid';

import Chart from 'chart.js/auto';

import {theme} from '../styles';

import {
  ChartData,
  ChartType,
} from '../store/types';

import {
  Chart as ChartVars,
  colours,
} from '../config';

interface ChartProps {
  chartType: ChartType
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
    const keys = props.chartData ? Object.keys(props.chartData) : [];
    if ( keys.length ) {
      const values = Object.values(props.chartData);
      setChartHeight(ChartVars.axisOffset + keys.length * ChartVars.gridHeight);
      const ctx: HTMLCanvasElement | null = dataCtx.current;
      if ( ctx ) {
        chart = new Chart(ctx, {
          type: props.chartType.type,
          data: {
            labels: keys.map((key: string) => key),
            datasets: [{
              data: values.map((value: number) => value),
              backgroundColor: colours,
            }],
          },
          options: props.chartType.options,
        });
      }
    }
    return () => {
      chart ? chart.destroy() : null;
    };
  }, [props.chartData]);

  return (
    <Grid
      container
      style={{
        padding: theme.spacing(2),
      }}
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
            id={props.chartType.name}
            ref={dataCtx}
          />
        </div>
      </Grid>
    </Grid>
  );
};

