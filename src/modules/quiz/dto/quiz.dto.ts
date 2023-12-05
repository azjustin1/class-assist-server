import { Choice } from '../entity/choice.entity';
import { QuizType } from '../enum/quiz-type.enum';

export interface QuizDTO {
  id: number;
  question: string;
  answers: Choice[];
  type: QuizType;
}
