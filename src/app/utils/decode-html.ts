import { QuestionModel } from '../services/question/question.model';

export function decodeText(html: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  return doc.documentElement.textContent || html;
}
  
export function decodeQuestion(question: QuestionModel): QuestionModel {
  return {
    ...question,
    question: decodeText(question.question),
    category: decodeText(question.category),
    correct_answer: decodeText(question.correct_answer),
    incorrect_answers: question.incorrect_answers.map(decodeText),
  };
}
