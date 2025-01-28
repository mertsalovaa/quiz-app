import {
  ApexDataLabels,
  ApexLegend,
  ApexPlotOptions,
  ApexStates,
  ApexResponsive,
  ApexChart,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: number[];
  chart: ApexChart;
  responsive: ApexResponsive[];
  legend: ApexLegend;
  colors: string[];
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  states: ApexStates;
};

export interface QuestionTypeModel {
  name: string;
  value: number;
}

const pieOptions = {
  startAngle: -45,
  endAngle: 315,
  expandOnClick: true,
  offsetX: 0,
  offsetY: 0,
  customScale: 1,
  donut: {
    size: '45%',
  },
};

const responsiveOptions = [
  {
    breakpoint: 768,
    options: {
      legend: {
        position: 'bottom',
        horizontalAlign: 'start',
      },
    },
  },
];

export function createChartOptions(data: QuestionTypeModel[]): Partial<ChartOptions> {
  return {
    series: data.map(item => item.value)!,
    chart: {
      type: 'donut',
      width: '100%',
      height: 500,
    },
    dataLabels: {
      enabled: false,
    },
    colors: [ '#63C995', '#E23D69' ],
    legend: {
      show: false,
    },
    tooltip: {
      enabled: false, 
    },
    states: {
      hover: {
        filter: {
          type: 'darken',
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
        },
      },
    },
    plotOptions: { pie: pieOptions },
    responsive: responsiveOptions,
  };
}
