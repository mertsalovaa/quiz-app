import { StatisticService } from './statistics.service';
import { StorageService } from '../storage/storage.service';
import { QuizResultModel } from './quiz-result.model';
import { STORAGE_KEYS } from '../../utils/constants';
import { CHART_DATA } from '../../test-data/chart.data';
import { Observable, of } from 'rxjs';
import { QuestionModel } from '../question/question.model';
import { ChartModel } from './chart.modal';

jest.mock('../storage/storage.service.ts');

export const questions$: Observable<QuestionModel[]> = of([
  {
    type: true,
    difficulty: 'medium',
    category: 'Entertainment: Musicals &amp; Theatres',
    question: 'In which Shakespeare play does the character Marcellus say, &quot;Something is rotten in the state of Denmark&quot;?',
    correct_answer: 'Hamlet',
    incorrect_answers: [ 'Macbeth', 'King Lear', 'Twelfth Night' ],
  },
  {
    type: true,
    difficulty: 'medium',
    category: 'Entertainment: Musicals &amp; Theatres',
    question: 'Who played Marquis de Lafayette and Thomas Jefferson in the original Broadway run of Hamilton?',
    correct_answer: 'Daveed Diggs',
    incorrect_answers: [ 'Lin-Manuel Miranda', 'Javier Mu&ntilde;oz', 'Wayne Brady' ],
  },
  {
    type: true,
    difficulty: 'easy',
    category: 'Entertainment: Musicals &amp; Theatres',
    question: 'How many plays is Shakespeare generally considered to have written?',
    correct_answer: '37',
    incorrect_answers: [ '18', '54', '25' ],
  },
  {
    type: true,
    difficulty: 'medium',
    category: 'Entertainment: Musicals &amp; Theatres',
    question: 'In which Shakespearean play will you find the suicide of Ophelia?',
    correct_answer: 'Hamlet',
    incorrect_answers: [ 'Macbeth', 'Othello', 'King Lear' ],
  },
  {
    type: true,
    difficulty: 'hard',
    category: 'Entertainment: Musicals &amp; Theatres',
    question: 'In Macbeth, the eyes of what animals were used in the Witches&#039; cauldron?',
    correct_answer: 'Newts',
    incorrect_answers: [ 'Humans', 'Sharks', 'Squids' ],
  },
  {
    type: true,
    difficulty: 'medium',
    category: 'Entertainment: Musicals &amp; Theatres',
    question: 'The World Chess Championship in Chess, Act 1 is set in which Italian city?',
    correct_answer: 'Merano',
    incorrect_answers: [ 'Venice', 'Milan', 'Rome' ],
  },
  {
    type: true,
    difficulty: 'medium',
    category: 'Entertainment: Musicals &amp; Theatres',
    question: 'When was the play &quot;Macbeth&quot; written?',
    correct_answer: '1606',
    incorrect_answers: [ '1605', '1723', '1628' ],
  },
  {
    type: true,
    difficulty: 'hard',
    category: 'Entertainment: Musicals &amp; Theatres',
    question: 'Which Shakespeare play features the stage direction &quot;Enter a messenger, with two heads and a hand&quot;?',
    correct_answer: 'Titus Andronicus',
    incorrect_answers: [ 'Othello', 'Macbeth', 'King Lear' ],
  },
  {
    type: true,
    difficulty: 'medium',
    category: 'Entertainment: Musicals &amp; Theatres',
    question: 'In Jeff Wayne&#039;s Musical Version of War of the Worlds, the chances of anything coming from Mars are...',
    correct_answer: 'A million to one',
    incorrect_answers: [ 'A billion to one', 'A trillion to one', 'A hundred to one' ],
  },
  {
    type: true,
    difficulty: 'hard',
    category: 'Entertainment: Musicals &amp; Theatres',
    question: 'Which of these plays was famously first performed posthumously after the playwright committed suicide?',
    correct_answer: '4.48 Psychosis',
    incorrect_answers: [ 'Hamilton', 'Much Ado About Nothing', 'The Birthday Party' ],
  },
]);

describe('StatisticService', () => {
  let service: StatisticService;
  let storageService: jest.Mocked<StorageService>;
  
  const mockQuizResult: QuizResultModel = {
    seconds: 65,
    formattedTime: '1 min 5 sec',
    score: 7,
    resultText: 'Test text result',
  };

  const answers: string[] = [ 'Macbeth', 'Wayne Brady', '37', 'Newts', '1605', 'A trillion to one', 'Much Ado About Nothing' ];

  const initialStatistics: ChartModel = {
    quizzesCount: 1,
    questionsCount: {
      total: 10,
      right: 8,
      wrong: 2,
    }, 
    time: 2.5,
  };

  beforeEach(() => {
    storageService = {
      getFromStorage: jest.fn(),
      saveToStorage: jest.fn(),
    } as jest.Mocked<StorageService>;
    service = new StatisticService(storageService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getQuizResult', () => {
    it('should return the quiz result from storage', () => {
      storageService.getFromStorage.mockReturnValue(mockQuizResult);

      const result = service.getQuizResult();

      expect(storageService.getFromStorage).toHaveBeenCalledTimes(1);
      expect(storageService.getFromStorage).toHaveBeenCalledWith(
        STORAGE_KEYS.QUIZ_RESULT,
        null,
      );
      expect(result).toEqual(mockQuizResult);
    });

    it('should return null if quiz result does not exist in localStorage', () => {
      storageService.getFromStorage.mockReturnValueOnce(null);
      const result = service.getQuizResult();
      expect(result).toBeNull();
    });
  });

  describe('getStatisticData', () => {
    it('should return the chart data from storage', () => {
      storageService.getFromStorage.mockReturnValue(CHART_DATA);

      const result = service.getStatisticData();

      expect(storageService.getFromStorage).toHaveBeenCalledWith(
        STORAGE_KEYS.CHART,
        CHART_DATA,
      );
      expect(result).toEqual(CHART_DATA);
    });

    it('should return null if chart does not exist in localStorage', () => {
      storageService.getFromStorage.mockReturnValueOnce(null);
      const result = service.getStatisticData();
      expect(result).toBeNull();
    });
  });

  describe('initDefaultStatistic', () => {
    it('should initialize default statistic if not in localStorage', () => {
      jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
      service.initDefaultStatistic();

      expect(storageService.saveToStorage).toHaveBeenCalledWith(STORAGE_KEYS.CHART, CHART_DATA);
    });

    it('should not reinitialize if statistic is already in localStorage', () => {
      jest
      .spyOn(Storage.prototype, 'getItem')
      .mockReturnValue(JSON.stringify(CHART_DATA));
      service.initDefaultStatistic();

      expect(storageService.saveToStorage).not.toHaveBeenCalled();
    });
  });

  describe('initScore', () => {
    it('should calculate the correct score based on user answers', () => {
      const result = service.initScore(questions$, answers);
      expect(result).toBe(1);
    });

    it('should return 0 if array of answers is empty', () => {
      const result = service.initScore(questions$, []);
      expect(result).toBe(0);
    });
  });

  describe('initResult', () => {
    it('should update statistics and save result to storage', () => {
      storageService.getFromStorage.mockReturnValue(initialStatistics);

      service.initResult(mockQuizResult);

      expect(storageService.getFromStorage).toHaveBeenCalledWith(
        STORAGE_KEYS.CHART,
        CHART_DATA,
      );

      expect(storageService.saveToStorage).toHaveBeenCalledWith(
        STORAGE_KEYS.QUIZ_RESULT,
        mockQuizResult,
      );
      
      expect(storageService.saveToStorage).toHaveBeenCalledWith(
        STORAGE_KEYS.CHART,
        {
          quizzesCount: 2,
          questionsCount: {
            total: 20,
            right: 15,
            wrong: 5,
          }, 
          time: 3.6,
        },
      );
    });
  });
});
