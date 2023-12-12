import { Quiz } from 'src/modules/quiz/entity/quiz.entity';

export interface ExerciseDTO {
  name: string;
  quizzes: Quiz[];
}
