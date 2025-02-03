export enum StatisticText {
  Excellent = 'Amazing job! You mastered the test like a pro! 🎉',
  VeryGood = 'Great work! You\'re doing very well. Keep it up! 💪',
  Good = 'Good effort! You have solid knowledge. Keep learning! 📚',
  Average = 'You\'re halfway there! A bit more effort and you\'ll shine. ✨',
  Poor = 'It\'s a start! Review the material and try again. 🌱',
}

const SCORE_TEXT_MAP: Record<number, StatisticText> = {
  10: StatisticText.Excellent,
  8: StatisticText.VeryGood,
  6: StatisticText.Good,
  4: StatisticText.Average,
  0: StatisticText.Poor, 
};

export function getStatisticText(score: number): StatisticText {
  const matchingScore = Object.keys(SCORE_TEXT_MAP)
  .map(Number)
  .sort((scoreA, scoreB) => scoreB - scoreA) 
  .find(threshold => score >= threshold);

  return SCORE_TEXT_MAP[matchingScore ?? 0]; 
}
