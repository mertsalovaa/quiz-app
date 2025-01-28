import { ChartModel } from '../services/model/chart.modal';

export const CHART_DATA: ChartModel = {
  quizzesCount: 67,
  questionsCount: { total: 670, right: 600, wrong: 70 },
  time: 675,
};

export const chartDataText: string[] = [ 
  'Quizzes were played', 'Questions have been answered', 'Time of answering quizzes',
];
