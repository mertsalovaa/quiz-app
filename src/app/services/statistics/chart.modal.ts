export interface ChartModel {
    quizzesCount: number;
    questionsCount: {
        total: number;
        right: number;
        wrong: number;
    }; 
    time: number;
}
