import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuizType } from '../enum/quiz-type.enum';
import { Choice } from './choice.entity';
import { Exercise } from 'src/modules/exercise/entity/exercise.entity';
import { CommonEntity } from 'src/common/entity/base-entity.entity';
import { Answer } from './answer.entity';

@Entity()
export class Quiz extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @ManyToMany(() => Exercise, (exercise) => exercise.quizzes)
  exercise: Exercise;

  @OneToMany(() => Choice, (answer) => answer.quiz, {
    eager: true,
    cascade: true,
  })
  choices: Choice[];

  @ManyToMany(() => Answer)
  @JoinTable({
    name: 'quiz_answer'
  })
  answers: Answer[];

  @Column()
  type: QuizType;

  @Column()
  correctAnswer: string = '';
}
