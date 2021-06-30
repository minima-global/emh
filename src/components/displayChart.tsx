import React, {useEffect, useState, useRef} from 'react';
import {connect} from 'react-redux';

import Grid from '@material-ui/core/Grid';

import Chart from 'chart.js/auto';

import {theme} from '../styles';

import {
  ApplicationState,
  ChartType,
  ChartProps as ChartTypeProps,
} from '../store/types';

import {
  Chart as ChartVars,
  colours,
} from '../config';

interface ChartProps {
  chartType: ChartType
  viewport: string
}

interface StateProps {
  chartData: ChartTypeProps
}

type Props = ChartProps & StateProps

export const chart = (props: Props) => {
  // eslint-disable-next-line no-unused-vars
  const [chartHeight, setChartHeight] = useState(0);
  const dataCtx = useRef<HTMLCanvasElement>(null);

  const chartIndex = ChartVars.chartInfo.indexOf(props.chartType.name);

  useEffect(() => {
    let chart: any;
    if ( chartIndex != -1 ) {
      if ( props.chartData.data[chartIndex] ) {
        const keys = Object.keys(props.chartData.data[chartIndex]);
        const values = Object.values(props.chartData.data[chartIndex]);
        setChartHeight(
            ChartVars.axisOffset + keys.length * ChartVars.gridHeight);
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

const mapStateToProps = (state: ApplicationState): StateProps => {
  return {
    chartData: state.chartsData as ChartTypeProps,
  };
};

const DisplayChart =
  connect<StateProps, {}, {}, ApplicationState>(
      mapStateToProps,
  )(chart);

export {DisplayChart};

